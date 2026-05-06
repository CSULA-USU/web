import type { NextApiRequest, NextApiResponse } from 'next';
import { allowMethods, badRequest, serverError } from 'lib/api';
import {
  isRegisteredBackofficePolicy,
  requireBackofficeResourcePolicy,
} from 'lib/backoffice';
import { supabaseAdmin } from 'lib/supabaseAdmin';

type CreateRoleBody = {
  role_name?: string;
  policies?: string[];
};

const validatePolicies = (policies: string[] = []) => {
  return policies.every(isRegisteredBackofficePolicy);
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowMethods(req, res, ['GET', 'POST'])) return;

  const auth = await requireBackofficeResourcePolicy(
    req,
    res,
    'backofficeRoles',
  );

  if (!auth.ok) return;

  if (req.method === 'GET') {
    const { data, error } = await supabaseAdmin
      .from('backoffice_roles')
      .select(
        `
          id,
          role_name,
          policies,
          is_system,
          backoffice_users!backoffice_users_role_fkey(id)
        `,
      )
      .order('role_name', { ascending: true });

    if (error) return serverError(res, error.message);

    const roles = data.map((role) => ({
      id: role.id,
      role_name: role.role_name,
      policies: role.policies ?? [],
      is_system: role.is_system,
      users_count: role.backoffice_users?.length ?? 0,
    }));

    return res.status(200).json(roles);
  }

  if (req.method === 'POST') {
    const { role_name, policies = [] } = req.body as CreateRoleBody;

    if (!role_name?.trim()) {
      return badRequest(res, 'Role name is required.');
    }

    if (!Array.isArray(policies) || !validatePolicies(policies)) {
      return badRequest(res, 'One or more policies are invalid.');
    }

    const { data, error } = await supabaseAdmin
      .from('backoffice_roles')
      .insert({
        role_name: role_name.trim(),
        policies,
        is_system: false,
      })
      .select('id, role_name, policies, is_system')
      .single();

    if (error) return serverError(res, error.message);

    return res.status(201).json(data);
  }
}

export default handler;
