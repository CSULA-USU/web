import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getUserFromSupabaseByEmail } from 'pages/api/user';
import { hasPermission } from 'lib/supabase';

export async function requireBodEditPermission(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  const { userData, error } = await getUserFromSupabaseByEmail(
    session?.user?.email,
  );

  if (error) return { ok: false as const, status: 500, message: error.message };
  if (!userData)
    return { ok: false as const, status: 404, message: 'User not found.' };

  if (!hasPermission(userData, 'siteContent:edit:meetingDocuments')) {
    return { ok: false as const, status: 403, message: 'Forbidden' };
  }

  return { ok: true as const };
}
