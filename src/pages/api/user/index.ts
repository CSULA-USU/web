import type { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { withAuth } from 'lib/authMiddleWare';

import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from 'lib/supabase';
import { BackOfficeUser } from 'types';

interface SupabaseUserResponse {
  email: string;
  policies: string[];
  backoffice_roles: {
    role_name: string;
    policies: string[];
  };
  backoffice_departments: {
    department_name: string;
  };
}

export const getUserFromSupabaseByEmail = async (
  email: string | null | undefined,
): Promise<{ userData: BackOfficeUser | null; error: Error | null }> => {
  if (!email) return { userData: null, error: null };

  const { data, error } = (await supabase
    .from('backoffice_users')
    .select(
      `
    email,
    policies,
    backoffice_roles(role_name, policies),
    backoffice_departments(department_name)
  `,
    )
    .eq('email', email)) as unknown as {
    data: SupabaseUserResponse[];
    error: PostgrestError | null;
  };

  if (error) return { userData: null, error: new Error(error?.message) };
  if (data.length == 0) return { userData: null, error: null };

  const user: SupabaseUserResponse = data.at(0)!;
  const backOfficeUser: BackOfficeUser = {
    email: user.email,
    role: user.backoffice_roles.role_name,
    department: user.backoffice_departments.department_name,
    polices: [...user.policies, ...user.backoffice_roles.policies],
  };

  return { userData: backOfficeUser, error: null };
};

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

  res.status(200).json(userData);
}

export default withAuth(handler);
