import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from 'lib/authMiddleWare';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getUserFromSupabaseByEmail } from 'pages/api/user';
import { hasPermission } from 'lib/supabase';
import { supabaseAdmin } from 'lib/supabaseAdmin';

type BannerUpdates = Partial<{
  text: string;
  is_visible: boolean;
  link_text: string | null;
  href: string | null;
}>;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  const { userData, error } = await getUserFromSupabaseByEmail(
    session?.user?.email,
  );

  if (error) return res.status(500).json({ error: error.message });
  if (!userData) return res.status(404).json({ error: 'User not found.' });

  if (!hasPermission(userData, 'siteContent:edit:announcementBanner')) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { id, updates } = req.body as { id?: string; updates?: BannerUpdates };
  if (!id || !updates)
    return res.status(400).json({ error: 'Missing id or updates' });

  const safeUpdates: BannerUpdates = {
    ...(updates.text !== undefined ? { text: updates.text } : {}),
    ...(updates.is_visible !== undefined
      ? { is_visible: updates.is_visible }
      : {}),
    ...(updates.link_text !== undefined
      ? { link_text: updates.link_text }
      : {}),
    ...(updates.href !== undefined ? { href: updates.href } : {}),
  };

  const { data, error: updateError } = await supabaseAdmin
    .from('announcement_banners')
    .update(safeUpdates)
    .eq('id', id)
    .select('id, text, is_visible, link_text, href')
    .single();

  if (updateError) return res.status(500).json({ error: updateError.message });
  return res.status(200).json(data);
}

export default withAuth(handler);
