import { createClient } from '@supabase/supabase-js';
import { BackOfficeUser } from 'types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY)
  throw new Error('Missing Supabase URL or Key');

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const hasPermission = (user: BackOfficeUser, permission: string) => {
  const [category, action, _resource] = permission.split(':');
  const universalPermission = `${category}:${action}:*`;

  return (
    user.polices.includes(universalPermission) ||
    user.polices.includes(permission)
  );
};
