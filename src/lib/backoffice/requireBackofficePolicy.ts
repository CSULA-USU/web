import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getCurrentBackofficeUserByEmail } from './currentUser';
import { hasPolicy } from './permissions';

type RequireBackofficePolicyOptions = {
  policy: string;
};

export const requireBackofficePolicy = async (
  req: NextApiRequest,
  res: NextApiResponse,
  { policy }: RequireBackofficePolicyOptions,
) => {
  const session = await getServerSession(req, res, authOptions);

  const { user, error } = await getCurrentBackofficeUserByEmail(
    session?.user?.email,
  );

  if (error) {
    res.status(500).json({ error: error.message });
    return { ok: false as const };
  }

  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return { ok: false as const };
  }

  if (!hasPolicy(user, policy)) {
    res.status(403).json({ error: 'Forbidden' });
    return { ok: false as const };
  }

  return {
    ok: true as const,
    user,
  };
};
