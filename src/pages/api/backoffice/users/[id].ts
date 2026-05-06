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

type UpdateUserBody = {
  email?: string;
  role?: number;
  department?: number;
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
    'backofficeUsers',
  );

  if (!auth.ok) return;

  const id = parseNumericId(req.query.id);

  if (id === null) {
    return badRequest(res, 'Invalid user id.');
  }

  if (req.method === 'PATCH') {
    const { email, role, department, policies } = req.body as UpdateUserBody;

    if (policies !== undefined) {
      if (!Array.isArray(policies) || !validatePolicies(policies)) {
        return badRequest(res, 'One or more policies are invalid.');
      }
    }

    const updates = {
      ...(email !== undefined ? { email: email.trim().toLowerCase() } : {}),
      ...(role !== undefined ? { role } : {}),
      ...(department !== undefined ? { department } : {}),
      ...(policies !== undefined ? { policies } : {}),
    };

    if (Object.keys(updates).length === 0) {
      return badRequest(res, 'No user updates provided.');
    }

    const { data, error } = await supabaseAdmin
      .from('backoffice_users')
      .update(updates)
      .eq('id', id)
      .is('deleted_at', null)
      .select(
        `
          id,
          email,
          role,
          department,
          policies,
          deleted_at,
          backoffice_roles(id, role_name),
          backoffice_departments(id, department_name, department_fullname)
        `,
      )
      .single();

    if (error) return serverError(res, error.message);
    if (!data) return notFound(res, 'User not found.');

    return res.status(200).json(data);
  }

  if (req.method === 'DELETE') {
    if (auth.user.id === id) {
      return badRequest(res, 'You cannot delete your own backoffice user.');
    }

    const { data, error } = await supabaseAdmin
      .from('backoffice_users')
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: auth.user.email,
      })
      .eq('id', id)
      .is('deleted_at', null)
      .select('id, email, deleted_at, deleted_by')
      .single();

    if (error) return serverError(res, error.message);
    if (!data) return notFound(res, 'User not found.');

    return res.status(200).json(data);
  }
}

export default handler;
