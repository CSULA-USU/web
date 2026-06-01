import type { NextApiRequest, NextApiResponse } from 'next';
import {
  allowMethods,
  badRequest,
  notFound,
  parseNumericId,
  serverError,
  validateActionBody,
} from 'lib/api';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { AddActionBody, DeleteActionBody } from 'types';

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
    const { action, label } = req.body as AddActionBody;

    try {
      validateActionBody({ action, label });
    } catch (e) {
      return badRequest(res, (e as Error).message);
    }

    const safeAction = action as string;
    const safeLabel = label as string;

    const { data, error } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('page_actions')
      .insert({
        page_id: pageId,
        action: safeAction.trim(),
        label: safeLabel.trim(),
      })
      .select('id, page_id, action, label')
      .single();

    if (error) return serverError(res, error.message);

    return res.status(201).json(data);
  }

  if (req.method === 'DELETE') {
    const { action_id } = req.body as DeleteActionBody;

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
