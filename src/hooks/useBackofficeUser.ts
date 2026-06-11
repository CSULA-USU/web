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

export function useBackofficeUser(): State {
  const [state, setState] = useState<State>({ user: null, loading: true });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/backoffice/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((user: BackofficeUserData | null) => {
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
