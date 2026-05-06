import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getCurrentBackofficeUserByEmail } from './currentUser';
import { canAccessDepartment } from './permissions';

type RequireBackofficeDepartmentAccessOptions = {
  requestedDepartment: string | string[] | undefined;
  viewAllPolicy: string;
  viewOwnDepartmentPolicy: string;
};

export const requireBackofficeDepartmentAccess = async (
  req: NextApiRequest,
  res: NextApiResponse,
  {
    requestedDepartment,
    viewAllPolicy,
    viewOwnDepartmentPolicy,
  }: RequireBackofficeDepartmentAccessOptions,
) => {
  if (typeof requestedDepartment !== 'string') {
    res.status(400).json({ error: 'Missing or invalid department.' });
    return { ok: false as const };
  }

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

  const hasAccess = canAccessDepartment({
    user,
    requestedDepartment,
    viewAllPolicy,
    viewOwnDepartmentPolicy,
  });

  if (!hasAccess) {
    res.status(403).json({
      error: 'You do not have access to view this department.',
    });
    return { ok: false as const };
  }

  return {
    ok: true as const,
    user,
    requestedDepartment,
  };
};
