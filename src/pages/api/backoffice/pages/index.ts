import type { NextApiRequest, NextApiResponse } from 'next';
import {
  allowMethods,
  badRequest,
  serverError,
  validatePageBody,
} from 'lib/api';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { CreatePageBody } from 'types';

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
      .from('pages')
      .select(
        `
          id,
          page_key,
          title,
          route,
          description,
          is_active,
          deactivated_at,
          deactivated_by,
          page_actions(id, action, label),
          page_scopes(id, scope, label)
        `,
      )
      .order('title', { ascending: true });

    if (error) return serverError(res, error.message);

    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { page_key, title, route, description } = req.body as CreatePageBody;

    try {
      validatePageBody({ page_key, title, route, description });
    } catch (e) {
      return badRequest(res, (e as Error).message);
    }

    const safePageKey = page_key as string;
    const safeTitle = title as string;
    const safeRoute = route as string;

    const { data: existing } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('pages')
      .select('id')
      .eq('page_key', safePageKey.trim())
      .maybeSingle();

    if (existing)
      return badRequest(res, 'A page with this key already exists.');

    const { data, error } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('pages')
      .insert({
        page_key: safePageKey.trim(),
        title: safeTitle.trim(),
        route: safeRoute.trim(),
        description: description?.trim() ?? null,
        is_active: true,
      })
      .select('id, page_key, title, route, description, is_active')
      .single();

    if (error) return serverError(res, error.message);

    return res.status(201).json(data);
  }
}

export default handler;
