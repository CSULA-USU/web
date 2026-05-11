import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { Button, FluidContainer, Input, Typography } from 'components';
import BaseModal from 'modules/Modals/BaseModal';
import { Colors, Spaces } from 'theme';
import { useToast } from 'context/ToastContext';
import { formatRoleName } from 'lib/backoffice/formatters';
import { AccessPolicyEditor } from './AccessPolicyEditor';
import type { V2RoleRow, V2PageRow } from './types';

interface AccessManagementRoleModalProps {
  role: V2RoleRow | null;
  allPages: V2PageRow[];
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

const SystemBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: ${Colors.greyLighter};
  color: ${Colors.greyDarker};
  border-radius: 4px;
  font-size: 12px;
`;

export function AccessManagementRoleModal({
  role,
  allPages,
  onClose,
  onSaved,
}: AccessManagementRoleModalProps) {
  const { showToast } = useToast();
  const isCreate = role === null;
  const isSystem = role?.is_system ?? false;

  const [roleKey, setRoleKey] = useState(role?.role_key ?? '');
  const [roleName, setRoleName] = useState(role?.role_name ?? '');
  const [description, setDescription] = useState(role?.description ?? '');
  const [savingBasics, setSavingBasics] = useState(false);

  const handleBasicsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!roleName.trim()) return;
    if (isCreate && !roleKey.trim()) return;

    setSavingBasics(true);
    try {
      if (isCreate) {
        const res = await fetch('/api/backoffice/roles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            role_key: roleKey.trim(),
            role_name: roleName.trim(),
            description: description.trim() || null,
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          showToast(data.error ?? 'Failed to create role.', 'error');
          return;
        }
        showToast('Role created.', 'success');
        onSaved();
        onClose();
      } else {
        const res = await fetch(`/api/backoffice/roles/${role.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            role_name: roleName.trim(),
            description: description.trim() || null,
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          showToast(data.error ?? 'Failed to update role.', 'error');
          return;
        }
        showToast('Role updated.', 'success');
        onSaved();
      }
    } finally {
      setSavingBasics(false);
    }
  };

  const handleAddPolicy = async (
    pageId: number,
    action: string,
    scope: string,
  ) => {
    if (!role) return;
    const res = await fetch(`/api/backoffice/roles/${role.id}/policies`, {
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
    if (!role) return;
    const res = await fetch(`/api/backoffice/roles/${role.id}/policies`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ policy_id: policyId }),
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error ?? 'Failed to remove policy.', 'error');
      throw new Error(data.error);
    }
    showToast('Policy removed.', 'success');
    onSaved();
  };

  return (
    <BaseModal
      title={
        isCreate
          ? 'Add Role'
          : isSystem
          ? `${formatRoleName(role.role_name)} (System)`
          : `Edit Role: ${formatRoleName(role.role_name)}`
      }
      onClose={onClose}
      maxWidth="640px"
      footer={
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      }
    >
      <FluidContainer padding="0" flex flexDirection="column" gap={Spaces.lg}>
        {/* ── Basics ─────────────────────────────────────────── */}
        <div>
          <SectionTitle>
            <FluidContainer
              padding="0"
              flex
              alignItems="center"
              gap={Spaces.sm}
            >
              <Typography as="h3" variant="labelTitle" size="sm">
                {isCreate ? 'Role Details' : 'Basics'}
              </Typography>
              {isSystem && <SystemBadge>System role</SystemBadge>}
            </FluidContainer>
          </SectionTitle>

          {role && isSystem ? (
            <FluidContainer
              padding="0"
              flex
              flexDirection="column"
              gap={Spaces.sm}
            >
              <Field>
                <Typography as="span" variant="label" size="sm" weight="600">
                  Role Key
                </Typography>
                <Typography as="span" variant="label" size="sm" weight="400">
                  {role.role_key}
                </Typography>
              </Field>
              <Field>
                <Typography as="span" variant="label" size="sm" weight="600">
                  Role Name
                </Typography>
                <Typography as="span" variant="label" size="sm" weight="400">
                  {role.role_name}
                </Typography>
              </Field>
              {role.description && (
                <Field>
                  <Typography as="span" variant="label" size="sm" weight="600">
                    Description
                  </Typography>
                  <Typography as="span" variant="label" size="sm" weight="400">
                    {role.description}
                  </Typography>
                </Field>
              )}
            </FluidContainer>
          ) : (
            <Form id="role-basics-form" onSubmit={handleBasicsSubmit}>
              {isCreate && (
                <Field>
                  <Typography as="span" variant="label" size="sm" weight="600">
                    Role Key
                  </Typography>
                  <Input
                    type="text"
                    value={roleKey}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setRoleKey(e.target.value)
                    }
                    placeholder="e.g. events_editor"
                    required
                  />
                </Field>
              )}
              <Field>
                <Typography as="span" variant="label" size="sm" weight="600">
                  Role Name
                </Typography>
                <Input
                  type="text"
                  value={roleName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRoleName(e.target.value)
                  }
                  required
                />
              </Field>
              <Field>
                <Typography as="span" variant="label" size="sm" weight="600">
                  Description
                </Typography>
                <Input
                  type="text"
                  value={description}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDescription(e.target.value)
                  }
                />
              </Field>
              <div>
                <Button
                  type="submit"
                  form="role-basics-form"
                  disabled={savingBasics}
                >
                  {savingBasics
                    ? 'Saving…'
                    : isCreate
                    ? 'Create Role'
                    : 'Save Changes'}
                </Button>
              </div>
            </Form>
          )}
        </div>

        {/* ── Policies (edit mode only) ───────────────────────── */}
        {!isCreate && role && (
          <div>
            <SectionTitle>
              <Typography as="h3" variant="labelTitle" size="sm">
                Policies
              </Typography>
            </SectionTitle>
            <AccessPolicyEditor
              policies={role.policies}
              pages={allPages}
              onAdd={handleAddPolicy}
              onRemove={handleRemovePolicy}
            />
          </div>
        )}
      </FluidContainer>
    </BaseModal>
  );
}

export default AccessManagementRoleModal;
