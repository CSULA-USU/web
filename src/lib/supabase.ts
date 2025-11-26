import { createClient } from '@supabase/supabase-js';
import type { SupabaseSchema } from 'types/SupabaseSchema';
import type { BackOfficeUser } from 'types';

// 👇 drop the internal field so older supabase-js stops recursing
type Database = Omit<SupabaseSchema, '__InternalSupabase'>;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase URL or Key');
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export const hasPermission = (user: BackOfficeUser, permission: string) => {
  const [category, action] = permission.split(':');
  const universalPermission = `${category}:${action}:*`;
  return (
    user.policies.includes(universalPermission) ||
    user.policies.includes(permission)
  );
};
