import type { NextApiRequest, NextApiResponse } from 'next';
import { requireBackofficePolicyV2 } from 'lib/backoffice';

export async function requireBodEditPermission(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const auth = await requireBackofficePolicyV2(req, res, {
    pageKey: 'boardDocuments',
    action: 'edit',
    scope: '*',
  });

  if (!auth.ok) return { ok: false as const };

  return {
    ok: true as const,
    user: auth.user,
  };
}
