import type { NextApiRequest, NextApiResponse } from 'next';
import {
  allowMethods,
  badRequest,
  notFound,
  parseNumericId,
  serverError,
} from 'lib/api';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { supabaseAdmin } from 'lib/supabaseAdmin';

type UpdateDepartmentBody = {
  department_name?: string;
  department_fullname?: string;
  is_active?: boolean;
};

type DeleteDepartmentBody = {
  permanent?: boolean;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowMethods(req, res, ['PATCH', 'DELETE'])) return;

  const auth = await requireBackofficePolicyV2(req, res, {
    pageKey: 'accessManagement',
    action: 'edit',
    scope: '*',
  });
  if (!auth.ok) return;

  const id = parseNumericId(req.query.id);
  if (id === null) return badRequest(res, 'Invalid department id.');

  const { data: dept } = await supabaseAdmin
    .schema('backoffice_v2')
    .from('departments')
    .select('id, is_active')
    .eq('id', id)
    .maybeSingle();

  if (!dept) return notFound(res, 'Department not found.');

  if (req.method === 'PATCH') {
    const { department_name, department_fullname, is_active } =
      req.body as UpdateDepartmentBody;

    const updates: Record<string, unknown> = {};
    if (department_name !== undefined)
      updates.department_name = department_name.trim();
    if (department_fullname !== undefined)
      updates.department_fullname = department_fullname.trim();
    if (is_active !== undefined) {
      updates.is_active = is_active;
      if (is_active === true) {
        updates.deactivated_at = null;
        updates.deactivated_by = null;
      }
    }

    if (Object.keys(updates).length === 0) {
      return badRequest(res, 'No updates provided.');
    }

    const { data, error } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('departments')
      .update(updates)
      .eq('id', id)
      .select(
        'id, department_key, department_name, department_fullname, is_active, deactivated_at, deactivated_by',
      )
      .single();

    if (error) return serverError(res, error.message);

    return res.status(200).json(data);
  }

  if (req.method === 'DELETE') {
    const { permanent } = (req.body ?? {}) as DeleteDepartmentBody;

    const { count, error: countError } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('users')
      .select('id', { count: 'exact', head: true })
      .eq('department_id', id);

    if (countError) return serverError(res, countError.message);

    if (permanent) {
      if (dept.is_active) {
        return badRequest(
          res,
          'Only deactivated departments can be permanently deleted.',
        );
      }
      if (count && count > 0) {
        return badRequest(
          res,
          'Cannot permanently delete a department with assigned users. Reassign or remove all users first.',
        );
      }

      const { error } = await supabaseAdmin
        .schema('backoffice_v2')
        .from('departments')
        .delete()
        .eq('id', id);

      if (error) return serverError(res, error.message);

      return res.status(200).json({ ok: true });
    }

    if (!dept.is_active) {
      return badRequest(res, 'Department is already deactivated.');
    }
    if (count && count > 0) {
      return badRequest(
        res,
        'Cannot deactivate a department with assigned users. Reassign or remove users first.',
      );
    }

    const { error } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('departments')
      .update({
        is_active: false,
        deactivated_at: new Date().toISOString(),
        deactivated_by: auth.user.email,
      })
      .eq('id', id);

    if (error) return serverError(res, error.message);

    return res.status(200).json({ ok: true });
  }
}

export default handler;
