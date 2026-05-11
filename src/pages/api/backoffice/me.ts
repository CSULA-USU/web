import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { allowMethods } from 'lib/api';
import { withAuth } from 'lib/authMiddleWare';
import { getCurrentBackofficeUserByEmail } from 'lib/backoffice/currentUser';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowMethods(req, res, ['GET'])) return;

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  const { user, error } = await getCurrentBackofficeUserByEmail(
    session.user.email,
  );
  if (error) return res.status(500).json({ error: error.message });
  if (!user)
    return res.status(404).json({ error: 'Backoffice user not found.' });

  return res.status(200).json(user);
}

export default withAuth(handler);
