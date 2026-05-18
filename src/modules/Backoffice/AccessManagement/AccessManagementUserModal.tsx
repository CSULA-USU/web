import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, FluidContainer, Input, Select, Typography } from 'components';
import BaseModal from 'modules/Modals/BaseModal';
import { Colors, Spaces } from 'theme';
import { useToast } from 'context/ToastContext';
import {
  formatRoleName,
  formatDepartmentName,
} from 'lib/backoffice/formatters';
import { AccessPolicyEditor } from './AccessPolicyEditor';
import type {
  V2UserRow,
  V2RoleRow,
  V2PageRow,
  V2DepartmentRow,
  V2Role,
  V2Policy,
} from './types';

interface AccessManagementUserModalProps {
  user: V2UserRow | null;
  allRoles: V2RoleRow[];
  allPages: V2PageRow[];
  departments: V2DepartmentRow[];
  onClose: () => void;
  onSaved: () => void;
}

const SectionTitle = styled.div`
  padding-bottom: ${Spaces.xs};
  border-bottom: 1px solid ${Colors.grey};
  margin-bottom: ${Spaces.sm};
`;

const Field = styled.label`
  display: grid;
  gap: ${Spaces.xs};
`;

const Form = styled.form`
  display: grid;
  gap: ${Spaces.md};
`;

const RoleChip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${Spaces.sm};
  padding: ${Spaces.xs} ${Spaces.sm};
  background: ${Colors.greyLightest};
  border-radius: 4px;
`;

const RemoveBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 3px;
  background: transparent;
  color: ${Colors.greyDarker};
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: ${Colors.greyLighter};
    color: ${Colors.black};
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const InheritedPolicyGroup = styled.div`
  display: grid;
  gap: ${Spaces.xs};
  padding-left: ${Spaces.sm};
  border-left: 3px solid ${Colors.grey};
`;

const EmptyNote = styled.div`
  color: ${Colors.greyDarker};
`;

export function AccessManagementUserModal({
  user,
  allRoles,
  allPages,
  departments,
  onClose,
  onSaved,
}: AccessManagementUserModalProps) {
  const { showToast } = useToast();
  const isCreate = user === null;

  const [email, setEmail] = useState(user?.email ?? '');
  const [deptId, setDeptId] = useState(String(user?.department?.id ?? ''));
  const [savingBasics, setSavingBasics] = useState(false);

  const [localRoles, setLocalRoles] = useState<V2Role[]>(user?.roles ?? []);
  const [localPolicies, setLocalPolicies] = useState<V2Policy[]>(
    user?.policies ?? [],
  );
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [assigningRole, setAssigningRole] = useState(false);

  // Sync roles/policies from parent refresh (basics form is not re-synced to avoid overwriting input)
  useEffect(() => {
    setLocalRoles(user?.roles ?? []);
    setLocalPolicies(user?.policies ?? []);
  }, [user]);

  const deptItems = departments.map((d) => ({
    label: formatDepartmentName(d.department_name),
    value: String(d.id),
  }));

  const assignableRoles = allRoles.filter(
    (r) => !localRoles.some((lr) => lr.id === r.id),
  );
  const assignableRoleItems = assignableRoles.map((r) => ({
    label: formatRoleName(r.role_name),
    value: String(r.id),
  }));

  const inheritedPolicies = localRoles.flatMap((lr) => {
    const fullRole = allRoles.find((r) => r.id === lr.id);
    return (fullRole?.policies ?? []).map((p) => ({
      ...p,
      roleName: fullRole?.role_name ?? '',
    }));
  });

  const handleBasicsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSavingBasics(true);
    try {
      if (isCreate) {
        const res = await fetch('/api/backoffice/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.trim(),
            department_id: deptId ? Number(deptId) : null,
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          showToast(data.error ?? 'Failed to create user.', 'error');
          return;
        }
        showToast('User created.', 'success');
        onSaved();
        onClose();
      } else {
        const res = await fetch(`/api/backoffice/users/${user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.trim(),
            department_id: deptId ? Number(deptId) : null,
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          showToast(data.error ?? 'Failed to update user.', 'error');
          return;
        }
        showToast('User updated.', 'success');
        onSaved();
      }
    } finally {
      setSavingBasics(false);
    }
  };

  const handleAssignRole = async () => {
    if (!user || !selectedRoleId || assigningRole) return;
    setAssigningRole(true);
    try {
      const res = await fetch(`/api/backoffice/users/${user.id}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role_id: Number(selectedRoleId) }),
      });
      if (!res.ok) {
        const data = await res.json();
        showToast(data.error ?? 'Failed to assign role.', 'error');
        return;
      }
      const assigned = allRoles.find((r) => String(r.id) === selectedRoleId);
      if (assigned) {
        setLocalRoles((prev) => [
          ...prev,
          {
            id: assigned.id,
            role_key: assigned.role_key,
            role_name: assigned.role_name,
          },
        ]);
      }
      setSelectedRoleId('');
      showToast('Role assigned.', 'success');
      onSaved();
    } finally {
      setAssigningRole(false);
    }
  };

  const handleUnassignRole = async (roleId: number) => {
    if (!user) return;
    const res = await fetch(`/api/backoffice/users/${user.id}/roles`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role_id: roleId }),
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to remove role.', 'error');
      return;
    }
    setLocalRoles((prev) => prev.filter((r) => r.id !== roleId));
    showToast('Role removed.', 'success');
    onSaved();
  };

  const handleAddPolicy = async (
    pageId: number,
    action: string,
    scope: string,
  ) => {
    if (!user) return;
    const res = await fetch(`/api/backoffice/users/${user.id}/policies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page_id: pageId, action, scope }),
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to add policy.', 'error');
      throw new Error(data.error);
    }
    showToast('Policy added.', 'success');
    onSaved();
  };

  const handleRemovePolicy = async (policyId: number) => {
    if (!user) return;
    const res = await fetch(`/api/backoffice/users/${user.id}/policies`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ policy_id: policyId }),
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to remove policy.', 'error');
      throw new Error(data.error);
    }
    setLocalPolicies((prev) => prev.filter((p) => p.id !== policyId));
    showToast('Policy removed.', 'success');
    onSaved();
  };

  return (
    <BaseModal
      title={isCreate ? 'Add User' : 'Edit User'}
      onClose={onClose}
      maxWidth="680px"
    >
      <FluidContainer padding="0" flex flexDirection="column" gap={Spaces.lg}>
        {/* ── Basics ─────────────────────────────────────────── */}
        <div>
          <SectionTitle>
            <Typography as="h3" variant="labelTitle" size="sm">
              {isCreate ? 'User Details' : 'Basics'}
            </Typography>
          </SectionTitle>
          <Form id="user-basics-form" onSubmit={handleBasicsSubmit}>
            <Field>
              <Typography as="span" variant="label" size="sm" weight="600">
                Email
              </Typography>
              <Input
                type="email"
                placeholder="ex@calstatela.edu"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
            </Field>
            <Field>
              <Typography as="span" variant="label" size="sm" weight="600">
                Department
              </Typography>
              <Select
                ariaLabel="Department"
                placeholder="No department"
                items={deptItems}
                value={deptId || undefined}
                onValueChange={setDeptId}
              />
            </Field>
            <div>
              <Button
                type="submit"
                form="user-basics-form"
                disabled={savingBasics}
              >
                {savingBasics
                  ? 'Saving…'
                  : isCreate
                  ? 'Create User'
                  : 'Save Changes'}
              </Button>
            </div>
          </Form>
        </div>

        {/* ── Roles (edit mode only) ──────────────────────────── */}
        {!isCreate ? (
          <div>
            <SectionTitle>
              <Typography as="h3" variant="labelTitle" size="sm">
                Roles
              </Typography>
            </SectionTitle>
            <FluidContainer
              padding="0"
              flex
              flexDirection="column"
              gap={Spaces.sm}
            >
              {localRoles.length === 0 ? (
                <EmptyNote>
                  <Typography as="span" variant="label" size="sm" weight="400">
                    No roles assigned.
                  </Typography>
                </EmptyNote>
              ) : (
                <FluidContainer
                  padding="0"
                  flex
                  flexDirection="column"
                  gap={Spaces.xs}
                >
                  {localRoles.map((r) => (
                    <RoleChip key={r.id}>
                      <Typography
                        as="span"
                        variant="label"
                        size="sm"
                        weight="400"
                      >
                        {formatRoleName(r.role_name)}
                      </Typography>
                      <RemoveBtn
                        type="button"
                        aria-label={`Remove role ${r.role_name}`}
                        onClick={() => handleUnassignRole(r.id)}
                      >
                        ×
                      </RemoveBtn>
                    </RoleChip>
                  ))}
                </FluidContainer>
              )}

              {assignableRoles.length > 0 && (
                <Typography as="p" variant="label" size="sm" weight="600">
                  Assign New Role
                </Typography>
              )}
              {assignableRoles.length > 0 ? (
                <FluidContainer
                  padding="0"
                  flex
                  gap={Spaces.sm}
                  alignItems="center"
                >
                  <Select
                    ariaLabel="Assign role"
                    placeholder="Select role to assign"
                    items={assignableRoleItems}
                    value={selectedRoleId || undefined}
                    onValueChange={setSelectedRoleId}
                    disabled={assigningRole}
                  />
                  <Button
                    type="button"
                    onClick={handleAssignRole}
                    disabled={!selectedRoleId || assigningRole}
                  >
                    {assigningRole ? 'Assigning…' : 'Assign'}
                  </Button>
                </FluidContainer>
              ) : null}
            </FluidContainer>
          </div>
        ) : null}

        {/* ── Inherited Access (edit mode only, read-only) ────── */}
        {!isCreate ? (
          <div>
            <SectionTitle>
              <Typography as="h3" variant="labelTitle" size="sm">
                Inherited Access
              </Typography>
            </SectionTitle>
            {inheritedPolicies.length === 0 ? (
              <EmptyNote>
                <Typography as="span" variant="label" size="sm" weight="400">
                  No inherited access. Assign roles above to grant inherited
                  permissions.
                </Typography>
              </EmptyNote>
            ) : (
              <FluidContainer
                padding="0"
                flex
                flexDirection="column"
                gap={Spaces.sm}
              >
                {localRoles.map((lr) => {
                  const fullRole = allRoles.find((r) => r.id === lr.id);
                  if (!fullRole?.policies.length) return null;
                  return (
                    <InheritedPolicyGroup key={lr.id}>
                      <Typography as="p" variant="label" size="sm" weight="600">
                        Via {formatRoleName(lr.role_name)}
                      </Typography>
                      <FluidContainer
                        padding="0"
                        flex
                        flexDirection="column"
                        gap={Spaces.xs}
                      >
                        {fullRole.policies.map((p) => (
                          <Typography
                            key={p.id}
                            as="span"
                            variant="label"
                            size="sm"
                            weight="400"
                          >
                            {p.page_title}: {p.action} / {p.scope}
                          </Typography>
                        ))}
                      </FluidContainer>
                    </InheritedPolicyGroup>
                  );
                })}
              </FluidContainer>
            )}
          </div>
        ) : null}

        {/* ── Direct Access (edit mode only) ─────────────────── */}
        {!isCreate ? (
          <div>
            <SectionTitle>
              <Typography as="h3" variant="labelTitle" size="sm">
                Direct Access
              </Typography>
            </SectionTitle>
            <Typography as="p" variant="label" size="sm" weight="400">
              User-specific overrides, independent of roles.
            </Typography>
            <FluidContainer padding="0" padding-top={Spaces.sm}>
              <AccessPolicyEditor
                policies={localPolicies}
                pages={allPages}
                onAdd={handleAddPolicy}
                onRemove={handleRemovePolicy}
              />
            </FluidContainer>
          </div>
        ) : null}
      </FluidContainer>
    </BaseModal>
  );
}

export default AccessManagementUserModal;
