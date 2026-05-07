import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Button,
  FluidContainer,
  Loading,
  Select,
  Typography,
} from 'components';
import {
  Page,
  PolicyList,
  AccessManagementUserModal,
  ConfirmDialog,
} from 'modules';
import { Table as FlexibleTable } from 'components';
import { TableData } from 'types';
import BackofficeShell from 'modules/Backoffice/BackofficeShell';
import {
  formatRoleName,
  formatDepartmentName,
} from 'lib/backoffice/formatters';
import { media, Spaces } from 'theme';
import styled from 'styled-components';
import { useToast } from 'context/ToastContext';

const NoBottomPaddingContainer = styled(FluidContainer)`
  padding-bottom: 0;
  ${media('desktop')`
    padding-bottom: 0;
  `}

  ${media('mobile')`
    padding-bottom: 0;
  `}
`;

const ControlsRow = styled(FluidContainer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${Spaces.md};
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: stretch;
  }
`;

type BackofficeUserRow = {
  id: number;
  email: string;
  role: number;
  department: number;
  policies: string[];
  backoffice_roles?: {
    id: number;
    role_name: string;
  };
  backoffice_departments?: {
    id: number;
    department_name: string;
    department_fullname: string;
  };
};

type BackofficeRoleRow = {
  id: number;
  role_name: string;
  policies: string[];
  users_count: number;
  is_system: boolean;
};

type BackofficeDepartmentRow = {
  id: number;
  department_name: string;
  department_fullname: string;
  users_count: number;
};

export default function AccessManagementPage() {
  const [users, setUsers] = useState<BackofficeUserRow[]>([]);
  const [roles, setRoles] = useState<BackofficeRoleRow[]>([]);
  const [departments, setDepartments] = useState<BackofficeDepartmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<
    'users' | 'roles' | 'departments'
  >('users');
  const [editingUser, setEditingUser] = useState<BackofficeUserRow | null>(
    null,
  );
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<BackofficeUserRow | null>(
    null,
  );
  const { showToast } = useToast();

  const refreshAccessManagementData = async () => {
    const [usersRes, rolesRes, departmentsRes] = await Promise.all([
      fetch('/api/backoffice/users'),
      fetch('/api/backoffice/roles'),
      fetch('/api/backoffice/departments'),
    ]);

    if (!usersRes.ok || !rolesRes.ok || !departmentsRes.ok) {
      throw new Error('Failed to load access management data.');
    }

    const [usersData, rolesData, departmentsData] = await Promise.all([
      usersRes.json(),
      rolesRes.json(),
      departmentsRes.json(),
    ]);

    setUsers(usersData);
    setRoles(rolesData);
    setDepartments(departmentsData);
  };

  useEffect(() => {
    const fetchAccessManagementData = async () => {
      try {
        setLoading(true);

        const [usersRes, rolesRes, departmentsRes] = await Promise.all([
          fetch('/api/backoffice/users'),
          fetch('/api/backoffice/roles'),
          fetch('/api/backoffice/departments'),
        ]);

        if (!usersRes.ok || !rolesRes.ok || !departmentsRes.ok) {
          throw new Error('Failed to load access management data.');
        }

        const [usersData, rolesData, departmentsData] = await Promise.all([
          usersRes.json(),
          rolesRes.json(),
          departmentsRes.json(),
        ]);

        setUsers(usersData);
        setRoles(rolesData);
        setDepartments(departmentsData);
      } catch (err) {
        showToast(
          err instanceof Error
            ? err.message
            : 'Something went wrong loading access management data.',
          'error',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAccessManagementData();
  }, [showToast]);

  const handleUserSubmit = async (value: {
    email: string;
    role: number | '';
    department: number | '';
    policies: string[];
  }) => {
    const endpoint = editingUser
      ? `/api/backoffice/users/${editingUser.id}`
      : '/api/backoffice/users';

    const method = editingUser ? 'PATCH' : 'POST';

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    });

    if (!res.ok) {
      showToast('Failed to save user.', 'error');
      return;
    }

    setIsUserModalOpen(false);
    setEditingUser(null);
    await refreshAccessManagementData();
    showToast(
      editingUser ? 'User updated successfully.' : 'User added successfully.',
      'success',
    );
  };

  const handleDeleteUser = async () => {
    if (!deletingUser) return;

    const res = await fetch(`/api/backoffice/users/${deletingUser.id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      showToast('Failed to delete user.', 'error');
      return;
    }

    setDeletingUser(null);
    await refreshAccessManagementData();
    showToast('User deleted successfully.', 'success');
  };

  const userTableData: TableData = {
    id: 'users',
    ariaLabel: 'Backoffice users',
    caption: 'Users',
    headerColors: {
      backgroundColor: 'greyLightest',
      textColor: 'black',
    },
    columns: [
      {
        id: 'email',
        label: 'Email',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '280px',
        render: (row: any) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.email}
          </Typography>
        ),
      },
      {
        id: 'role',
        label: 'Role',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '160px',
        render: (row: any) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {formatRoleName(
              row.original.backoffice_roles?.role_name || 'No role',
            )}
          </Typography>
        ),
      },
      {
        id: 'department',
        label: 'Department',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '180px',
        render: (row: any) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {formatDepartmentName(
              row.original.backoffice_departments?.department_name ||
                'No department',
            )}
          </Typography>
        ),
      },
      {
        id: 'policies',
        label: 'User Overrides',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '320px',
        render: (row: any) => (
          <PolicyList
            policies={row.original.policies}
            emptyMessage="No user-specific overrides"
          />
        ),
      },
      {
        id: 'actions',
        label: 'Actions',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '120px',
        render: (row: any) => (
          <FluidContainer
            padding="0"
            flex
            flexDirection="column"
            gap={Spaces.sm}
          >
            <Button
              type="button"
              variant="edit"
              onClick={() => {
                setEditingUser(row.original);
                setIsUserModalOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              type="button"
              variant="delete"
              onClick={() => setDeletingUser(row.original)}
            >
              Delete
            </Button>
          </FluidContainer>
        ),
      },
    ],
    rows: users.map((user) => ({
      id: String(user.id),
      values: {
        email: user.email,
      },
      original: user,
    })),
  };

  const roleTableData: TableData = {
    id: 'roles',
    ariaLabel: 'Backoffice roles',
    caption: 'Roles',
    headerColors: {
      backgroundColor: 'greyLightest',
      textColor: 'black',
    },
    columns: [
      {
        id: 'role_name',
        label: 'Role',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '220px',
        render: (row: any) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {formatRoleName(row.original.role_name)}
          </Typography>
        ),
      },
      {
        id: 'policies',
        label: 'Permissions',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '360px',
        render: (row: any) => (
          <PolicyList
            policies={row.original.policies}
            emptyMessage="No permissions assigned"
            align="left"
          />
        ),
      },
      {
        id: 'users_count',
        label: 'Users Assigned',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '160px',
        render: (row: any) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.users_count}
          </Typography>
        ),
      },
      {
        id: 'actions',
        label: 'Actions',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '120px',
        render: () => (
          <FluidContainer
            padding="0"
            flex
            flexDirection="column"
            gap={Spaces.sm}
          >
            <Button type="button" variant="edit">
              Edit
            </Button>
            <Button type="button" variant="delete">
              Delete
            </Button>
          </FluidContainer>
        ),
      },
    ],
    rows: roles.map((role) => ({
      id: String(role.id),
      values: {
        role_name: formatRoleName(role.role_name),
      },
      original: role,
    })),
  };

  const departmentTableData: TableData = {
    id: 'departments',
    ariaLabel: 'Backoffice departments',
    caption: 'Departments',
    headerColors: {
      backgroundColor: 'greyLightest',
      textColor: 'black',
    },
    columns: [
      {
        id: 'department_name',
        label: 'Department',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '220px',
        render: (row: any) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {formatDepartmentName(row.original.department_name)}
          </Typography>
        ),
      },
      {
        id: 'department_fullname',
        label: 'Full Name',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '280px',
        render: (row: any) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.department_fullname}
          </Typography>
        ),
      },
      {
        id: 'users_count',
        label: 'Users Assigned',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '160px',
        render: (row: any) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.users_count}
          </Typography>
        ),
      },
    ],
    rows: departments.map((department) => ({
      id: String(department.id),
      values: {
        department_name: formatDepartmentName(department.department_name),
      },
      original: department,
    })),
  };

  const sectionItems = [
    { label: 'Users', value: 'users' },
    { label: 'Roles', value: 'roles' },
    { label: 'Departments', value: 'departments' },
  ];

  const activeTable =
    selectedSection === 'users'
      ? userTableData
      : selectedSection === 'roles'
      ? roleTableData
      : departmentTableData;

  return (
    <Page>
      <Head>
        <title>Access Management</title>
      </Head>

      <BackofficeShell
        title="Access Management"
        subtitle="Manage backoffice users, roles, departments, and permissions."
      >
        <NoBottomPaddingContainer>
          <ControlsRow padding="0">
            <Select
              ariaLabel="Select access management section"
              placeholder="Choose section"
              items={sectionItems}
              value={selectedSection}
              onValueChange={(value) =>
                setSelectedSection(value as 'users' | 'roles' | 'departments')
              }
            />

            {selectedSection === 'users' ? (
              <Button
                padding="10px 20px"
                fontSize="14px"
                fontWeight="400"
                type="button"
                onClick={() => {
                  setEditingUser(null);
                  setIsUserModalOpen(true);
                }}
              >
                <span aria-hidden="true">+</span> Add User
              </Button>
            ) : null}

            {selectedSection === 'roles' ? (
              <Button
                padding="10px 20px"
                fontSize="14px"
                fontWeight="400"
                type="button"
              >
                <span aria-hidden="true">+</span> Add Role
              </Button>
            ) : null}
          </ControlsRow>
        </NoBottomPaddingContainer>
        <FluidContainer>
          {loading ? <Loading load={false} /> : null}

          {!loading ? <FlexibleTable data={activeTable} /> : null}
        </FluidContainer>
        {isUserModalOpen ? (
          <AccessManagementUserModal
            user={editingUser}
            roles={roles.map((role) => ({
              id: role.id,
              label: formatRoleName(role.role_name),
            }))}
            departments={departments.map((department) => ({
              id: department.id,
              label: formatDepartmentName(department.department_name),
            }))}
            onClose={() => {
              setEditingUser(null);
              setIsUserModalOpen(false);
            }}
            onSubmit={handleUserSubmit}
          />
        ) : null}

        {deletingUser ? (
          <ConfirmDialog
            title="Delete User"
            message="Are you sure you want to remove this backoffice user?"
            highlightedText={deletingUser.email}
            confirmLabel="Delete User"
            cancelLabel="Cancel"
            isDanger
            onCancel={() => setDeletingUser(null)}
            onConfirm={handleDeleteUser}
          />
        ) : null}
      </BackofficeShell>
    </Page>
  );
}
