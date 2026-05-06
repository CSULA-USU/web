import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from 'lib/supabase';
import { CurrentBackofficeUser } from 'types';
import { getEffectivePolicies } from './permissions';

interface SupabaseBackofficeUserResponse {
  id: number;
  email: string;
  policies: string[];
  backoffice_roles: {
    id: number;
    role_name: string;
    policies: string[];
  };
  backoffice_departments: {
    id: number;
    department_name: string;
    department_fullname: string;
  };
}

export const getCurrentBackofficeUserByEmail = async (
  email: string | null | undefined,
): Promise<{ user: CurrentBackofficeUser | null; error: Error | null }> => {
  if (!email) return { user: null, error: null };

  const { data, error } = (await supabase
    .from('backoffice_users')
    .select(
      `
        id,
        email,
        policies,
        backoffice_roles(id, role_name, policies),
        backoffice_departments(id, department_name, department_fullname)
      `,
    )
    .eq('email', email)
    .single()) as unknown as {
    data: SupabaseBackofficeUserResponse | null;
    error: PostgrestError | null;
  };

  if (error) return { user: null, error: new Error(error.message) };
  if (!data) return { user: null, error: null };

  const rolePolicies = data.backoffice_roles?.policies ?? [];
  const userPolicies = data.policies ?? [];

  return {
    user: {
      id: data.id,
      email: data.email,
      roleId: data.backoffice_roles.id,
      roleName: data.backoffice_roles.role_name,
      departmentId: data.backoffice_departments.id,
      departmentName: data.backoffice_departments.department_name,
      departmentFullName: data.backoffice_departments.department_fullname,
      rolePolicies,
      userPolicies,
      effectivePolicies: getEffectivePolicies(rolePolicies, userPolicies),
    },
    error: null,
  };
};
