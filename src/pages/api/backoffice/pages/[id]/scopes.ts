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
    const { scope, label } = req.body as { scope?: string; label?: string };

    if (!scope?.trim()) return badRequest(res, 'scope is required.');
    if (!label?.trim()) return badRequest(res, 'label is required.');

    const { data, error } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('page_scopes')
      .insert({ page_id: pageId, scope: scope.trim(), label: label.trim() })
      .select('id, page_id, scope, label')
      .single();

    if (error) return serverError(res, error.message);

    return res.status(201).json(data);
  }

  if (req.method === 'DELETE') {
    const { scope_id } = req.body as { scope_id?: number };

    if (!Number.isInteger(scope_id)) {
      return badRequest(res, 'scope_id is required.');
    }

    const { error, count } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('page_scopes')
      .delete({ count: 'exact' })
      .eq('id', scope_id)
      .eq('page_id', pageId);

    if (error) return serverError(res, error.message);
    if (count === 0) return notFound(res, 'Scope not found.');

    return res.status(200).json({ ok: true });
  }
}

export default handler;
