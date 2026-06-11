import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { getCurrentBackofficeUserByEmail } from './currentUser';

export const requireCurrentBackofficeUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    res.status(401).json({ error: 'Unauthorized.' });
    return { ok: false as const };
  }

  const { user, error } = await getCurrentBackofficeUserByEmail(
    session.user.email,
  );

  if (error) {
    res.status(500).json({ error: error.message });
    return { ok: false as const };
  }

  if (!user) {
    res.status(404).json({ error: 'Backoffice user not found.' });
    return { ok: false as const };
  }

  return {
    ok: true as const,
    user,
  };
};

export const requireCurrentBackofficeUserV2 = requireCurrentBackofficeUser;
