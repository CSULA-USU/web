import { EditDrawer, EditPage } from 'modules';
import { fetchPageSections } from 'api';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import PageSections from 'modules/PageSections/PageSections';
import { supabase } from 'lib/supabase';
import { SupaPage } from 'types';

export default function DynamicPage() {
  const router = useRouter();
  const { department, subdepartment } = router.query;
  const [page, setPage] = useState<SupaPage>();

  const updatePage = useCallback(
    (payload: any) => {
      if (!page) return;
      setPage({
        ...page,
        sections: page.sections.map((section) =>
          section.id === payload.old.id ? payload.new : section,
        ),
      });
    },
    [page],
  );

  useEffect(() => {
    const channel = supabase
      .channel('section_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sections' },
        (payload) => {
          updatePage(payload);
        },
      )
      .subscribe();

    async function unsub() {
      await channel.unsubscribe();
    }
    return () => {
      unsub();
    };
  }, [updatePage]);

  const getPageSections = async () => {
    if (department || subdepartment) {
      const slug = subdepartment
        ? `${department}/${subdepartment}`
        : String(department);
      if (!slug) return; //todo: send to 404 page
      const page = await fetchPageSections(slug);
      setPage(page);
    }
  };

  useEffect(() => {
    getPageSections();
  }, [router.query]);

  return !page ? null : (
    <EditPage title={`USU Editor: ${department || ''}/${subdepartment || ''}`}>
      <EditDrawer page={page} />
      <PageSections pageSections={page?.sections} />
    </EditPage>
  );
}
