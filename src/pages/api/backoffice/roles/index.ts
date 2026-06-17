import type { NextApiRequest, NextApiResponse } from 'next';
import {
  allowMethods,
  badRequest,
  serverError,
  validateCreateRoleBody,
} from 'lib/api';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { CreateRoleBody } from 'types';

export const normalizeOptionalText = (value: string | null | undefined) => {
  if (value === undefined || value === null) return null;

  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
};

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
      .from('roles')
      .select(
        `
          id,
          role_key,
          role_name,
          description,
          is_active,
          deactivated_at,
          deactivated_by,
          user_roles(id),
          role_policies(
            id,
            action,
            scope,
            pages(id, page_key, title)
          )
        `,
      )
      .order('role_name', { ascending: true });

    if (error) return serverError(res, error.message);

    const roles = data.map((role: any) => ({
      id: role.id,
      role_key: role.role_key,
      role_name: role.role_name,
      description: role.description,
      is_active: role.is_active,
      deactivated_at: role.deactivated_at,
      deactivated_by: role.deactivated_by,
      users_count: role.user_roles?.length ?? 0,
      policies:
        role.role_policies?.map((p: any) => ({
          id: p.id,
          page_id: p.pages.id,
          page_key: p.pages.page_key,
          page_title: p.pages.title,
          action: p.action,
          scope: p.scope,
        })) ?? [],
    }));

    return res.status(200).json(roles);
  }

  if (req.method === 'POST') {
    const { role_key, role_name, description } = req.body as CreateRoleBody;

    try {
      validateCreateRoleBody({ role_key, role_name, description });
    } catch (e) {
      return badRequest(res, (e as Error).message);
    }

    const safeKey = role_key as string;
    const safeName = role_name as string;

    const { data: existing } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('roles')
      .select('id')
      .eq('role_key', safeKey.trim())
      .maybeSingle();

    if (existing)
      return badRequest(res, 'A role with this key already exists.');

    const { data, error } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('roles')
      .insert({
        role_key: safeKey.trim(),
        role_name: safeName.trim(),
        description: normalizeOptionalText(description),
        is_active: true,
      })
      .select('id, role_key, role_name, description, is_active')
      .single();

    if (error) return serverError(res, error.message);

    return res.status(201).json(data);
  }
}

export default handler;
