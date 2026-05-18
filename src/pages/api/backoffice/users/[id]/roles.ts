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

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowMethods(req, res, ['POST', 'DELETE'])) return;

  const auth = await requireBackofficePolicyV2(req, res, {
    pageKey: 'accessManagement',
    action: 'edit',
    scope: '*',
  });
  if (!auth.ok) return;

  const userId = parseNumericId(req.query.id);
  if (userId === null) return badRequest(res, 'Invalid user id.');

  const { data: user } = await supabaseAdmin
    .schema('backoffice_v2')
    .from('users')
    .select('id')
    .eq('id', userId)
    .is('deactivated_at', null)
    .maybeSingle();

  if (!user) return notFound(res, 'User not found.');

  if (req.method === 'POST') {
    const { role_id } = req.body as { role_id?: number };

    if (!Number.isInteger(role_id)) {
      return badRequest(res, 'role_id is required.');
    }

    const { data: role } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('roles')
      .select('id')
      .eq('id', role_id)
      .maybeSingle();

    if (!role) return notFound(res, 'Role not found.');

    const { data, error } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('user_roles')
      .insert({ user_id: userId, role_id })
      .select('id, user_id, role_id')
      .single();

    if (error) return serverError(res, error.message);

    return res.status(201).json(data);
  }

  if (req.method === 'DELETE') {
    const { role_id } = req.body as { role_id?: number };

    if (!Number.isInteger(role_id)) {
      return badRequest(res, 'role_id is required.');
    }

    const { error, count } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('user_roles')
      .delete({ count: 'exact' })
      .eq('user_id', userId)
      .eq('role_id', role_id);

    if (error) return serverError(res, error.message);
    if (count === 0) return notFound(res, 'Role assignment not found.');

    return res.status(200).json({ ok: true });
  }
}

export default handler;
