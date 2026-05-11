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

type UpdatePageBody = {
  title?: string;
  route?: string;
  description?: string;
  is_active?: boolean;
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
  if (id === null) return badRequest(res, 'Invalid page id.');

  const { data: page } = await supabaseAdmin
    .schema('backoffice_v2')
    .from('pages')
    .select('id')
    .eq('id', id)
    .maybeSingle();

  if (!page) return notFound(res, 'Page not found.');

  if (req.method === 'PATCH') {
    const { title, route, description, is_active } = req.body as UpdatePageBody;

    const updates: Record<string, unknown> = {};
    if (title !== undefined) updates.title = title.trim();
    if (route !== undefined) updates.route = route.trim();
    if (description !== undefined) updates.description = description.trim();
    if (is_active !== undefined) updates.is_active = is_active;

    if (Object.keys(updates).length === 0) {
      return badRequest(res, 'No updates provided.');
    }

    const { data, error } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('pages')
      .update(updates)
      .eq('id', id)
      .select('id, page_key, title, route, description, is_active')
      .single();

    if (error) return serverError(res, error.message);

    return res.status(200).json(data);
  }

  if (req.method === 'DELETE') {
    const deleteSteps = [
      supabaseAdmin
        .schema('backoffice_v2')
        .from('user_policies')
        .delete()
        .eq('page_id', id),
      supabaseAdmin
        .schema('backoffice_v2')
        .from('role_policies')
        .delete()
        .eq('page_id', id),
      supabaseAdmin
        .schema('backoffice_v2')
        .from('page_actions')
        .delete()
        .eq('page_id', id),
      supabaseAdmin
        .schema('backoffice_v2')
        .from('page_scopes')
        .delete()
        .eq('page_id', id),
    ];

    for (const step of deleteSteps) {
      const { error } = await step;
      if (error) return serverError(res, error.message);
    }

    const { error } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('pages')
      .delete()
      .eq('id', id);

    if (error) return serverError(res, error.message);

    return res.status(200).json({ ok: true });
  }
}

export default handler;
