import { supabase } from 'lib/supabase';
import type { AnnouncementBannerType } from 'types/AnnouncementBanner';

const stripUndefined = <T extends Record<string, any>>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));

export const getLatestAnnouncementBanner =
  async (): Promise<AnnouncementBannerType | null> => {
    const { data, error } = await supabase
      .from('announcement_banners')
      .select('id, text, is_visible, link_text, href')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return (data ?? null) as AnnouncementBannerType | null;
  };

export const getVisibleAnnouncementBanner =
  async (): Promise<AnnouncementBannerType | null> => {
    const { data, error } = await supabase
      .from('announcement_banners')
      .select('id, text, is_visible, link_text, href')
      .eq('is_visible', true)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return (data ?? null) as AnnouncementBannerType | null;
  };

export const updateAnnouncementBanner = async (
  id: string,
  updates: Partial<AnnouncementBannerType>,
): Promise<AnnouncementBannerType> => {
  const payload = stripUndefined(updates);

  const { data, error } = await supabase
    .from('announcement_banners')
    .update(payload)
    .eq('id', id)
    .select('id, text, is_visible, link_text, href')
    .single();

  if (error) throw new Error(error.message);
  return data as AnnouncementBannerType;
};
