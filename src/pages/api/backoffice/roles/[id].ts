import type { NextApiRequest, NextApiResponse } from 'next';
import {
  allowMethods,
  badRequest,
  notFound,
  parseNumericId,
  serverError,
} from 'lib/api';
import {
  isRegisteredBackofficePolicy,
  requireBackofficeResourcePolicy,
} from 'lib/backoffice';
import { supabaseAdmin } from 'lib/supabaseAdmin';

type UpdateRoleBody = {
  role_name?: string;
  policies?: string[];
};

const validatePolicies = (policies: string[] = []) => {
  return policies.every(isRegisteredBackofficePolicy);
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowMethods(req, res, ['PATCH', 'DELETE'])) return;

  const auth = await requireBackofficeResourcePolicy(
    req,
    res,
    'backofficeRoles',
  );

  if (!auth.ok) return;

  const id = parseNumericId(req.query.id);

  const { data: existingRole, error: existingRoleError } = await supabaseAdmin
    .from('backoffice_roles')
    .select('id, is_system')
    .eq('id', id)
    .single();

  if (existingRoleError) return serverError(res, existingRoleError.message);
  if (!existingRole) return notFound(res, 'Role not found.');

  if (existingRole.is_system) {
    return badRequest(res, 'System roles cannot be edited or deleted.');
  }

  if (req.method === 'PATCH') {
    const { role_name, policies } = req.body as UpdateRoleBody;

    if (policies !== undefined) {
      if (!Array.isArray(policies) || !validatePolicies(policies)) {
        return badRequest(res, 'One or more policies are invalid.');
      }
    }

    const updates = {
      ...(role_name !== undefined ? { role_name: role_name.trim() } : {}),
      ...(policies !== undefined ? { policies } : {}),
    };

    if (Object.keys(updates).length === 0) {
      return badRequest(res, 'No role updates provided.');
    }

    const { data, error } = await supabaseAdmin
      .from('backoffice_roles')
      .update(updates)
      .eq('id', id)
      .select('id, role_name, policies, is_system')
      .single();

    if (error) return serverError(res, error.message);
    if (!data) return notFound(res, 'Role not found.');

    return res.status(200).json(data);
  }

  if (req.method === 'DELETE') {
    const { count, error: countError } = await supabaseAdmin
      .from('backoffice_users')
      .select('id', { count: 'exact', head: true })
      .eq('role', id)
      .is('deleted_at', null);

    if (countError) return serverError(res, countError.message);

    if ((count ?? 0) > 0) {
      return badRequest(
        res,
        'Cannot delete a role with active users assigned.',
      );
    }

    const { error } = await supabaseAdmin
      .from('backoffice_roles')
      .delete()
      .eq('id', id);

    if (error) return serverError(res, error.message);

    return res.status(200).json({ success: true });
  }
}

export default handler;
