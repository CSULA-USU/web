import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Button,
  FluidContainer,
  Loading,
  Select,
  Tabs,
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
  AccessManagementDepartmentModal,
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

function formatDeactivatedAt(value: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
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
  const [editingDepartment, setEditingDepartment] = useState<
    V2DepartmentRow | null | undefined
  >(undefined);

  // ── confirm state ────────────────────────────────────────────────────────
  const [confirmDeactivateUser, setConfirmDeactivateUser] =
    useState<V2UserRow | null>(null);
  const [confirmReactivateUser, setConfirmReactivateUser] =
    useState<V2UserRow | null>(null);
  const [confirmPermanentDeleteUser, setConfirmPermanentDeleteUser] =
    useState<V2UserRow | null>(null);

  const [confirmDeactivateRole, setConfirmDeactivateRole] =
    useState<V2RoleRow | null>(null);
  const [confirmReactivateRole, setConfirmReactivateRole] =
    useState<V2RoleRow | null>(null);
  const [confirmPermanentDeleteRole, setConfirmPermanentDeleteRole] =
    useState<V2RoleRow | null>(null);

  const [confirmDeactivatePage, setConfirmDeactivatePage] =
    useState<V2PageRow | null>(null);
  const [confirmReactivatePage, setConfirmReactivatePage] =
    useState<V2PageRow | null>(null);
  const [confirmPermanentDeletePage, setConfirmPermanentDeletePage] =
    useState<V2PageRow | null>(null);

  const [confirmDeactivateDepartment, setConfirmDeactivateDepartment] =
    useState<V2DepartmentRow | null>(null);
  const [confirmReactivateDepartment, setConfirmReactivateDepartment] =
    useState<V2DepartmentRow | null>(null);
  const [
    confirmPermanentDeleteDepartment,
    setConfirmPermanentDeleteDepartment,
  ] = useState<V2DepartmentRow | null>(null);

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

  // ── user handlers ────────────────────────────────────────────────────────

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

  const handleReactivateUser = async (user: V2UserRow) => {
    setConfirmReactivateUser(null);
    const res = await fetch(`/api/backoffice/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: true }),
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to reactivate user.', 'error');
      return;
    }
    showToast('User reactivated.', 'success');
    fetchAll();
  };

  const handlePermanentDeleteUser = async (user: V2UserRow) => {
    setConfirmPermanentDeleteUser(null);
    const res = await fetch(`/api/backoffice/users/${user.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ permanent: true }),
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to permanently delete user.', 'error');
      return;
    }
    showToast('User permanently deleted.', 'success');
    fetchAll();
  };

  // ── role handlers ────────────────────────────────────────────────────────

  const handleDeactivateRole = async (role: V2RoleRow) => {
    setConfirmDeactivateRole(null);
    const res = await fetch(`/api/backoffice/roles/${role.id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to deactivate role.', 'error');
      return;
    }
    showToast('Role deactivated.', 'success');
    fetchAll();
  };

  const handleReactivateRole = async (role: V2RoleRow) => {
    setConfirmReactivateRole(null);
    const res = await fetch(`/api/backoffice/roles/${role.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: true }),
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to reactivate role.', 'error');
      return;
    }
    showToast('Role reactivated.', 'success');
    fetchAll();
  };

  const handlePermanentDeleteRole = async (role: V2RoleRow) => {
    setConfirmPermanentDeleteRole(null);
    const res = await fetch(`/api/backoffice/roles/${role.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ permanent: true }),
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to permanently delete role.', 'error');
      return;
    }
    showToast('Role permanently deleted.', 'success');
    fetchAll();
  };

  // ── page handlers ────────────────────────────────────────────────────────

  const handleDeactivatePage = async (page: V2PageRow) => {
    setConfirmDeactivatePage(null);
    const res = await fetch(`/api/backoffice/pages/${page.id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to deactivate page.', 'error');
      return;
    }
    showToast('Page deactivated.', 'success');
    fetchAll();
  };

  const handleReactivatePage = async (page: V2PageRow) => {
    setConfirmReactivatePage(null);
    const res = await fetch(`/api/backoffice/pages/${page.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: true }),
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to reactivate page.', 'error');
      return;
    }
    showToast('Page reactivated.', 'success');
    fetchAll();
  };

  const handlePermanentDeletePage = async (page: V2PageRow) => {
    setConfirmPermanentDeletePage(null);
    const res = await fetch(`/api/backoffice/pages/${page.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ permanent: true }),
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to permanently delete page.', 'error');
      return;
    }
    showToast('Page permanently deleted.', 'success');
    fetchAll();
  };

  // ── department handlers ──────────────────────────────────────────────────

  const handleDeactivateDepartment = async (dept: V2DepartmentRow) => {
    setConfirmDeactivateDepartment(null);
    const res = await fetch(`/api/backoffice/departments/${dept.id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to deactivate department.', 'error');
      return;
    }
    showToast('Department deactivated.', 'success');
    fetchAll();
  };

  const handleReactivateDepartment = async (dept: V2DepartmentRow) => {
    setConfirmReactivateDepartment(null);
    const res = await fetch(`/api/backoffice/departments/${dept.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: true }),
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to reactivate department.', 'error');
      return;
    }
    showToast('Department reactivated.', 'success');
    fetchAll();
  };

  const handlePermanentDeleteDepartment = async (dept: V2DepartmentRow) => {
    setConfirmPermanentDeleteDepartment(null);
    const res = await fetch(`/api/backoffice/departments/${dept.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ permanent: true }),
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(
        data.error ?? 'Failed to permanently delete department.',
        'error',
      );
      return;
    }
    showToast('Department permanently deleted.', 'success');
    fetchAll();
  };

  // ── derived lists ────────────────────────────────────────────────────────

  const activeUsers = users.filter((u) => u.is_active && !u.deactivated_at);
  const deactivatedUsers = users.filter(
    (u) => !u.is_active || !!u.deactivated_at,
  );

  const activeRoles = roles.filter((r) => r.is_active);
  const deactivatedRoles = roles.filter((r) => !r.is_active);

  const activePages = pages.filter((p) => p.is_active);
  const deactivatedPages = pages.filter((p) => !p.is_active);

  const activeDepartments = departments.filter((d) => d.is_active);
  const deactivatedDepartments = departments.filter((d) => !d.is_active);

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
              <Button
                type="button"
                variant="delete"
                onClick={() => setConfirmDeactivateUser(user)}
              >
                Deactivate
              </Button>
            </FluidContainer>
          );
        },
      },
    ],
    rows: activeUsers.map((user) => ({
      id: String(user.id),
      values: { email: user.email },
      original: user,
    })),
  };

  const deactivatedUserTableData: TableData = {
    id: 'deactivated-users',
    ariaLabel: 'Deactivated backoffice users',
    caption: 'Deactivated Users',
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
        id: 'deactivated_by',
        label: 'Deactivated By',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '200px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.deactivated_by ?? '—'}
          </Typography>
        ),
      },
      {
        id: 'deactivated_at',
        label: 'Deactivated On',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '160px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {formatDeactivatedAt(row.original.deactivated_at)}
          </Typography>
        ),
      },
      {
        id: 'actions',
        label: 'Actions',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '160px',
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
              <Button
                type="button"
                variant="edit"
                onClick={() => setConfirmReactivateUser(user)}
              >
                Reactivate
              </Button>
              <Button
                type="button"
                variant="delete"
                onClick={() => setConfirmPermanentDeleteUser(user)}
              >
                Permanently Delete
              </Button>
            </FluidContainer>
          );
        },
      },
    ],
    rows: deactivatedUsers.map((user) => ({
      id: String(user.id),
      values: { email: user.email },
      original: user,
    })),
  };

  const activeRoleTableData: TableData = {
    id: 'roles',
    ariaLabel: 'Active backoffice roles',
    caption: 'Active Roles',
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
              {role.users_count === 0 && (
                <Button
                  type="button"
                  variant="delete"
                  onClick={() => setConfirmDeactivateRole(role)}
                >
                  Deactivate
                </Button>
              )}
            </FluidContainer>
          );
        },
      },
    ],
    rows: activeRoles.map((role) => ({
      id: String(role.id),
      values: { role_name: formatRoleName(role.role_name) },
      original: role,
    })),
  };

  const deactivatedRoleTableData: TableData = {
    id: 'deactivated-roles',
    ariaLabel: 'Deactivated backoffice roles',
    caption: 'Deactivated Roles',
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
        id: 'deactivated_by',
        label: 'Deactivated By',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '200px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.deactivated_by ?? '—'}
          </Typography>
        ),
      },
      {
        id: 'deactivated_at',
        label: 'Deactivated On',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '160px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {formatDeactivatedAt(row.original.deactivated_at)}
          </Typography>
        ),
      },
      {
        id: 'actions',
        label: 'Actions',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '160px',
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
              <Button
                type="button"
                variant="edit"
                onClick={() => setConfirmReactivateRole(role)}
              >
                Reactivate
              </Button>
              {role.users_count === 0 && (
                <Button
                  type="button"
                  variant="delete"
                  onClick={() => setConfirmPermanentDeleteRole(role)}
                >
                  Permanently Delete
                </Button>
              )}
            </FluidContainer>
          );
        },
      },
    ],
    rows: deactivatedRoles.map((role) => ({
      id: String(role.id),
      values: { role_name: formatRoleName(role.role_name) },
      original: role,
    })),
  };

  const activePageTableData: TableData = {
    id: 'pages',
    ariaLabel: 'Active backoffice pages',
    caption: 'Active Pages',
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
                onClick={() => setConfirmDeactivatePage(page)}
              >
                Deactivate
              </Button>
            </FluidContainer>
          );
        },
      },
    ],
    rows: activePages.map((page) => ({
      id: String(page.id),
      values: { title: page.title },
      original: page,
    })),
  };

  const deactivatedPageTableData: TableData = {
    id: 'deactivated-pages',
    ariaLabel: 'Deactivated backoffice pages',
    caption: 'Deactivated Pages',
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
        id: 'deactivated_by',
        label: 'Deactivated By',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '200px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.deactivated_by ?? '—'}
          </Typography>
        ),
      },
      {
        id: 'deactivated_at',
        label: 'Deactivated On',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '160px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {formatDeactivatedAt(row.original.deactivated_at)}
          </Typography>
        ),
      },
      {
        id: 'actions',
        label: 'Actions',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '160px',
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
                variant="edit"
                onClick={() => setConfirmReactivatePage(page)}
              >
                Reactivate
              </Button>
              <Button
                type="button"
                variant="delete"
                onClick={() => setConfirmPermanentDeletePage(page)}
              >
                Permanently Delete
              </Button>
            </FluidContainer>
          );
        },
      },
    ],
    rows: deactivatedPages.map((page) => ({
      id: String(page.id),
      values: { title: page.title },
      original: page,
    })),
  };

  const activeDepartmentTableData: TableData = {
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
        id: 'actions',
        label: 'Actions',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '120px',
        render: (row) => {
          const dept: V2DepartmentRow = row.original;
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
                onClick={() => setEditingDepartment(dept)}
              >
                Edit
              </Button>
              {dept.users_count === 0 && (
                <Button
                  type="button"
                  variant="delete"
                  onClick={() => setConfirmDeactivateDepartment(dept)}
                >
                  Deactivate
                </Button>
              )}
            </FluidContainer>
          );
        },
      },
    ],
    rows: activeDepartments.map((dept) => ({
      id: String(dept.id),
      values: { department_name: formatDepartmentName(dept.department_name) },
      original: dept,
    })),
  };

  const deactivatedDepartmentTableData: TableData = {
    id: 'deactivated-departments',
    ariaLabel: 'Deactivated backoffice departments',
    caption: 'Deactivated Departments',
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
        id: 'deactivated_by',
        label: 'Deactivated By',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '200px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {row.original.deactivated_by ?? '—'}
          </Typography>
        ),
      },
      {
        id: 'deactivated_at',
        label: 'Deactivated On',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '160px',
        render: (row) => (
          <Typography as="span" variant="label" size="sm" weight="400">
            {formatDeactivatedAt(row.original.deactivated_at)}
          </Typography>
        ),
      },
      {
        id: 'actions',
        label: 'Actions',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '160px',
        render: (row) => {
          const dept: V2DepartmentRow = row.original;
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
                onClick={() => setEditingDepartment(dept)}
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="edit"
                onClick={() => setConfirmReactivateDepartment(dept)}
              >
                Reactivate
              </Button>
              {dept.users_count === 0 && (
                <Button
                  type="button"
                  variant="delete"
                  onClick={() => setConfirmPermanentDeleteDepartment(dept)}
                >
                  Permanently Delete
                </Button>
              )}
            </FluidContainer>
          );
        },
      },
    ],
    rows: deactivatedDepartments.map((dept) => ({
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

  const canAddInSection =
    selectedSection === 'users' ||
    selectedSection === 'roles' ||
    selectedSection === 'pages' ||
    selectedSection === 'departments';

  const handleAddClick = () => {
    if (selectedSection === 'users') setEditingUser(null);
    else if (selectedSection === 'roles') setEditingRole(null);
    else if (selectedSection === 'pages') setEditingPage(null);
    else if (selectedSection === 'departments') setEditingDepartment(null);
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
                  : selectedSection === 'pages'
                  ? 'Page'
                  : 'Department'}
              </Button>
            )}
          </ControlsRow>
        </NoBottomPaddingContainer>

        <FluidContainer>
          {loading ? (
            <Loading load={false} />
          ) : selectedSection === 'users' ? (
            <Tabs
              items={[
                {
                  title: 'Active Users',
                  children: <FlexibleTable data={userTableData} />,
                },
                {
                  title: 'Deactivated Users',
                  children: <FlexibleTable data={deactivatedUserTableData} />,
                },
              ]}
            />
          ) : selectedSection === 'roles' ? (
            <Tabs
              items={[
                {
                  title: 'Active Roles',
                  children: <FlexibleTable data={activeRoleTableData} />,
                },
                {
                  title: 'Deactivated Roles',
                  children: <FlexibleTable data={deactivatedRoleTableData} />,
                },
              ]}
            />
          ) : selectedSection === 'pages' ? (
            <Tabs
              items={[
                {
                  title: 'Active Pages',
                  children: <FlexibleTable data={activePageTableData} />,
                },
                {
                  title: 'Deactivated Pages',
                  children: <FlexibleTable data={deactivatedPageTableData} />,
                },
              ]}
            />
          ) : (
            <Tabs
              items={[
                {
                  title: 'Active Departments',
                  children: <FlexibleTable data={activeDepartmentTableData} />,
                },
                {
                  title: 'Deactivated Departments',
                  children: (
                    <FlexibleTable data={deactivatedDepartmentTableData} />
                  ),
                },
              ]}
            />
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

      {/* ── Department modal ────────────────────────────────────────────────── */}
      {editingDepartment !== undefined && (
        <AccessManagementDepartmentModal
          department={editingDepartment}
          onClose={() => setEditingDepartment(undefined)}
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
          onConfirm={() => handleDeactivateUser(confirmDeactivateUser)}
          onCancel={() => setConfirmDeactivateUser(null)}
        />
      )}

      {/* ── Confirm reactivate user ─────────────────────────────────────────── */}
      {confirmReactivateUser && (
        <ConfirmDialog
          title="Reactivate User"
          message="This will restore backoffice access for the following user:"
          highlightedText={confirmReactivateUser.email}
          confirmLabel="Reactivate"
          onConfirm={() => handleReactivateUser(confirmReactivateUser)}
          onCancel={() => setConfirmReactivateUser(null)}
        />
      )}

      {/* ── Confirm permanent delete user ───────────────────────────────────── */}
      {confirmPermanentDeleteUser && (
        <ConfirmDialog
          title="Permanently Delete User"
          message="This action is irreversible. The user will be permanently removed from the system."
          highlightedText={confirmPermanentDeleteUser.email}
          confirmLabel="Permanently Delete"
          onConfirm={() =>
            handlePermanentDeleteUser(confirmPermanentDeleteUser)
          }
          onCancel={() => setConfirmPermanentDeleteUser(null)}
        />
      )}

      {/* ── Confirm deactivate role ─────────────────────────────────────────── */}
      {confirmDeactivateRole && (
        <ConfirmDialog
          title="Deactivate Role"
          message="This will deactivate the following role:"
          highlightedText={formatRoleName(confirmDeactivateRole.role_name)}
          confirmLabel="Deactivate"
          onConfirm={() => handleDeactivateRole(confirmDeactivateRole)}
          onCancel={() => setConfirmDeactivateRole(null)}
        />
      )}

      {/* ── Confirm reactivate role ─────────────────────────────────────────── */}
      {confirmReactivateRole && (
        <ConfirmDialog
          title="Reactivate Role"
          message="This will restore the following role:"
          highlightedText={formatRoleName(confirmReactivateRole.role_name)}
          confirmLabel="Reactivate"
          onConfirm={() => handleReactivateRole(confirmReactivateRole)}
          onCancel={() => setConfirmReactivateRole(null)}
        />
      )}

      {/* ── Confirm permanent delete role ───────────────────────────────────── */}
      {confirmPermanentDeleteRole && (
        <ConfirmDialog
          title="Permanently Delete Role"
          message="This action is irreversible. The role will be permanently removed from the system."
          highlightedText={formatRoleName(confirmPermanentDeleteRole.role_name)}
          confirmLabel="Permanently Delete"
          onConfirm={() =>
            handlePermanentDeleteRole(confirmPermanentDeleteRole)
          }
          onCancel={() => setConfirmPermanentDeleteRole(null)}
        />
      )}

      {/* ── Confirm deactivate page ─────────────────────────────────────────── */}
      {confirmDeactivatePage && (
        <ConfirmDialog
          title="Deactivate Page"
          message="This will deactivate the following page:"
          highlightedText={confirmDeactivatePage.title}
          confirmLabel="Deactivate"
          onConfirm={() => handleDeactivatePage(confirmDeactivatePage)}
          onCancel={() => setConfirmDeactivatePage(null)}
        />
      )}

      {/* ── Confirm reactivate page ─────────────────────────────────────────── */}
      {confirmReactivatePage && (
        <ConfirmDialog
          title="Reactivate Page"
          message="This will restore the following page:"
          highlightedText={confirmReactivatePage.title}
          confirmLabel="Reactivate"
          onConfirm={() => handleReactivatePage(confirmReactivatePage)}
          onCancel={() => setConfirmReactivatePage(null)}
        />
      )}

      {/* ── Confirm permanent delete page ───────────────────────────────────── */}
      {confirmPermanentDeletePage && (
        <ConfirmDialog
          title="Permanently Delete Page"
          message="This action is irreversible. The page will be permanently removed from the system."
          highlightedText={confirmPermanentDeletePage.title}
          confirmLabel="Permanently Delete"
          onConfirm={() =>
            handlePermanentDeletePage(confirmPermanentDeletePage)
          }
          onCancel={() => setConfirmPermanentDeletePage(null)}
        />
      )}

      {/* ── Confirm deactivate department ───────────────────────────────────── */}
      {confirmDeactivateDepartment && (
        <ConfirmDialog
          title="Deactivate Department"
          message="This will deactivate the following department:"
          highlightedText={
            confirmDeactivateDepartment.department_fullname ||
            confirmDeactivateDepartment.department_name
          }
          confirmLabel="Deactivate"
          onConfirm={() =>
            handleDeactivateDepartment(confirmDeactivateDepartment)
          }
          onCancel={() => setConfirmDeactivateDepartment(null)}
        />
      )}

      {/* ── Confirm reactivate department ───────────────────────────────────── */}
      {confirmReactivateDepartment && (
        <ConfirmDialog
          title="Reactivate Department"
          message="This will restore the following department:"
          highlightedText={
            confirmReactivateDepartment.department_fullname ||
            confirmReactivateDepartment.department_name
          }
          confirmLabel="Reactivate"
          onConfirm={() =>
            handleReactivateDepartment(confirmReactivateDepartment)
          }
          onCancel={() => setConfirmReactivateDepartment(null)}
        />
      )}

      {/* ── Confirm permanent delete department ─────────────────────────────── */}
      {confirmPermanentDeleteDepartment && (
        <ConfirmDialog
          title="Permanently Delete Department"
          message="This action is irreversible. The department will be permanently removed from the system."
          highlightedText={
            confirmPermanentDeleteDepartment.department_fullname ||
            confirmPermanentDeleteDepartment.department_name
          }
          confirmLabel="Permanently Delete"
          onConfirm={() =>
            handlePermanentDeleteDepartment(confirmPermanentDeleteDepartment)
          }
          onCancel={() => setConfirmPermanentDeleteDepartment(null)}
        />
      )}
    </Page>
  );
}
