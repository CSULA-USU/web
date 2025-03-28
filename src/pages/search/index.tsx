import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Page, Header } from 'modules';
import { FluidContainer, Image, Typography } from 'components';
import { searchResultState } from 'atoms';
import data from 'data/search-directory.json';
import Fuse from 'fuse.js';
import { Colors, Spaces } from 'theme';
import { useBreakpoint } from 'hooks';

const SearchBig = styled.input`
  display: flex;
  margin: 0 auto;
  color: black;
  border-radius: 40px;
  border: 1 rem solid black;
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
  &:placeholder {
    color: #2b2b2b;
  }
`;

const SearchCard = styled.div`
  border: 1 rem solid black;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin-top: 32px;
  padding: 16px;
  :hover {
    border-radius: 16px;
    border: 1px solid black;
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
  const searchResults = useRecoilValue<ResultsType[]>(searchResultState);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<ResultsType[]>(searchResults);
  const router = useRouter();
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }

    const { query } = router.query;
    setSearchQuery((prevQuery) => (query || prevQuery || '') as string);
  }, [router.query]);

  useEffect(() => {
    const options = {
      keys: ['title', 'url', 'description', { name: 'tags', weight: 2 }],
      minMatchCharLength: 2,
      threshold: 0.1,
    };

    const fuse = new Fuse(data, options);
    const queryString = typeof searchQuery === 'string' ? searchQuery : '';

    setResults(fuse.search(queryString));
  }, [searchQuery]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const options = {
      keys: ['title', 'url', 'description', { name: 'tags', weight: 2 }],
      minMatchCharLength: 2,
      threshold: 0.1,
    };
    const fuse = new Fuse(data, options);
    const queryString = typeof searchQuery === 'string' ? searchQuery : '';
    setResults(fuse.search(queryString));
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
      <p>Please enter a search query!</p>
    );

  return (
    <Page>
      <Head>
        <title>U-SU Search</title>
        <meta name="author" content="Search" key="author" />
        <meta
          name="keywords"
          content="search find query u-su student union look"
          key="keywords"
        />
      </Head>
      <Header
        title="Search"
        backgroundImage="/backgrounds/subtle-background-2.jpg"
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
