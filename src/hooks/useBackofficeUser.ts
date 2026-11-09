import { useCallback, useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { backofficeUserState } from 'atoms/BackofficeUserAtom';

export type BackofficeEffectivePolicy = {
  pageKey: string;
  action: string;
  scope: string;
  source: 'role' | 'user';
};

export type BackofficeUserData = {
  id: number;
  email: string;
  departmentId: number | null;
  departmentKey: string | null;
  departmentName: string | null;
  departmentFullName: string | null;
  roles: { id: number; roleKey: string; roleName: string }[];
  effectivePolicies: BackofficeEffectivePolicy[];
};

type State = {
  user: BackofficeUserData | null;
  loading: boolean;
};

export function canViewBackofficePage(
  effectivePolicies: BackofficeEffectivePolicy[],
  pageKey: string,
): boolean {
  return effectivePolicies.some(
    (p) =>
      (p.pageKey === '*' && p.action === '*' && p.scope === '*') ||
      (p.pageKey === pageKey && (p.action === 'view' || p.action === '*')),
  );
}

export function hasBackofficePolicy(
  effectivePolicies: BackofficeEffectivePolicy[],
  pageKey: string,
  action: string,
  scopes: string[],
): boolean {
  return effectivePolicies.some(
    (p) =>
      (p.pageKey === '*' && p.action === '*' && p.scope === '*') ||
      (p.pageKey === pageKey &&
        (p.action === action || p.action === '*') &&
        (p.scope === '*' || scopes.includes(p.scope))),
  );
}

/*
 * How the viewer's permissions stay current
 *
 * /me is held in `backofficeUserState` for the whole visit, so a page change
 * reads it instantly instead of refetching. Nothing pushes permission changes
 * to the browser, so it is refreshed in the background at the moments a change
 * could have happened or is about to matter:
 *
 *   - after any save in access management (useRefreshBackofficeUser), so
 *     editing your own access shows at once;
 *   - on every backoffice page change, when the tab regains focus, and every
 *     60s while the tab is visible (useBackofficeUserSync, run by the shell),
 *     so another admin's edit shows within a minute at most.
 *
 * None of this is access control: every /api/backoffice route checks policies
 * on the server. These permissions only decide what the UI offers.
 */

const BACKGROUND_REFRESH_MS = 60_000;

type MeResult =
  | { kind: 'user'; user: BackofficeUserData }
  // 401 (no session) and 404 (not a backoffice user) are answers: the
  // viewer has no backoffice access.
  | { kind: 'none' }
  // A 5xx, a network failure or a malformed body says nothing about access.
  | { kind: 'unavailable' };

// Copies of the hook and refresh triggers that fire together (a page mounting
// several consumers, or focus and visibilitychange arriving as a pair) share
// one request. Dropped once it settles, so the next trigger fetches fresh.
let inFlightRequest: Promise<MeResult> | null = null;

function fetchBackofficeUser(): Promise<MeResult> {
  if (!inFlightRequest) {
    inFlightRequest = fetch('/api/backoffice/me')
      .then(async (res): Promise<MeResult> => {
        if (res.ok) return { kind: 'user', user: await res.json() };
        if (res.status === 401 || res.status === 404) return { kind: 'none' };
        return { kind: 'unavailable' };
      })
      .catch((): MeResult => ({ kind: 'unavailable' }))
      .finally(() => {
        inFlightRequest = null;
      });
  }
  return inFlightRequest;
}

/** Refetches /me and updates every consumer in place. Safe to call often. */
export function useRefreshBackofficeUser(): () => Promise<void> {
  const setState = useSetAtom(backofficeUserState);

  return useCallback(async () => {
    const result = await fetchBackofficeUser();
    setState((previous) => {
      if (result.kind === 'user') {
        // An unchanged answer keeps the old object, so a routine refresh
        // re-renders nothing and re-runs no effect that depends on `user`.
        const unchanged =
          JSON.stringify(previous.user) === JSON.stringify(result.user);
        return unchanged && previous.loaded
          ? previous
          : { user: result.user, loaded: true };
      }
      if (result.kind === 'none') return { user: null, loaded: true };
      // A failed background refresh keeps the permissions already shown, so a
      // blip cannot hide the nav or bounce the viewer off the page. On the
      // first load there is nothing to keep, so it settles as no access.
      return previous.loaded ? previous : { user: null, loaded: true };
    });
  }, [setState]);
}

/**
 * Keeps the viewer's permissions current while a backoffice page is open.
 * BackofficeShell runs it once per page; nothing else should.
 */
export function useBackofficeUserSync(): void {
  const refresh = useRefreshBackofficeUser();

  useEffect(() => {
    // Each backoffice page mounts its own shell, so this is the page change.
    refresh();

    const refreshIfVisible = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    const interval = window.setInterval(
      refreshIfVisible,
      BACKGROUND_REFRESH_MS,
    );
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refreshIfVisible);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refreshIfVisible);
    };
  }, [refresh]);
}

export function useBackofficeUser(): State {
  const { user, loaded } = useAtomValue(backofficeUserState);
  const refresh = useRefreshBackofficeUser();

  // Only the first load of the visit. Keeping the answer fresh after that is
  // useBackofficeUserSync's job, so a consumer mounting later, such as the
  // nav inside the mobile drawer, reads the atom instead of refetching.
  useEffect(() => {
    if (!loaded) refresh();
  }, [loaded, refresh]);

  return { user, loading: !loaded };
}
