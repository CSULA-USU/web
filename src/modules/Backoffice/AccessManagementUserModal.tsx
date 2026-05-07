import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Select, Typography } from 'components';
import BaseModal from 'modules/Modals/BaseModal';
import { Spaces } from 'theme';

type Option = {
  id: number;
  label: string;
};

type UserFormValue = {
  email: string;
  role: number | '';
  department: number | '';
  policies: string[];
};

interface AccessManagementUserModalProps {
  user: {
    id: number;
    email: string;
    policies: string[];
    role: number;
    department: number;
  } | null;
  roles: Option[];
  departments: Option[];
  onClose: () => void;
  onSubmit: (value: UserFormValue) => void;
}

const Form = styled.form`
  display: grid;
  gap: ${Spaces.md};
`;

const Field = styled.label`
  display: grid;
  gap: ${Spaces.xs};
`;

export function AccessManagementUserModal({
  user,
  roles,
  departments,
  onClose,
  onSubmit,
}: AccessManagementUserModalProps) {
  const [formData, setFormData] = useState<UserFormValue>({
    email: '',
    role: '',
    department: '',
    policies: [],
  });

  useEffect(() => {
    if (!user) {
      setFormData({
        email: '',
        role: '',
        department: '',
        policies: [],
      });
      return;
    }

    setFormData({
      email: user.email,
      role: user.role,
      department: user.department,
      policies: user.policies ?? [],
    });
  }, [user]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.role || !formData.department) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <BaseModal
      title={user ? 'Edit User' : 'Add User'}
      onClose={onClose}
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" form="access-user-form">
            {user ? 'Update User' : 'Add User'}
          </Button>
        </>
      }
    >
      <Form id="access-user-form" onSubmit={handleSubmit}>
        <Field>
          <Typography as="span" variant="label" size="sm" weight="600">
            Email
          </Typography>
          <Input
            type="email"
            value={formData.email}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({ ...prev, email: event.target.value }))
            }
            required
          />
        </Field>

        <Field>
          <Typography as="span" variant="label" size="sm" weight="600">
            Role
          </Typography>
          <Select
            value={String(formData.role)}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                role: Number(value),
              }))
            }
            required
            items={roles.map((role) => ({
              value: String(role.id),
              label: role.label,
            }))}
          />
        </Field>

        <Field>
          <Typography as="span" variant="label" size="sm" weight="600">
            Department
          </Typography>
          <Select
            value={String(formData.department)}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                department: Number(value),
              }))
            }
            required
            items={departments.map((department) => ({
              value: String(department.id),
              label: department.label,
            }))}
          />
        </Field>
      </Form>
    </BaseModal>
  );
}

export default AccessManagementUserModal;
