import type { NextApiRequest, NextApiResponse } from 'next';
import { requireBackofficePolicy } from 'lib/backoffice/requireBackofficePolicy';

export async function requireBodEditPermission(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const auth = await requireBackofficePolicy(req, res, {
    policy: 'siteContent:edit:meetingDocuments',
  });

  if (!auth.ok) {
    return { ok: false as const };
  }

  return {
    ok: true as const,
    user: auth.user,
  };
}
