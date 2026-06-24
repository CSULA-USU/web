import type { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';

export const getBackofficeSessionEmail = async (req: NextApiRequest) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const rawEmail =
    token?.email ??
    token?.preferred_username ??
    token?.upn ??
    token?.name ??
    '';

  const email = String(rawEmail).toLowerCase();

  return email || null;
};
