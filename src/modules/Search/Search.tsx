import { ChangeEvent, FormEvent } from 'react';
import { StyledInput } from 'components';
import { useRecoilState } from 'recoil';
import { queryState, searchResultState, ResultsType } from 'atoms';
import data from 'data/directory.json';
import Fuse from 'fuse.js';

const list = data;

export const Search = () => {
  const [query, setQuery] = useRecoilState<string>(queryState);
  const [searchResults, setSearchResults] =
    useRecoilState<ResultsType[]>(searchResultState);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const options = {
      keys: ['title', 'url', 'description', 'tags'],
    };
    const fuse = new Fuse(list, options);
    const results = fuse.search(query);
    setSearchResults(results);
    console.log('these are search results', searchResults);
  };

  return (
    <StyledInput
      input={query}
      onChange={handleOnChange}
      onSubmit={handleFormSubmit}
    />
  );
};
