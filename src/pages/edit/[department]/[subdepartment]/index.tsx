import { EditPage } from 'modules';
import { fetchPageSections } from 'api';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import PageSections from 'modules/PageSections/PageSections';
import { supabase } from 'lib/supabase';
import { useRecoilState } from 'recoil';
import { editorPageState } from 'atoms/EditorAtom';

export default function DynamicPage() {
  const [page, setPage] = useRecoilState(editorPageState);
  const router = useRouter();
  const { department, subdepartment } = router.query;

  const deletePageSection = useCallback(
    (payload: any) => {
      if (!page) return;
      setPage({
        ...page,
        sections: page.sections.filter(
          (section) => section.id !== payload.old.id,
        ),
      });
    },
    [page, setPage],
  );
  const updatePageSection = useCallback(
    (payload: any) => {
      if (!page) return;
      setPage({
        ...page,
        sections: page.sections.map((section) =>
          section.id === payload.old.id ? payload.new : section,
        ),
      });
    },
    [page, setPage],
  );
  const insertPageSection = useCallback(
    (payload: any) => {
      if (!page) return;
      setPage({
        ...page,
        sections: page.sections.map((section) =>
          section.order === payload.new.order ? payload.new : section,
        ),
      });
    },
    [page, setPage],
  );

  useEffect(() => {
    const channel = supabase
      .channel('section_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sections' },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              insertPageSection(payload);
              break;
            case 'UPDATE':
              updatePageSection(payload);
              break;
            case 'DELETE':
              deletePageSection(payload);
              break;
          }
        },
      )
      .subscribe();

    async function unsub() {
      await channel.unsubscribe();
    }
    return () => {
      unsub();
    };
  }, [insertPageSection, updatePageSection, deletePageSection]);

  const getPageSections = useCallback(async () => {
    if (department || subdepartment) {
      const slug = subdepartment
        ? `${department}/${subdepartment}`
        : String(department);
      if (!slug) return; //todo: send to 404 page
      const pageSections = await fetchPageSections(slug);
      setPage(pageSections);
    }
  }, [setPage, department, subdepartment]);

  useEffect(() => {
    getPageSections();
  }, [router.query, getPageSections]);

  return !page ? null : (
    <EditPage title={`USU Editor: ${department || ''}/${subdepartment || ''}`}>
      <PageSections pageSections={page?.sections} />
    </EditPage>
  );
}
