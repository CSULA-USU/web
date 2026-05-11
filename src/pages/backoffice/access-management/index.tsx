import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Button,
  FluidContainer,
  Loading,
  Select,
  Typography,
} from 'components';
import { Page, PolicyList } from 'modules';
import { Table as FlexibleTable } from 'components';
import { TableData } from 'types';
import BackofficeShell from 'modules/Backoffice/BackofficeShell';
import { ConfirmDialog } from 'modules/Modals/ConfirmDialog';
import {
  AccessManagementUserModal,
  AccessManagementRoleModal,
  AccessManagementPageModal,
} from 'modules/Backoffice/AccessManagement';
import {
  formatRoleName,
  formatDepartmentName,
} from 'lib/backoffice/formatters';
import { media, Spaces } from 'theme';
import styled from 'styled-components';
import { useToast } from 'context/ToastContext';
import { useBackofficePageAccess } from 'hooks';
import type {
  V2UserRow,
  V2RoleRow,
  V2PageRow,
  V2DepartmentRow,
  V2Role,
} from 'modules/Backoffice/AccessManagement';

// ── styled ────────────────────────────────────────────────────────────────────

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

// ── helpers ───────────────────────────────────────────────────────────────────

function policiesToStrings(
  policies: { page_key: string; action: string; scope: string }[],
): string[] {
  return policies.map((p) => `${p.page_key}:${p.action}:${p.scope}`);
}

type SectionKey = 'users' | 'roles' | 'pages' | 'departments';

// ── page ──────────────────────────────────────────────────────────────────────

export default function AccessManagementPage() {
  const { showToast } = useToast();
  const { loading: accessLoading } = useBackofficePageAccess(
    'accessManagement',
    'view',
    ['*'],
  );

  const [users, setUsers] = useState<V2UserRow[]>([]);
  const [roles, setRoles] = useState<V2RoleRow[]>([]);
  const [pages, setPages] = useState<V2PageRow[]>([]);
  const [departments, setDepartments] = useState<V2DepartmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<SectionKey>('users');

  // ── modal state ──────────────────────────────────────────────────────────
  const [editingUser, setEditingUser] = useState<V2UserRow | null | undefined>(
    undefined,
  );
  const [editingRole, setEditingRole] = useState<V2RoleRow | null | undefined>(
    undefined,
  );
  const [editingPage, setEditingPage] = useState<V2PageRow | null | undefined>(
    undefined,
  );

  // ── confirm state ────────────────────────────────────────────────────────
  const [confirmDeactivateUser, setConfirmDeactivateUser] =
    useState<V2UserRow | null>(null);
  const [confirmDeleteRole, setConfirmDeleteRole] = useState<V2RoleRow | null>(
    null,
  );
  const [confirmDeletePage, setConfirmDeletePage] = useState<V2PageRow | null>(
    null,
  );

  // editingUser/Role/Page: undefined = closed, null = create, value = edit

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const [uRes, rRes, pRes, dRes] = await Promise.all([
        fetch('/api/backoffice/users'),
        fetch('/api/backoffice/roles'),
        fetch('/api/backoffice/pages'),
        fetch('/api/backoffice/departments'),
      ]);
      if (!uRes.ok || !rRes.ok || !pRes.ok || !dRes.ok) {
        throw new Error('Failed to load access management data.');
      }
      const [usersData, rolesData, pagesData, departmentsData] =
        await Promise.all([uRes.json(), rRes.json(), pRes.json(), dRes.json()]);
      setUsers(usersData);
      setRoles(rolesData);
      setPages(pagesData);
      setDepartments(departmentsData);
    } catch (err) {
      showToast(
        err instanceof Error
          ? err.message
          : 'Something went wrong loading data.',
        'error',
      );
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ── deactivate / delete handlers ─────────────────────────────────────────

  const handleDeactivateUser = async (user: V2UserRow) => {
    setConfirmDeactivateUser(null);
    const res = await fetch(`/api/backoffice/users/${user.id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to deactivate user.', 'error');
      return;
    }
    showToast('User deactivated.', 'success');
    fetchAll();
  };

  const handleDeleteRole = async (role: V2RoleRow) => {
    setConfirmDeleteRole(null);
    const res = await fetch(`/api/backoffice/roles/${role.id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to delete role.', 'error');
      return;
    }
    showToast('Role deleted.', 'success');
    fetchAll();
  };

  const handleDeletePage = async (page: V2PageRow) => {
    setConfirmDeletePage(null);
    const res = await fetch(`/api/backoffice/pages/${page.id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to delete page.', 'error');
      return;
    }
    showToast('Page deleted.', 'success');
    fetchAll();
  };

  // ── table definitions ────────────────────────────────────────────────────

  const userTableData: TableData = {
    id: 'users',
    ariaLabel: 'Backoffice users',
    caption: 'Users',
    headerColors: { backgroundColor: 'greyLightest', textColor: 'black' },
    columns: [
      {
        id: 'email',
        label: 'Email',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '260px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.email}
          </Typography>
        ),
      },
      {
        id: 'department',
        label: 'Department',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '160px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.department
              ? formatDepartmentName(row.original.department.department_name)
              : '—'}
          </Typography>
        ),
      },
      {
        id: 'roles',
        label: 'Roles',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '180px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.roles.length > 0
              ? row.original.roles
                  .map((r: V2Role) => formatRoleName(r.role_name))
                  .join(', ')
              : '—'}
          </Typography>
        ),
      },
      {
        id: 'direct_access',
        label: 'Direct Access',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '300px',
        render: (row) => (
          <PolicyList
            policies={policiesToStrings(row.original.policies)}
            emptyMessage="No direct policies"
          />
        ),
      },
      {
        id: 'status',
        label: 'Status',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '100px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.is_active ? 'Active' : 'Inactive'}
          </Typography>
        ),
      },
      {
        id: 'actions',
        label: 'Actions',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '120px',
        render: (row) => {
          const user: V2UserRow = row.original;
          return (
            <FluidContainer
              padding="0"
              flex
              flexDirection="column"
              gap={Spaces.sm}
            >
              <Button
                type="button"
                variant="edit"
                onClick={() => setEditingUser(user)}
              >
                Edit
              </Button>
              {user.is_active && (
                <Button
                  type="button"
                  variant="delete"
                  onClick={() => setConfirmDeactivateUser(user)}
                >
                  Deactivate
                </Button>
              )}
            </FluidContainer>
          );
        },
      },
    ],
    rows: users.map((user) => ({
      id: String(user.id),
      values: { email: user.email },
      original: user,
    })),
  };

  const roleTableData: TableData = {
    id: 'roles',
    ariaLabel: 'Backoffice roles',
    caption: 'Roles',
    headerColors: { backgroundColor: 'greyLightest', textColor: 'black' },
    columns: [
      {
        id: 'role_name',
        label: 'Role',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '200px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {formatRoleName(row.original.role_name)}
            {row.original.is_system && (
              <Typography as="span" variant="label" size="sm" weight="400">
                {' '}
                (System)
              </Typography>
            )}
          </Typography>
        ),
      },
      {
        id: 'description',
        label: 'Description',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '220px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.description || '—'}
          </Typography>
        ),
      },
      {
        id: 'role_access',
        label: 'Policies',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '340px',
        render: (row) => (
          <PolicyList
            policies={policiesToStrings(row.original.policies)}
            emptyMessage="No policies"
            align="left"
          />
        ),
      },
      {
        id: 'users_count',
        label: 'Users',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '80px',
        render: (row) => (
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
        render: (row) => {
          const role: V2RoleRow = row.original;
          return (
            <FluidContainer
              padding="0"
              flex
              flexDirection="column"
              gap={Spaces.sm}
            >
              <Button
                type="button"
                variant="edit"
                onClick={() => setEditingRole(role)}
              >
                Edit
              </Button>
              {!role.is_system && (
                <Button
                  type="button"
                  variant="delete"
                  onClick={() => setConfirmDeleteRole(role)}
                >
                  Delete
                </Button>
              )}
            </FluidContainer>
          );
        },
      },
    ],
    rows: roles.map((role) => ({
      id: String(role.id),
      values: { role_name: formatRoleName(role.role_name) },
      original: role,
    })),
  };

  const pageTableData: TableData = {
    id: 'pages',
    ariaLabel: 'Backoffice pages',
    caption: 'Pages',
    headerColors: { backgroundColor: 'greyLightest', textColor: 'black' },
    columns: [
      {
        id: 'title',
        label: 'Page',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '180px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.title}
          </Typography>
        ),
      },
      {
        id: 'route',
        label: 'Route',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '220px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.route}
          </Typography>
        ),
      },
      {
        id: 'page_actions',
        label: 'Actions',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '180px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.page_actions.length > 0
              ? row.original.page_actions
                  .map((a: { label: string }) => a.label)
                  .join(', ')
              : '—'}
          </Typography>
        ),
      },
      {
        id: 'page_scopes',
        label: 'Scopes',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '180px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.page_scopes.length > 0
              ? row.original.page_scopes
                  .map((s: { label: string }) => s.label)
                  .join(', ')
              : '—'}
          </Typography>
        ),
      },
      {
        id: 'actions',
        label: 'Actions',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '120px',
        render: (row) => {
          const page: V2PageRow = row.original;
          return (
            <FluidContainer
              padding="0"
              flex
              flexDirection="column"
              gap={Spaces.sm}
            >
              <Button
                type="button"
                variant="edit"
                onClick={() => setEditingPage(page)}
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="delete"
                onClick={() => setConfirmDeletePage(page)}
              >
                Delete
              </Button>
            </FluidContainer>
          );
        },
      },
    ],
    rows: pages.map((page) => ({
      id: String(page.id),
      values: { title: page.title },
      original: page,
    })),
  };

  const departmentTableData: TableData = {
    id: 'departments',
    ariaLabel: 'Backoffice departments',
    caption: 'Departments',
    headerColors: { backgroundColor: 'greyLightest', textColor: 'black' },
    columns: [
      {
        id: 'department_name',
        label: 'Department',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '200px',
        render: (row) => (
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
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.department_fullname}
          </Typography>
        ),
      },
      {
        id: 'users_count',
        label: 'Users',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '80px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.users_count}
          </Typography>
        ),
      },
      {
        id: 'status',
        label: 'Status',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '100px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.is_active ? 'Active' : 'Inactive'}
          </Typography>
        ),
      },
    ],
    rows: departments.map((dept) => ({
      id: String(dept.id),
      values: { department_name: formatDepartmentName(dept.department_name) },
      original: dept,
    })),
  };

  const sectionItems = [
    { label: 'Users', value: 'users' },
    { label: 'Roles', value: 'roles' },
    { label: 'Pages', value: 'pages' },
    { label: 'Departments', value: 'departments' },
  ];

  const activeTable =
    selectedSection === 'users'
      ? userTableData
      : selectedSection === 'roles'
      ? roleTableData
      : selectedSection === 'pages'
      ? pageTableData
      : departmentTableData;

  const canAddInSection =
    selectedSection === 'users' ||
    selectedSection === 'roles' ||
    selectedSection === 'pages';

  const handleAddClick = () => {
    if (selectedSection === 'users') setEditingUser(null);
    else if (selectedSection === 'roles') setEditingRole(null);
    else if (selectedSection === 'pages') setEditingPage(null);
  };

  if (accessLoading) {
    return (
      <Page>
        <BackofficeShell title="Access Management">
          <FluidContainer
            flex
            alignItems="center"
            justifyContent="center"
            height="70vh"
          >
            <Loading load={true} />
          </FluidContainer>
        </BackofficeShell>
      </Page>
    );
  }

  return (
    <Page>
      <Head>
        <title>Access Management</title>
      </Head>

      <BackofficeShell
        title="Access Management"
        subtitle="Manage backoffice users, roles, pages, departments, and permissions."
      >
        <NoBottomPaddingContainer>
          <ControlsRow padding="0">
            <Select
              ariaLabel="Select section"
              placeholder="Choose section"
              items={sectionItems}
              value={selectedSection}
              onValueChange={(value) => setSelectedSection(value as SectionKey)}
            />
            {canAddInSection && (
              <Button type="button" onClick={handleAddClick}>
                Add{' '}
                {selectedSection === 'users'
                  ? 'User'
                  : selectedSection === 'roles'
                  ? 'Role'
                  : 'Page'}
              </Button>
            )}
          </ControlsRow>
        </NoBottomPaddingContainer>

        <FluidContainer>
          {loading ? (
            <Loading load={false} />
          ) : (
            <FlexibleTable data={activeTable} />
          )}
        </FluidContainer>
      </BackofficeShell>

      {/* ── User modal ─────────────────────────────────────────────────────── */}
      {editingUser !== undefined && (
        <AccessManagementUserModal
          user={editingUser}
          allRoles={roles}
          allPages={pages}
          departments={departments}
          onClose={() => setEditingUser(undefined)}
          onSaved={fetchAll}
        />
      )}

      {/* ── Role modal ─────────────────────────────────────────────────────── */}
      {editingRole !== undefined && (
        <AccessManagementRoleModal
          role={editingRole}
          allPages={pages}
          onClose={() => setEditingRole(undefined)}
          onSaved={fetchAll}
        />
      )}

      {/* ── Page modal ─────────────────────────────────────────────────────── */}
      {editingPage !== undefined && (
        <AccessManagementPageModal
          page={editingPage}
          onClose={() => setEditingPage(undefined)}
          onSaved={fetchAll}
        />
      )}

      {/* ── Confirm deactivate user ─────────────────────────────────────────── */}
      {confirmDeactivateUser && (
        <ConfirmDialog
          title="Deactivate User"
          message="This will deactivate the following user and revoke backoffice access:"
          highlightedText={confirmDeactivateUser.email}
          confirmLabel="Deactivate"
          isDanger
          onConfirm={() => handleDeactivateUser(confirmDeactivateUser)}
          onCancel={() => setConfirmDeactivateUser(null)}
        />
      )}

      {/* ── Confirm delete role ─────────────────────────────────────────────── */}
      {confirmDeleteRole && (
        <ConfirmDialog
          title="Delete Role"
          message="This will permanently delete the following role and remove it from all users:"
          highlightedText={formatRoleName(confirmDeleteRole.role_name)}
          confirmLabel="Delete"
          isDanger
          onConfirm={() => handleDeleteRole(confirmDeleteRole)}
          onCancel={() => setConfirmDeleteRole(null)}
        />
      )}

      {/* ── Confirm delete page ─────────────────────────────────────────────── */}
      {confirmDeletePage && (
        <ConfirmDialog
          title="Delete Page"
          message="This will permanently delete the following page and all its actions, scopes, and policies:"
          highlightedText={confirmDeletePage.title}
          confirmLabel="Delete"
          isDanger
          onConfirm={() => handleDeletePage(confirmDeletePage)}
          onCancel={() => setConfirmDeletePage(null)}
        />
      )}
    </Page>
  );
}
