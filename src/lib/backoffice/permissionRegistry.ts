export const BACKOFFICE_PERMISSION_REGISTRY = {
  accessManagement: {
    label: 'Access Management',
    description:
      'Manage backoffice users, roles, pages, departments, and access policies.',
    actions: {
      view: {
        label: 'View',
        scopes: {
          '*': 'All access management',
        },
      },
      edit: {
        label: 'Edit',
        scopes: {
          '*': 'All access management',
        },
      },
    },
  },

  announcementBanner: {
    label: 'Announcement Banner',
    description: 'Manage the website announcement banner.',
    actions: {
      view: {
        label: 'View',
        scopes: {
          '*': 'Announcement banner',
        },
      },
      edit: {
        label: 'Edit',
        scopes: {
          '*': 'Announcement banner',
        },
      },
    },
  },

  boardDocuments: {
    label: 'Board Documents',
    description: 'Manage Board of Directors documents.',
    actions: {
      view: {
        label: 'View',

        scopes: {
          '*': 'Board documents',
        },
      },
      edit: {
        label: 'Edit',
        scopes: {
          '*': 'Board documents',
        },
      },
    },
  },

  graffixRequests: {
    label: 'Graffix Requests',
    description: 'Manage and view Graffix request boards.',
    actions: {
      view: {
        label: 'View',
        scopes: {
          '*': 'All departments',
          ownDepartment: 'Own department',
        },
      },
      edit: {
        label: 'Edit',
        scopes: {
          '*': 'All departments',
          ownDepartment: 'Own department',
        },
      },
      delete: {
        label: 'Delete',
        scopes: {
          '*': 'All departments',
        },
      },
    },
  },
} as const;

export type BackofficePermissionRegistry =
  typeof BACKOFFICE_PERMISSION_REGISTRY;

export type BackofficeResource = keyof BackofficePermissionRegistry;

export const buildBackofficePolicy = (
  resource: string,
  action: string,
  scope: string,
) => {
  return `${resource}:${action}:${scope}`;
};

export const getAllRegisteredBackofficePolicies = () => {
  return Object.entries(BACKOFFICE_PERMISSION_REGISTRY).flatMap(
    ([resource, resourceConfig]) =>
      Object.entries(resourceConfig.actions).flatMap(([action, actionConfig]) =>
        Object.keys(actionConfig.scopes).map((scope) =>
          buildBackofficePolicy(resource, action, scope),
        ),
      ),
  );
};

export const isRegisteredBackofficePolicy = (policy: string) => {
  return getAllRegisteredBackofficePolicies().includes(policy);
};
