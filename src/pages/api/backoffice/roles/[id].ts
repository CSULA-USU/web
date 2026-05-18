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

type UpdateRoleBody = {
  role_name?: string;
  description?: string;
  is_active?: boolean;
};

type DeleteRoleBody = {
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
  if (id === null) return badRequest(res, 'Invalid role id.');

  const { data: role } = await supabaseAdmin
    .schema('backoffice_v2')
    .from('roles')
    .select('id, is_active')
    .eq('id', id)
    .maybeSingle();

  if (!role) return notFound(res, 'Role not found.');

  if (req.method === 'PATCH') {
    const { role_name, description, is_active } = req.body as UpdateRoleBody;

    const updates: Record<string, unknown> = {};
    if (role_name !== undefined) updates.role_name = role_name.trim();
    if (description !== undefined) updates.description = description.trim();
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
      .from('roles')
      .update(updates)
      .eq('id', id)
      .select(
        'id, role_key, role_name, description, is_active, deactivated_at, deactivated_by',
      )
      .single();

    if (error) return serverError(res, error.message);

    return res.status(200).json(data);
  }

  if (req.method === 'DELETE') {
    const { permanent } = (req.body ?? {}) as DeleteRoleBody;

    const { count, error: countError } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('user_roles')
      .select('id', { count: 'exact', head: true })
      .eq('role_id', id);

    if (countError) return serverError(res, countError.message);

    if (permanent) {
      if (role.is_active) {
        return badRequest(
          res,
          'Only deactivated roles can be permanently deleted.',
        );
      }
      if (count && count > 0) {
        return badRequest(
          res,
          'Cannot permanently delete a role that is assigned to users.',
        );
      }

      const { error: policiesError } = await supabaseAdmin
        .schema('backoffice_v2')
        .from('role_policies')
        .delete()
        .eq('role_id', id);

      if (policiesError) return serverError(res, policiesError.message);

      const { error } = await supabaseAdmin
        .schema('backoffice_v2')
        .from('roles')
        .delete()
        .eq('id', id);

      if (error) return serverError(res, error.message);

      return res.status(200).json({ ok: true });
    }

    if (!role.is_active) {
      return badRequest(res, 'Role is already deactivated.');
    }
    if (count && count > 0) {
      return badRequest(
        res,
        'Cannot deactivate a role that is assigned to users. Remove all users first.',
      );
    }

    const { error } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('roles')
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
