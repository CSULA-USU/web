import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Page, Header, SiteSearch } from 'modules';
import { FluidContainer, PageMeta } from 'components';

const BACKGROUND_IMAGE =
  'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-2.webp';

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // `?query=` is read once the router is ready; before that it is always
  // empty during hydration, and reading it then would wipe a shared link.
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const initialQuery = router.query.query;
    setQuery(typeof initialQuery === 'string' ? initialQuery : '');
    inputRef.current?.focus();
    // Only on arrival. Afterward the field is the source of truth: the URL
    // trails it by a render, so re-reading `router.query` here would put an
    // older value back over faster typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  // Mirrors the field into the URL so a search can be shared or returned to
  // with the back button. `replace`, so typing does not stack one history
  // entry per keystroke.
  const handleQueryChange = (nextQuery: string) => {
    setQuery(nextQuery);
    router.replace(
      { pathname: '/search', query: nextQuery ? { query: nextQuery } : {} },
      undefined,
      { shallow: true, scroll: false },
    );
  };

  return (
    <Page>
      <PageMeta
        title="U–SU Search"
        description="Search the University-Student Union site for events, departments, staff, services, and student resources at Cal State LA."
        path="/search"
        noindex
      />
      <Head>
        {/* Preload background image for better LCP */}
        <link rel="preload" href={BACKGROUND_IMAGE} as="image" />
      </Head>
      <Header title="Search" backgroundImage={BACKGROUND_IMAGE} />
      <FluidContainer innerMaxWidth="800px" innerMinHeight="50vh">
        <SiteSearch
          query={query}
          onQueryChange={handleQueryChange}
          inputRef={inputRef}
        />
      </FluidContainer>
    </Page>
  );
}
