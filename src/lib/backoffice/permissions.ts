import { CurrentBackofficeUser } from 'types';
import { isRegisteredBackofficePolicy } from './permissionRegistry';

export const getEffectivePolicies = (
  rolePolicies: string[] = [],
  userPolicies: string[] = [],
) => {
  return Array.from(new Set([...rolePolicies, ...userPolicies]));
};

export const hasPolicy = (
  user: Pick<CurrentBackofficeUser, 'effectivePolicies'>,
  policy: string,
) => {
  const [resource, action] = policy.split(':');
  const wildcardPolicy = `${resource}:${action}:*`;

  return (
    user.effectivePolicies.includes(policy) ||
    user.effectivePolicies.includes(wildcardPolicy)
  );
};

export const hasAnyPolicy = (
  user: Pick<CurrentBackofficeUser, 'effectivePolicies'>,
  policies: string[],
) => {
  return policies.some((policy) => hasPolicy(user, policy));
};

export const canAccessDepartment = ({
  user,
  requestedDepartment,
  viewAllPolicy,
  viewOwnDepartmentPolicy,
}: {
  user: CurrentBackofficeUser;
  requestedDepartment: string;
  viewAllPolicy: string;
  viewOwnDepartmentPolicy: string;
}) => {
  const normalizedRequestedDepartment = requestedDepartment.toLowerCase();
  const normalizedUserDepartment = user.departmentName.toLowerCase();

  return (
    hasPolicy(user, viewAllPolicy) ||
    (hasPolicy(user, viewOwnDepartmentPolicy) &&
      normalizedUserDepartment === normalizedRequestedDepartment)
  );
};

export const filterRegisteredPolicies = (policies: string[] = []) => {
  return policies.filter(isRegisteredBackofficePolicy);
};
