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

  const pageId = parseNumericId(req.query.id);
  if (pageId === null) return badRequest(res, 'Invalid page id.');

  const { data: page } = await supabaseAdmin
    .schema('backoffice_v2')
    .from('pages')
    .select('id')
    .eq('id', pageId)
    .maybeSingle();

  if (!page) return notFound(res, 'Page not found.');

  if (req.method === 'POST') {
    const { action, label } = req.body as { action?: string; label?: string };

    if (!action?.trim()) return badRequest(res, 'action is required.');
    if (!label?.trim()) return badRequest(res, 'label is required.');

    const { data, error } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('page_actions')
      .insert({ page_id: pageId, action: action.trim(), label: label.trim() })
      .select('id, page_id, action, label')
      .single();

    if (error) return serverError(res, error.message);

    return res.status(201).json(data);
  }

  if (req.method === 'DELETE') {
    const { action_id } = req.body as { action_id?: number };

    if (!Number.isInteger(action_id)) {
      return badRequest(res, 'action_id is required.');
    }

    const { error, count } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('page_actions')
      .delete({ count: 'exact' })
      .eq('id', action_id)
      .eq('page_id', pageId);

    if (error) return serverError(res, error.message);
    if (count === 0) return notFound(res, 'Action not found.');

    return res.status(200).json({ ok: true });
  }
}

export default handler;
