import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from 'lib/authMiddleWare';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBackofficePolicyV2 } from 'lib/backoffice';

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

  const auth = await requireBackofficePolicyV2(req, res, {
    pageKey: 'announcementBanner',
    action: 'edit',
    scope: '*',
  });

  if (!auth.ok) return;

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
