import { useEffect, useState } from 'react';

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

// Every backoffice page mounts this hook several times in one render
// (BackofficeShell, BackofficeSideBar, BackofficeNavList and
// useBackofficePageAccess), and each copy used to fetch /me on its own: a full
// user, role and policy lookup per copy, doubled again by Strict Mode in dev.
// Copies that mount while a request is in flight now share it.
//
// The promise is dropped once it settles rather than kept as a cache, so the
// next page navigation, which remounts the shell, still fetches fresh. A role
// or policy edited in access management therefore applies on the next page,
// as it did before. Do not turn this into a long-lived cache without adding a
// way to invalidate it.
let inFlightRequest: Promise<BackofficeUserData | null> | null = null;

function fetchBackofficeUser(): Promise<BackofficeUserData | null> {
  if (!inFlightRequest) {
    inFlightRequest = fetch('/api/backoffice/me')
      .then((res) => (res.ok ? res.json() : null))
      .finally(() => {
        inFlightRequest = null;
      });
  }
  return inFlightRequest;
}

export function useBackofficeUser(): State {
  const [state, setState] = useState<State>({ user: null, loading: true });

  useEffect(() => {
    let cancelled = false;
    fetchBackofficeUser()
      .then((user) => {
        if (!cancelled) setState({ user, loading: false });
      })
      .catch(() => {
        if (!cancelled) setState({ user: null, loading: false });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
