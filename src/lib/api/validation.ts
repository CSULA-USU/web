import {
  AddActionBody,
  AddScopeBody,
  CreateDepartmentBody,
  CreatePageBody,
  CreateRoleBody,
  UpdateDepartmentBody,
  UpdatePageBody,
  UpdateRoleBody,
  UpdateUserBody,
} from 'types';

const INJECTION_PATTERNS = [
  /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /(['"])\s*;\s*drop\s+table/gi,
  /union\s+select/gi,
  /--\s*$/gm,
];

const containsInjection = (value: string): boolean => {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(value));
};

type StringFieldOptions = {
  required?: boolean;
  maxLength?: number;
  fieldName?: string;
};

export const validateStringField = (
  value: string | null | undefined,
  options: StringFieldOptions = {},
): string | null => {
  const { required = false, maxLength = 255, fieldName = 'Field' } = options;

  if (required && (value === undefined || value === null || !value.trim())) {
    return `${fieldName} is required.`;
  }

  if (value && value.length > maxLength) {
    return `${fieldName} must be ${maxLength} characters or fewer.`;
  }

  if (value && containsInjection(value)) {
    return `${fieldName} contains invalid characters.`;
  }

  return null;
};

export function validateCreateRoleBody(
  body: CreateRoleBody,
): asserts body is Required<Pick<CreateRoleBody, 'role_key' | 'role_name'>> &
  CreateRoleBody {
  const roleKeyError = validateStringField(body.role_key, {
    required: true,
    maxLength: 50,
    fieldName: 'role_key',
  });
  if (roleKeyError) throw new Error(roleKeyError);

  const roleNameError = validateStringField(body.role_name, {
    required: true,
    maxLength: 100,
    fieldName: 'role_name',
  });
  if (roleNameError) throw new Error(roleNameError);

  const descriptionError = validateStringField(body.description, {
    required: false,
    maxLength: 500,
    fieldName: 'description',
  });
  if (descriptionError) throw new Error(descriptionError);
}

export function validateUpdateRoleBody(body: UpdateRoleBody): void {
  if (body.role_name !== undefined) {
    const roleNameError = validateStringField(body.role_name, {
      required: true,
      maxLength: 100,
      fieldName: 'role_name',
    });
    if (roleNameError) throw new Error(roleNameError);
  }

  if (body.description !== undefined && body.description !== null) {
    const descriptionError = validateStringField(body.description, {
      required: false,
      maxLength: 500,
      fieldName: 'description',
    });
    if (descriptionError) throw new Error(descriptionError);
  }
}

export const validateEmail = (
  value: string | null | undefined,
): string | null => {
  if (!value?.trim()) return 'Email is required.';

  const normalized = value.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(normalized)) return 'Invalid email format.';

  return null;
};

export const validateCalStateEmail = (
  value: string | null | undefined,
): string | null => {
  const basicError = validateEmail(value);
  if (basicError) return basicError;

  if (!value!.trim().toLowerCase().endsWith('@calstatela.edu')) {
    return 'Please enter a valid Cal State LA email address.';
  }

  return null;
};

export function validateUpdateUserBody(body: UpdateUserBody): void {
  if (body.email !== undefined) {
    const emailError = validateEmail(body.email);
    if (emailError) throw new Error(emailError);
  }
}

export function validatePageBody(
  body: CreatePageBody,
): asserts body is Required<
  Pick<CreatePageBody, 'page_key' | 'title' | 'route'>
> &
  CreatePageBody {
  const pageKeyError = validateStringField(body.page_key, {
    required: true,
    maxLength: 50,
    fieldName: 'page_key',
  });
  if (pageKeyError) throw new Error(pageKeyError);

  const titleError = validateStringField(body.title, {
    required: true,
    maxLength: 100,
    fieldName: 'title',
  });
  if (titleError) throw new Error(titleError);

  const routeError = validateStringField(body.route, {
    required: true,
    maxLength: 255,
    fieldName: 'route',
  });
  if (routeError) throw new Error(routeError);

  const descriptionError = validateStringField(body.description, {
    required: false,
    maxLength: 500,
    fieldName: 'description',
  });
  if (descriptionError) throw new Error(descriptionError);
}

export function validateUpdatePageBody(body: UpdatePageBody): void {
  if (body.title !== undefined) {
    const titleError = validateStringField(body.title, {
      required: true,
      maxLength: 100,
      fieldName: 'title',
    });
    if (titleError) throw new Error(titleError);
  }

  if (body.route !== undefined) {
    const routeError = validateStringField(body.route, {
      required: true,
      maxLength: 255,
      fieldName: 'route',
    });
    if (routeError) throw new Error(routeError);
  }

  if (body.description !== undefined && body.description !== null) {
    const descriptionError = validateStringField(body.description, {
      required: false,
      maxLength: 500,
      fieldName: 'description',
    });
    if (descriptionError) throw new Error(descriptionError);
  }
}

export function validateActionBody(
  body: AddActionBody,
): asserts body is Required<AddActionBody> {
  const actionError = validateStringField(body.action, {
    required: true,
    maxLength: 50,
    fieldName: 'action',
  });
  if (actionError) throw new Error(actionError);

  const labelError = validateStringField(body.label, {
    required: true,
    maxLength: 100,
    fieldName: 'label',
  });
  if (labelError) throw new Error(labelError);
}

export function validateScopeBody(
  body: AddScopeBody,
): asserts body is Required<AddScopeBody> {
  const scopeError = validateStringField(body.scope, {
    required: true,
    maxLength: 50,
    fieldName: 'scope',
  });
  if (scopeError) throw new Error(scopeError);

  const labelError = validateStringField(body.label, {
    required: true,
    maxLength: 100,
    fieldName: 'label',
  });
  if (labelError) throw new Error(labelError);
}

export function validateDepartmentBody(
  body: CreateDepartmentBody,
): asserts body is Required<
  Pick<CreateDepartmentBody, 'department_key' | 'department_name'>
> &
  CreateDepartmentBody {
  const keyError = validateStringField(body.department_key, {
    required: true,
    maxLength: 50,
    fieldName: 'department_key',
  });
  if (keyError) throw new Error(keyError);

  const nameError = validateStringField(body.department_name, {
    required: true,
    maxLength: 100,
    fieldName: 'department_name',
  });
  if (nameError) throw new Error(nameError);

  const fullnameError = validateStringField(body.department_fullname, {
    required: false,
    maxLength: 200,
    fieldName: 'department_fullname',
  });
  if (fullnameError) throw new Error(fullnameError);
}

export function validateUpdateDepartmentBody(body: UpdateDepartmentBody): void {
  if (body.department_name !== undefined) {
    const nameError = validateStringField(body.department_name, {
      required: true,
      maxLength: 100,
      fieldName: 'department_name',
    });
    if (nameError) throw new Error(nameError);
  }

  if (
    body.department_fullname !== undefined &&
    body.department_fullname !== null
  ) {
    const fullnameError = validateStringField(body.department_fullname, {
      required: false,
      maxLength: 200,
      fieldName: 'department_fullname',
    });
    if (fullnameError) throw new Error(fullnameError);
  }
}
