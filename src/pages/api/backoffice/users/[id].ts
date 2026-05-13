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

type UpdateUserBody = {
  email?: string;
  department_id?: number | null;
  is_active?: boolean;
};

type DeleteUserBody = {
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
  if (id === null) return badRequest(res, 'Invalid user id.');

  if (req.method === 'PATCH') {
    const { email, department_id, is_active } = req.body as UpdateUserBody;

    const updates: Record<string, unknown> = {};
    if (email !== undefined) updates.email = email.trim().toLowerCase();
    if (department_id !== undefined) updates.department_id = department_id;
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
      .from('users')
      .update(updates)
      .eq('id', id)
      .select(
        `
          id,
          email,
          is_active,
          deactivated_at,
          deactivated_by,
          departments(id, department_key, department_name, department_fullname)
        `,
      )
      .single();

    if (error) return serverError(res, error.message);
    if (!data) return notFound(res, 'User not found.');

    return res.status(200).json(data);
  }

  if (req.method === 'DELETE') {
    const { permanent } = (req.body ?? {}) as DeleteUserBody;

    if (auth.user.id === id) {
      return badRequest(
        res,
        'You cannot deactivate or delete your own account.',
      );
    }

    if (permanent) {
      await supabaseAdmin
        .schema('backoffice_v2')
        .from('user_roles')
        .delete()
        .eq('user_id', id);

      await supabaseAdmin
        .schema('backoffice_v2')
        .from('user_policies')
        .delete()
        .eq('user_id', id);

      const { error } = await supabaseAdmin
        .schema('backoffice_v2')
        .from('users')
        .delete()
        .eq('id', id);

      if (error) return serverError(res, error.message);

      return res.status(200).json({ ok: true });
    }

    const { data, error } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('users')
      .update({
        is_active: false,
        deactivated_at: new Date().toISOString(),
        deactivated_by: auth.user.email,
      })
      .eq('id', id)
      .is('deactivated_at', null)
      .select('id, email, is_active, deactivated_at, deactivated_by')
      .single();

    if (error) return serverError(res, error.message);
    if (!data) return notFound(res, 'User not found or already deactivated.');

    return res.status(200).json(data);
  }
}

export default handler;
