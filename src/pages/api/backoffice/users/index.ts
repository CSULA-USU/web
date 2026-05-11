import type { NextApiRequest, NextApiResponse } from 'next';
import { allowMethods, badRequest, serverError } from 'lib/api';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { supabaseAdmin } from 'lib/supabaseAdmin';

type CreateUserBody = {
  email?: string;
  department_id?: number;
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
      .from('users')
      .select(
        `
          id,
          email,
          is_active,
          deleted_at,
          departments(
            id,
            department_key,
            department_name,
            department_fullname
          ),
          user_roles(
            id,
            roles(
              id,
              role_key,
              role_name
            )
          ),
          user_policies(
            id,
            action,
            scope,
            pages(id, page_key, title)
          )
        `,
      )
      .is('deleted_at', null)
      .order('email', { ascending: true });

    if (error) return serverError(res, error.message);

    const users = data.map((user: any) => ({
      id: user.id,
      email: user.email,
      is_active: user.is_active,
      department: user.departments,
      roles:
        user.user_roles?.map((ur: any) => ({
          id: ur.roles.id,
          role_key: ur.roles.role_key,
          role_name: ur.roles.role_name,
        })) ?? [],
      policies:
        user.user_policies?.map((p: any) => ({
          id: p.id,
          page_id: p.pages.id,
          page_key: p.pages.page_key,
          page_title: p.pages.title,
          action: p.action,
          scope: p.scope,
        })) ?? [],
    }));

    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    const { email, department_id } = req.body as CreateUserBody;

    if (!email?.trim()) {
      return badRequest(res, 'Email is required.');
    }

    const normalizedEmail = email.trim().toLowerCase();

    const { data: existing } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('users')
      .select('id')
      .eq('email', normalizedEmail)
      .is('deleted_at', null)
      .maybeSingle();

    if (existing) {
      return badRequest(res, 'A user with this email already exists.');
    }

    const { data, error } = await supabaseAdmin
      .schema('backoffice_v2')
      .from('users')
      .insert({
        email: normalizedEmail,
        department_id: department_id ?? null,
        is_active: true,
      })
      .select(
        `
          id,
          email,
          is_active,
          departments(id, department_key, department_name, department_fullname)
        `,
      )
      .single();

    if (error) return serverError(res, error.message);

    return res.status(201).json(data);
  }
}

export default handler;
