// import { ChangeEvent, FormEvent } from 'react';
import { StyledInput } from 'components';
import { useRecoilState } from 'recoil';
import { queryState } from 'atoms';

export const Search = () => {
  const [query, setQuery] = useRecoilState<string>(queryState);

  const handleOnChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    console.log(query);
  };

  return (
    <StyledInput
      input={query}
      onChange={handleOnChange}
      onSubmit={handleFormSubmit}
    />
  );
};
