import type { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { withAuth } from 'lib/authMiddleWare';
import { getCurrentBackofficeUserByEmail } from 'lib/backoffice/currentUser';
import { hasPolicy } from 'lib/backoffice/permissions';

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const session = await getServerSession(req, res, authOptions);

  const { user, error } = await getCurrentBackofficeUserByEmail(
    session?.user?.email,
  );

  if (error) {
    return res.status(500).send({ error: error.message });
  }

  if (!user) {
    return res.status(404).send({ error: 'User not found.' });
  }

  if (hasPolicy(user, 'graffixRequests:view:*')) {
    return res.status(200).json({ department: 'all' });
  }

  return res.status(200).json({
    department: user.departmentName,
  });
}

export default withAuth(handler);
