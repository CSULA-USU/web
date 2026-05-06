import type { NextApiRequest, NextApiResponse } from 'next';
import { allowMethods, serverError } from 'lib/api';
import { requireBackofficeResourcePolicy } from 'lib/backoffice';
import { supabaseAdmin } from 'lib/supabaseAdmin';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowMethods(req, res, ['GET'])) return;

  const auth = await requireBackofficeResourcePolicy(
    req,
    res,
    'backofficeDepartments',
  );

  if (!auth.ok) return;

  const { data, error } = await supabaseAdmin
    .from('backoffice_departments')
    .select(
      `
        id,
        department_name,
        department_fullname,
        backoffice_users!backoffice_users_department_fkey(id)
      `,
    )
    .order('department_name', { ascending: true });

  if (error) return serverError(res, error.message);

  const departments = data.map((department) => ({
    id: department.id,
    department_name: department.department_name,
    department_fullname: department.department_fullname,
    users_count: department.backoffice_users?.length ?? 0,
  }));

  return res.status(200).json(departments);
}

export default handler;
