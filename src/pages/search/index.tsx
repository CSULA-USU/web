import Head from 'next/head';
import styled from 'styled-components';
import { useState, ChangeEvent, FormEvent } from 'react';
import { queryState } from 'atoms';
import { useRecoilState } from 'recoil';
import { Page, Header } from 'modules';
import { FluidContainer } from 'components';
import { searchResultState, SearchResult } from 'atoms';
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
  background-color: green;
  border: 1 rem solid black;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  height: 160px;
  justify-content: space-between;
  margin-top: 32px;
  padding: 24px;
`;

export default function Search() {
  const [query, setQuery] = useRecoilState<string>(queryState);
  const [searchResults, _] = useRecoilState<
    | SearchResult[]
    | Fuse.FuseResult<{
        title: string;
        url: string;
        description: string;
        tags: string[];
      }>[]
  >(searchResultState);
  const [results, setResults] = useState<
    | SearchResult[]
    | Fuse.FuseResult<{
        title: string;
        url: string;
        description: string;
        tags: string[];
      }>[]
  >(searchResults);

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
                <div>{title}</div>
                <div>{description}</div>
                <div>calstatelausu.org{url}</div>
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
      <FluidContainer>{content}</FluidContainer>
    </Page>
  );
}
