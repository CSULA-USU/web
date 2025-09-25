// /lib/authMiddleWare.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { supabaseAdmin } from 'lib/supabaseAdmin'; // server-only client
import { hasPermission } from 'lib/supabase'; // your helper (client-safe file exports the fn)

async function isBackofficeUser(email: string | undefined | null) {
  if (!email) return false;
  const { data, error } = await supabaseAdmin
    .from('backoffice_users')
    .select('email')
    .eq('email', String(email).toLowerCase())
    .maybeSingle();

  if (error) return false;
  return Boolean(data && (data as any).active !== false);
}

type Options = {
  // If true, hit Supabase on every call (instant revocation). Default false (trust JWT/session).
  revalidateAgainstSupabase?: boolean;
  // Optional permission like "reports:read:*" to enforce per-endpoint ACL
  requirePermission?: string;
};

export const withAuth =
  (
    handler: (
      req: NextApiRequest,
      res: NextApiResponse,
    ) => void | Promise<void>,
    options: Options = {},
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).json({
        error:
          'Unauthorized. Please sign in at https://www.calstatela.edu/backoffice/signin',
      });
    }

    // Check the flag placed in session by NextAuth's session() callback
    const isFlagged = (session.user as any).isBackofficeUser === true;

    // Optional: live revalidation against Supabase for instant revocation
    const isListed = options.revalidateAgainstSupabase
      ? await isBackofficeUser(session.user.email)
      : isFlagged;

    if (!isListed) {
      return res
        .status(403)
        .json({ error: 'Forbidden: backoffice access required.' });
    }

    // Optional per-endpoint permission check if your session carries user.policies
    if (options.requirePermission) {
      const user = session.user as any; // expected to include `policies` if you add it in session()
      if (!user?.policies || !hasPermission(user, options.requirePermission)) {
        return res
          .status(403)
          .json({ error: 'Forbidden: insufficient permissions.' });
      }
    }

    return handler(req, res);
  };
