import type { NextApiRequest, NextApiResponse } from 'next';
import { allowMethods, badRequest, serverError } from 'lib/api';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { supabaseAdmin } from 'lib/supabaseAdmin';

type CreateRoleBody = {
  role_key?: string;
  role_name?: string;
  description?: string;
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
          is_system,
          is_active,
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
      is_system: role.is_system,
      is_active: role.is_active,
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

    if (!role_key?.trim()) return badRequest(res, 'role_key is required.');
    if (!role_name?.trim()) return badRequest(res, 'role_name is required.');

    const { data: existing } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('roles')
      .select('id')
      .eq('role_key', role_key.trim())
      .maybeSingle();

    if (existing)
      return badRequest(res, 'A role with this key already exists.');

    const { data, error } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('roles')
      .insert({
        role_key: role_key.trim(),
        role_name: role_name.trim(),
        description: description?.trim() ?? null,
        is_system: false,
        is_active: true,
      })
      .select('id, role_key, role_name, description, is_system, is_active')
      .single();

    if (error) return serverError(res, error.message);

    return res.status(201).json(data);
  }
}

export default handler;
