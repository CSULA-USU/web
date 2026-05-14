import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getCurrentBackofficeUserByEmail } from './currentUser';
import { hasPolicy } from './permissions';

type PolicyArg = { pageKey: string; action: string; scope: string };

type RequireBackofficeDepartmentAccessOptions = {
  requestedDepartment: string | string[] | undefined;
  viewAllPolicy: PolicyArg;
  viewOwnDepartmentPolicy: PolicyArg;
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
    res.status(404).json({ error: 'User not found.' });
    return { ok: false as const };
  }

  const canViewAll = hasPolicy(user, viewAllPolicy);
  const canViewOwn = hasPolicy(user, viewOwnDepartmentPolicy);
  const deptMatches =
    (user.departmentName ?? '').toLowerCase() ===
    requestedDepartment.toLowerCase();

  if (!canViewAll && !(canViewOwn && deptMatches)) {
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
