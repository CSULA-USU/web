import type { NextApiRequest, NextApiResponse } from 'next';
import { allowMethods, badRequest, serverError } from 'lib/api';
import {
  isRegisteredBackofficePolicy,
  requireBackofficeResourcePolicy,
} from 'lib/backoffice';
import { supabaseAdmin } from 'lib/supabaseAdmin';

type CreateUserBody = {
  email?: string;
  role?: number;
  department?: number;
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
    'backofficeUsers',
  );

  if (!auth.ok) return;

  if (req.method === 'GET') {
    const { data, error } = await supabaseAdmin
      .from('backoffice_users')
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
      .is('deleted_at', null)
      .order('email', { ascending: true });

    if (error) return serverError(res, error.message);

    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const {
      email,
      role,
      department,
      policies = [],
    } = req.body as CreateUserBody;

    if (!email?.trim()) {
      return badRequest(res, 'Email is required.');
    }

    if (!Number.isInteger(role)) {
      return badRequest(res, 'Role is required.');
    }

    if (!Number.isInteger(department)) {
      return badRequest(res, 'Department is required.');
    }

    if (!Array.isArray(policies) || !validatePolicies(policies)) {
      return badRequest(res, 'One or more policies are invalid.');
    }

    const { data, error } = await supabaseAdmin
      .from('backoffice_users')
      .insert({
        email: email.trim().toLowerCase(),
        role,
        department,
        policies,
      })
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

    return res.status(201).json(data);
  }
}

export default handler;
