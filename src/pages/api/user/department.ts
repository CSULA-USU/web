import type { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { withAuth } from 'lib/authMiddleWare';
import { getUserFromSupabaseByEmail } from '.';

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const session = await getServerSession(req, res, authOptions);

  const { userData, error } = await getUserFromSupabaseByEmail(
    session?.user?.email,
  );
  if (error) {
    return res.status(500).send({ error: error.message });
  } else if (!userData) {
    return res.status(404).send({ error: 'User not found.' });
  }

  res.status(200).json({ department: userData.department });
}

export default withAuth(handler);
