import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { Button, FluidContainer, Input, Typography } from 'components';
import BaseModal from 'modules/Modals/BaseModal';
import { Spaces } from 'theme';
import { useToast } from 'context/ToastContext';
import type { V2DepartmentRow } from './types';

interface AccessManagementDepartmentModalProps {
  department: V2DepartmentRow | null;
  onClose: () => void;
  onSaved: () => void;
}

const Field = styled.label`
  display: grid;
  gap: ${Spaces.xs};
`;

const Form = styled.form`
  display: grid;
  gap: ${Spaces.md};
`;

export function AccessManagementDepartmentModal({
  department,
  onClose,
  onSaved,
}: AccessManagementDepartmentModalProps) {
  const { showToast } = useToast();
  const isCreate = department === null;

  const [departmentKey, setDepartmentKey] = useState(
    department?.department_key ?? '',
  );
  const [departmentName, setDepartmentName] = useState(
    department?.department_name ?? '',
  );
  const [departmentFullname, setDepartmentFullname] = useState(
    department?.department_fullname ?? '',
  );
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!departmentName.trim()) return;
    if (isCreate && !departmentKey.trim()) return;

    setSaving(true);
    try {
      if (isCreate) {
        const res = await fetch('/api/backoffice/departments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            department_key: departmentKey.trim(),
            department_name: departmentName.trim(),
            department_fullname: departmentFullname.trim() || null,
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          showToast(data.error ?? 'Failed to create department.', 'error');
          return;
        }
        showToast('Department created.', 'success');
        onSaved();
        onClose();
      } else {
        const res = await fetch(
          `/api/backoffice/departments/${department.id}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              department_name: departmentName.trim(),
              department_fullname: departmentFullname.trim() || null,
            }),
          },
        );
        if (!res.ok) {
          const data = await res.json();
          showToast(data.error ?? 'Failed to update department.', 'error');
          return;
        }
        showToast('Department updated.', 'success');
        onSaved();
        onClose();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <BaseModal
      title={isCreate ? 'Add Department' : `Edit Department`}
      onClose={onClose}
      maxWidth="480px"
    >
      <Form onSubmit={handleSubmit}>
        {isCreate && (
          <Field>
            <Typography as="span" variant="label" size="sm" weight="600">
              Department Key
            </Typography>
            <Input
              type="text"
              value={departmentKey}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDepartmentKey(e.target.value)
              }
              placeholder="e.g. graffix"
              required
            />
          </Field>
        )}
        <Field>
          <Typography as="span" variant="label" size="sm" weight="600">
            Short Name
          </Typography>
          <Input
            type="text"
            value={departmentName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDepartmentName(e.target.value)
            }
            placeholder="e.g. Graffix"
            required
          />
        </Field>
        <Field>
          <Typography as="span" variant="label" size="sm" weight="600">
            Full Name
          </Typography>
          <Input
            type="text"
            value={departmentFullname}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDepartmentFullname(e.target.value)
            }
            placeholder="e.g. Graffix Design Studio"
          />
        </Field>
        <FluidContainer padding="0">
          <Button type="submit" disabled={saving}>
            {saving
              ? 'Saving…'
              : isCreate
              ? 'Create Department'
              : 'Save Changes'}
          </Button>
        </FluidContainer>
      </Form>
    </BaseModal>
  );
}

export default AccessManagementDepartmentModal;
