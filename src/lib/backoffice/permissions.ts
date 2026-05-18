import type { CurrentBackofficeUser } from './currentUser';

export const buildPolicyKey = ({
  pageKey,
  action,
  scope,
}: {
  pageKey: string;
  action: string;
  scope: string;
}) => `${pageKey}:${action}:${scope}`;

export const hasPolicy = (
  user: Pick<CurrentBackofficeUser, 'effectivePolicies'>,
  {
    pageKey,
    action,
    scope,
  }: {
    pageKey: string;
    action: string;
    scope: string;
  },
) => {
  return user.effectivePolicies.some((policy) => {
    const isExact =
      policy.pageKey === pageKey &&
      policy.action === action &&
      policy.scope === scope;

    const isPageActionWildcard =
      policy.pageKey === pageKey &&
      policy.action === action &&
      policy.scope === '*';

    const isGlobalWildcard =
      policy.pageKey === '*' && policy.action === '*' && policy.scope === '*';

    return isExact || isPageActionWildcard || isGlobalWildcard;
  });
};
