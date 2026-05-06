import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, FluidContainer, Loading, Tabs, Typography } from 'components';
import { Page, PolicyList } from 'modules';
import DataTable from 'modules/Backoffice/DataTable';
import BackofficeShell from 'modules/Backoffice/BackofficeShell';
import {
  formatRoleName,
  formatDepartmentName,
} from 'lib/backoffice/formatters';

type BackofficeUserRow = {
  id: number;
  email: string;
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
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccessManagementData = async () => {
      try {
        setLoading(true);
        setError('');

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
        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong loading access management data.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAccessManagementData();
  }, []);

  const userColumns = [
    {
      id: 'email',
      label: 'Email',
      width: '280px',
      render: (user: BackofficeUserRow) => (
        <Typography as="span" variant="label" size="sm" weight="600">
          {user.email}
        </Typography>
      ),
    },
    {
      id: 'role',
      label: 'Role',
      render: (user: BackofficeUserRow) => (
        <Typography as="span" variant="label" size="sm" weight="600">
          {formatRoleName(user.backoffice_roles?.role_name || 'No role')}
        </Typography>
      ),
    },
    {
      id: 'department',
      label: 'Department',
      render: (user: BackofficeUserRow) => (
        <Typography as="span" variant="label" size="sm" weight="600">
          {formatDepartmentName(
            user.backoffice_departments?.department_name || 'No department',
          )}
        </Typography>
      ),
    },
    {
      id: 'policies',
      label: 'User Overrides',
      width: '320px',
      render: (user: BackofficeUserRow) => (
        <PolicyList policies={user.policies} />
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      render: () => <Button disabled>Edit</Button>,
    },
  ];

  const roleColumns = [
    {
      id: 'role_name',
      label: 'Role',
      width: '220px',
      render: (role: BackofficeRoleRow) => (
        <Typography as="span" variant="label" size="sm" weight="600">
          {formatRoleName(role.role_name)}
        </Typography>
      ),
    },
    {
      id: 'policies',
      label: 'Permissions',
      render: (role: BackofficeRoleRow) => (
        <PolicyList
          policies={role.policies}
          emptyMessage="No permissions assigned"
        />
      ),
    },
    {
      id: 'users_count',
      label: 'Users Assigned',
      width: '160px',
      render: (role: BackofficeRoleRow) => (
        <Typography as="span" variant="label" size="sm" weight="600">
          {role.users_count}
        </Typography>
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      width: '120px',
      render: () => <Button disabled>Edit</Button>,
    },
  ];

  const departmentColumns = [
    {
      id: 'department_name',
      label: 'Department',
      width: '220px',
      render: (department: BackofficeDepartmentRow) => (
        <Typography as="span" variant="label" size="sm" weight="600">
          {formatDepartmentName(department.department_name)}
        </Typography>
      ),
    },
    {
      id: 'department_fullname',
      label: 'Full Name',
      render: (department: BackofficeDepartmentRow) => (
        <Typography as="span" variant="label" size="sm" weight="600">
          {department.department_fullname}
        </Typography>
      ),
    },
    {
      id: 'users_count',
      label: 'Users Assigned',
      width: '160px',
      render: (department: BackofficeDepartmentRow) => (
        <Typography as="span" variant="label" size="sm" weight="600">
          {department.users_count}
        </Typography>
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      width: '120px',
      render: () => <Button disabled>Edit</Button>,
    },
  ];

  return (
    <Page>
      <Head>
        <title>Access Management</title>
      </Head>

      <BackofficeShell
        title="Access Management"
        subtitle="Manage backoffice users, roles, departments, and permissions."
      >
        <FluidContainer>
          {loading ? <Loading load={false} /> : null}

          {!loading && error ? (
            <Typography as="p" variant="label" size="sm" weight="600">
              {error}
            </Typography>
          ) : null}

          {!loading && !error ? (
            <Tabs
              items={[
                {
                  title: 'Users',
                  children: (
                    <DataTable
                      columns={userColumns}
                      rows={users}
                      getRowId={(user) => user.id}
                      emptyMessage="No backoffice users found."
                    />
                  ),
                },
                {
                  title: 'Roles',
                  children: (
                    <DataTable
                      columns={roleColumns}
                      rows={roles}
                      getRowId={(role) => role.id}
                      emptyMessage="No roles found."
                    />
                  ),
                },
                {
                  title: 'Departments',
                  children: (
                    <DataTable
                      columns={departmentColumns}
                      rows={departments}
                      getRowId={(department) => department.id}
                      emptyMessage="No departments found."
                    />
                  ),
                },
              ]}
            />
          ) : null}
        </FluidContainer>
      </BackofficeShell>
    </Page>
  );
}
