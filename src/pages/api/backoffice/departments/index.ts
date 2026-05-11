import type { NextApiRequest, NextApiResponse } from 'next';
import { allowMethods, serverError } from 'lib/api';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { supabaseAdmin } from 'lib/supabaseAdmin';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowMethods(req, res, ['GET'])) return;

  const auth = await requireBackofficePolicyV2(req, res, {
    pageKey: 'accessManagement',
    action: 'view',
    scope: '*',
  });

  if (!auth.ok) return;

  const { data, error } = await supabaseAdmin
    .schema('backoffice_v2')
    .from('departments')
    .select(
      `
        id,
        department_key,
        department_name,
        department_fullname,
        is_active,
        users(id)
      `,
    )
    .order('department_name', { ascending: true });

  if (error) return serverError(res, error.message);

  const departments = data.map((department: any) => ({
    id: department.id,
    department_key: department.department_key,
    department_name: department.department_name,
    department_fullname: department.department_fullname,
    is_active: department.is_active,
    users_count: department.users?.length ?? 0,
  }));

  return res.status(200).json(departments);
}

export default handler;
