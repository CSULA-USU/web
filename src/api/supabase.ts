import { supabase } from 'lib/supabase';
import { SupaPage, SupaSection } from 'types';

export const fetchPages = async () => {
  const { data: pages, error } = await supabase.from('pages').select('*');

  if (error) {
    console.log(error);
  } else {
    return pages as SupaPage[];
  }
};

export const fetchPageSections = async (slug: string) => {
  const { data: pages, error } = await supabase
    .from('pages')
    .select('id, slug, sections(id, page_id, name, order, data)')
    .eq('slug', slug)
    .order('order', { foreignTable: 'sections', ascending: true });

  if (error) {
    console.log(error);
  } else {
    return pages?.[0] as SupaPage;
  }
};

export const addPageSection = async (pageSection: Partial<SupaSection>) => {
  const { error } = await supabase
    .from('sections')
    .insert(JSON.stringify(pageSection));

  if (error) console.log(error);
};
