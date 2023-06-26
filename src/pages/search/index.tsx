import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { useState, ChangeEvent, FormEvent } from 'react';
import { ResultsType, queryState } from 'atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Page, Header } from 'modules';
import { FluidContainer, Typography } from 'components';
import { searchResultState } from 'atoms';
import data from 'data/directory.json';
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
  height: 160px;
  justify-content: space-between;
  margin-top: 32px;
  padding: 24px;
  :hover {
    border-radius: 16px;
    border: 2px solid black;
  }
`;

export default function Search() {
  const searchResults = useRecoilValue<ResultsType[]>(searchResultState);
  const [query, setQuery] = useRecoilState<string>(queryState);
  const [results, setResults] = useState<ResultsType[]>(searchResults);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const options = {
      keys: ['title', 'url', 'description', 'tags'],
    };
    const fuse = new Fuse(data, options);
    setResults(fuse.search(query));
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
                <div>{description}</div>
                <Link href={url}>
                  <Typography>calstatelausu.org{url}</Typography>
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
            value={query}
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
