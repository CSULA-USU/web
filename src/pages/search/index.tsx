import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Page, Header } from 'modules';
import { FluidContainer, Image, Typography } from 'components';
import data from 'data/search-directory.json';
import Fuse from 'fuse.js';
import { Colors, Spaces } from 'theme';
import { useBreakpoint } from 'hooks';

const SearchBig = styled.input`
  display: flex;
  margin: 0 auto;
  color: black;
  border-radius: 40px;
  border: 1px solid black;
  gap: 36px;
  width: 500px;
  margin-top: 36px;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Bitter', serif;
  text-decoration: none;
  ::selection {
    background: ${Colors.greyDarker};
    color: white;
  }
  @media screen and (max-width: 768px) {
    width: 400px;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
  &::placeholder {
    color: #2b2b2b;
  }
`;

const SearchCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin-top: 32px;
  padding: 16px;
  transition: all 0.2s ease;

  &:hover {
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 480px) {
    height: 100%;
  }
`;

interface SearchResult {
  title: string;
  url: string;
  description: string;
  tags: string[];
}

type ResultsType = Fuse.FuseResult<SearchResult>;

export default function Search() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<ResultsType[]>([]);
  const router = useRouter();
  const { isMobile } = useBreakpoint();

  // ✅ Memoize Fuse instance - creates only once!
  const fuseInstance = useMemo(() => {
    const options = {
      keys: ['title', 'url', 'description', { name: 'tags', weight: 2 }],
      minMatchCharLength: 2,
      threshold: 0.1,
    };
    return new Fuse(data, options);
  }, []); // Empty dependency array = only runs once

  // Focus input and handle URL query
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }

    const { query } = router.query;
    if (query) {
      const queryString = query as string;
      setSearchQuery(queryString);

      // Use memoized instance for initial search
      if (queryString.length > 1) {
        setResults(fuseInstance.search(queryString));
      }
    }
  }, [router.query, fuseInstance]);

  // ✅ Optimized search handler
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Use memoized Fuse instance
    if (query.length > 1) {
      setResults(fuseInstance.search(query));
    } else {
      setResults([]);
    }
  };

  // ✅ Simplified form submission
  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Form submission already handled by onChange
    // No need to duplicate search logic
  };

  const content: JSX.Element | null =
    results && results.length > 0 ? (
      <>
        {results.map((result, index) => {
          if ('item' in result) {
            const { title, url, description } = result.item;
            return (
              <div key={index}>
                <SearchCard>
                  <Link href={url}>
                    <Typography as="h3" variant="subheader">
                      {title}
                    </Typography>
                  </Link>
                  <Typography as="p" variant="copy">
                    {description}
                  </Typography>
                  <Link href={url}>
                    <Typography color="gold">calstatelausu.org{url}</Typography>
                  </Link>
                </SearchCard>
              </div>
            );
          }
        })}
      </>
    ) : searchQuery.length > 0 ? (
      <FluidContainer
        flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography as="h3" variant="subheader" margin={`${Spaces.md}`}>
          No Results Found.
        </Typography>
        <Image
          alt="Eddie the Eagle looking for results"
          src="https://media2.giphy.com/media/gKTdODaPq6kKoSD5rc/giphy.gif"
          style={{ width: isMobile ? '70%' : '50%', height: 'auto' }}
        />
      </FluidContainer>
    ) : (
      <Typography as="p" margin="32px 0">
        Please enter a search query to get started!
      </Typography>
    );

  return (
    <Page>
      <Head>
        <title>U&ndash;SU Search</title>
        <meta name="author" content="Search" key="author" />
        <meta
          name="keywords"
          content="search find query u-su student union look"
          key="keywords"
        />
        {/* Preload background image for better LCP */}
        <link
          rel="preload"
          href="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-2-opt3.webp"
          as="image"
        />
      </Head>
      <Header
        title="Search"
        backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-2-opt3.webp"
      >
        <label htmlFor="search-input">Need help finding something?</label>
        <form onSubmit={handleOnSubmit}>
          <SearchBig
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={handleOnChange}
            placeholder="Search the U-SU"
            ref={searchInputRef}
          />
        </form>
      </Header>
      <FluidContainer innerMaxWidth="1216px" innerMinHeight="50vh">
        <Typography variant="title" as="h2" size={isMobile ? 'xl' : '2xl'}>
          Results:
        </Typography>
        {content}
      </FluidContainer>
    </Page>
  );
}
