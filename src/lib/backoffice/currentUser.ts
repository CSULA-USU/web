import { PostgrestError } from '@supabase/supabase-js';
import { supabaseAdmin } from 'lib/supabaseAdmin';

export type BackofficePolicy = {
  pageKey: string;
  action: string;
  scope: string;
  source: 'role' | 'user';
};

export type CurrentBackofficeUser = {
  id: number;
  email: string;
  departmentId: number | null;
  departmentKey: string | null;
  departmentName: string | null;
  departmentFullName: string | null;
  roles: {
    id: number;
    roleKey: string;
    roleName: string;
  }[];
  effectivePolicies: BackofficePolicy[];
};

type UserRow = {
  id: number;
  email: string;
  department_id: number | null;
  departments: {
    id: number;
    department_key: string;
    department_name: string;
    department_fullname: string;
  } | null;
};

export const getCurrentBackofficeUserByEmail = async (
  email: string | null | undefined,
): Promise<{ user: CurrentBackofficeUser | null; error: Error | null }> => {
  if (!email) return { user: null, error: null };

  const normalizedEmail = email.toLowerCase();

  const { data: userData, error: userError } = (await supabaseAdmin
    .schema('backoffice_v2')
    .from('users')
    .select(
      `
        id,
        email,
        department_id,
        departments (
          id,
          department_key,
          department_name,
          department_fullname
        )
      `,
    )
    .eq('email', normalizedEmail)
    .eq('is_active', true)
    .is('deactivated_at', null)
    .maybeSingle()) as unknown as {
    data: UserRow | null;
    error: PostgrestError | null;
  };

  if (userError) return { user: null, error: new Error(userError.message) };
  if (!userData) return { user: null, error: null };

  const { data: roleRows, error: roleError } = await supabaseAdmin
    .schema('backoffice_v2')
    .from('user_roles')
    .select(
      `
        roles (
          id,
          role_key,
          role_name
        )
      `,
    )
    .eq('user_id', userData.id);

  if (roleError) return { user: null, error: new Error(roleError.message) };

  const roles =
    roleRows?.map((row: any) => ({
      id: row.roles.id,
      roleKey: row.roles.role_key,
      roleName: row.roles.role_name,
    })) ?? [];

  const roleIds = roles.map((role) => role.id);

  const { data: rolePolicies, error: rolePoliciesError } =
    roleIds.length > 0
      ? await supabaseAdmin
          .schema('backoffice_v2')
          .from('role_policies')
          .select(
            `
              action,
              scope,
              pages (
                page_key
              )
            `,
          )
          .in('role_id', roleIds)
      : { data: [], error: null };

  if (rolePoliciesError) {
    return { user: null, error: new Error(rolePoliciesError.message) };
  }

  const { data: userPolicies, error: userPoliciesError } = await supabaseAdmin
    .schema('backoffice_v2')
    .from('user_policies')
    .select(
      `
        action,
        scope,
        pages (
          page_key
        )
      `,
    )
    .eq('user_id', userData.id);

  if (userPoliciesError) {
    return { user: null, error: new Error(userPoliciesError.message) };
  }

  const effectivePolicies: BackofficePolicy[] = [
    ...(rolePolicies ?? []).map((policy: any) => ({
      pageKey: policy.pages.page_key,
      action: policy.action,
      scope: policy.scope,
      source: 'role' as const,
    })),
    ...(userPolicies ?? []).map((policy: any) => ({
      pageKey: policy.pages.page_key,
      action: policy.action,
      scope: policy.scope,
      source: 'user' as const,
    })),
  ];

  return {
    user: {
      id: userData.id,
      email: userData.email,
      departmentId: userData.department_id,
      departmentKey: userData.departments?.department_key ?? null,
      departmentName: userData.departments?.department_name ?? null,
      departmentFullName: userData.departments?.department_fullname ?? null,
      roles,
      effectivePolicies,
    },
    error: null,
  };
};
