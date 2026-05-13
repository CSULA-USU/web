import type { NextApiRequest, NextApiResponse } from 'next';
import { allowMethods, badRequest, serverError } from 'lib/api';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { supabaseAdmin } from 'lib/supabaseAdmin';

type CreateDepartmentBody = {
  department_key?: string;
  department_name?: string;
  department_fullname?: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowMethods(req, res, ['GET', 'POST'])) return;

  const policy =
    req.method === 'GET'
      ? { pageKey: 'accessManagement', action: 'view', scope: '*' }
      : { pageKey: 'accessManagement', action: 'edit', scope: '*' };

  const auth = await requireBackofficePolicyV2(req, res, policy);
  if (!auth.ok) return;

  if (req.method === 'GET') {
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
          deactivated_at,
          deactivated_by,
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
      deactivated_at: department.deactivated_at,
      deactivated_by: department.deactivated_by,
      users_count: department.users?.length ?? 0,
    }));

    return res.status(200).json(departments);
  }

  if (req.method === 'POST') {
    const { department_key, department_name, department_fullname } =
      req.body as CreateDepartmentBody;

    if (!department_key?.trim())
      return badRequest(res, 'department_key is required.');
    if (!department_name?.trim())
      return badRequest(res, 'department_name is required.');

    const { data: existing } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('departments')
      .select('id')
      .eq('department_key', department_key.trim())
      .maybeSingle();

    if (existing)
      return badRequest(res, 'A department with this key already exists.');

    const { data, error } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('departments')
      .insert({
        department_key: department_key.trim(),
        department_name: department_name.trim(),
        department_fullname: department_fullname?.trim() ?? null,
        is_active: true,
      })
      .select(
        'id, department_key, department_name, department_fullname, is_active',
      )
      .single();

    if (error) return serverError(res, error.message);

    return res.status(201).json({ ...data, users_count: 0 });
  }
}

export default handler;
