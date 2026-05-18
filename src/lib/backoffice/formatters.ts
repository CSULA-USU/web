import { BACKOFFICE_PERMISSION_REGISTRY } from './permissionRegistry';

/**
 * Converts:
 * "graffixRequests:view:*"
 * → "Graffix Requests: View all departments"
 */

/**
 * Converts:
 * "moderator" → "Moderator"
 * "student_worker" → "Student Worker"
 */
export const formatRoleName = (role: string) => {
  return role
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Converts:
 * "csi" → "CSI"
 * "graffix" → "Graffix"
 */
export const formatDepartmentName = (department: string) => {
  if (!department) return '';

  // Handle known acronyms
  const upper = department.toUpperCase();

  const knownAcronyms = ['CSI', 'CCC'];

  if (knownAcronyms.includes(upper)) {
    return upper;
  }

  return department.charAt(0).toUpperCase() + department.slice(1);
};

function camelToLabel(str: string): string {
  if (str === '*') return 'All';
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

export const getBackofficePolicyParts = (policy: string) => {
  const [resource, action, scope] = policy.split(':');

  const resourceConfig =
    BACKOFFICE_PERMISSION_REGISTRY[
      resource as keyof typeof BACKOFFICE_PERMISSION_REGISTRY
    ];

  if (!resourceConfig) {
    return {
      resourceLabel: camelToLabel(resource),
      permissionLabel: `${camelToLabel(action)} ${camelToLabel(scope)}`.trim(),
    };
  }

  const actionConfig =
    resourceConfig.actions[action as keyof typeof resourceConfig.actions];

  const scopeLabel =
    actionConfig?.scopes[scope as keyof typeof actionConfig.scopes];

  return {
    resourceLabel: resourceConfig.label,
    permissionLabel: scopeLabel
      ? `${actionConfig.label} ${scopeLabel}`
      : actionConfig?.label || camelToLabel(action),
  };
};
