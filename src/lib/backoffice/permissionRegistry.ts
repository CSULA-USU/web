export const BACKOFFICE_PERMISSION_REGISTRY = {
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

  siteContent: {
    label: 'Site Content',
    description: 'Manage editable website content.',
    actions: {
      edit: {
        label: 'Edit',
        scopes: {
          announcementBanner: 'Announcement banner',
          meetingDocuments: 'Meeting documents',
        },
      },
    },
  },

  backofficeUsers: {
    label: 'Backoffice Users',
    description: 'Manage employee backoffice access.',
    actions: {
      view: {
        label: 'View',
        scopes: {
          '*': 'All users',
        },
      },
      create: {
        label: 'Create',
        scopes: {
          '*': 'All users',
        },
      },
      edit: {
        label: 'Edit',
        scopes: {
          '*': 'All users',
        },
      },
      delete: {
        label: 'Delete',
        scopes: {
          '*': 'All users',
        },
      },
    },
  },

  backofficeRoles: {
    label: 'Backoffice Roles',
    description: 'Manage roles and role permissions.',
    actions: {
      view: {
        label: 'View',
        scopes: {
          '*': 'All roles',
        },
      },
      create: {
        label: 'Create',
        scopes: {
          '*': 'All roles',
        },
      },
      edit: {
        label: 'Edit',
        scopes: {
          '*': 'All roles',
        },
      },
      delete: {
        label: 'Delete',
        scopes: {
          '*': 'All roles',
        },
      },
    },
  },

  backofficeDepartments: {
    label: 'Backoffice Departments',
    description: 'Manage backoffice departments.',
    actions: {
      view: {
        label: 'View',
        scopes: {
          '*': 'All departments',
        },
      },
      create: {
        label: 'Create',
        scopes: {
          '*': 'All departments',
        },
      },
      edit: {
        label: 'Edit',
        scopes: {
          '*': 'All departments',
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
