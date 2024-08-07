import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { SearchInput } from 'components';

export const Search = () => {
  const [searchQuery, setQuery] = useState<string>('');

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  const router = useRouter();

  return (
    <SearchInput
      input={searchQuery}
      onChange={handleOnChange}
      onSubmit={handleFormSubmit}
    />
  );
};
