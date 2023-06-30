import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { Page, Header } from 'modules';
import { FluidContainer, Typography } from 'components';
import { searchResultState } from 'atoms';
import data from 'data/search-directory.json';
import Fuse from 'fuse.js';

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
  &:placeholder {
    color: #2b2b2b;
  }
`;

const SearchCard = styled.div`
  border: 1 rem solid black;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  margin-top: 32px;
  padding: 24px;
  :hover {
    border-radius: 16px;
    border: 1px solid black;
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<ResultsType[]>(searchResults);
  const router = useRouter();

  useEffect(() => {
    const { query } = router.query;
    setSearchQuery((prevQuery) => (query || prevQuery || '') as string);
  }, []);

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

  const content: JSX.Element | null = results ? (
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
  ) : (
    <div>No results found.</div>
  );

  return (
    <Page>
      <Head>
        <title>Search</title>
        <meta name="author" content="Search" />
        <meta
          name="keywords"
          content="search find query u-su student union look"
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        title="Search"
        backgroundImage="/backgrounds/subtle-background-2.jpg"
      >
        Need help finding something?
        <form onSubmit={handleOnSubmit}>
          <SearchBig
            type="text"
            value={searchQuery}
            onChange={handleOnChange}
            placeholder="Search the U-SU"
          />
        </form>
      </Header>
      <FluidContainer innerMaxWidth="1216px">
        <Typography variant="title" as="h2">
          Results:
        </Typography>
        {content}
      </FluidContainer>
    </Page>
  );
}
