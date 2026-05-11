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

  const roleId = parseNumericId(req.query.id);
  if (roleId === null) return badRequest(res, 'Invalid role id.');

  const { data: role } = await supabaseAdmin
    .schema('backoffice_v2')
    .from('roles')
    .select('id')
    .eq('id', roleId)
    .maybeSingle();

  if (!role) return notFound(res, 'Role not found.');

  if (req.method === 'POST') {
    const { page_id, action, scope } = req.body as {
      page_id?: number;
      action?: string;
      scope?: string;
    };

    if (!Number.isInteger(page_id))
      return badRequest(res, 'page_id is required.');
    if (!action?.trim()) return badRequest(res, 'action is required.');
    if (!scope?.trim()) return badRequest(res, 'scope is required.');

    const { data: page } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('pages')
      .select('id')
      .eq('id', page_id)
      .maybeSingle();

    if (!page) return notFound(res, 'Page not found.');

    const { data, error } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('role_policies')
      .insert({
        role_id: roleId,
        page_id,
        action: action.trim(),
        scope: scope.trim(),
      })
      .select('id, role_id, page_id, action, scope')
      .single();

    if (error) return serverError(res, error.message);

    return res.status(201).json(data);
  }

  if (req.method === 'DELETE') {
    const { policy_id } = req.body as { policy_id?: number };

    if (!Number.isInteger(policy_id)) {
      return badRequest(res, 'policy_id is required.');
    }

    const { error, count } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('role_policies')
      .delete({ count: 'exact' })
      .eq('id', policy_id)
      .eq('role_id', roleId);

    if (error) return serverError(res, error.message);
    if (count === 0) return notFound(res, 'Policy not found.');

    return res.status(200).json({ ok: true });
  }
}

export default handler;
