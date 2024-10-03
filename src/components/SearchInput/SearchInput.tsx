import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { ChangeEvent, FormEvent, useRef } from 'react';
import { useBreakpoint } from 'hooks';
import { Colors } from 'theme';
import Link from 'next/link';
import { useState } from 'react';

export interface SearchProps {
  input?: string;
  onChange?: (_: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (_: FormEvent<HTMLFormElement>) => void;
}

const OuterContainer = styled.div`
  display: flex;
`;

const InputContainerForm = styled.form`
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  border-radius: 120px;
  gap: 12px;
`;

const StyledInput = styled.input`
  background-color: ${Colors.greyLightest};
  color: black;
  width: 100%;
  border-radius: 40px;
  border-style: none;
  border: 0;
  gap: 36px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Bitter', serif;
  text-decoration: none;
  ::selection {
    background: ${Colors.greyDarker};
    color: white;
  }
  &:focus {
    border: 0;
  }
  &::placeholder {
    color: ${Colors.grey};
  }
`;

const Label = styled.label`
  display: none;
`;

export const SearchInput = ({ input, onChange, onSubmit }: SearchProps) => {
  const { isMobile, isTablet } = useBreakpoint();
  const [isReadOnly, setIsReadOnly] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null); // create the ref. Refs provide a way to access and interact with DOM elements or React component instances directly

  const handleSearchClick = () => {
    setIsReadOnly(false);
    inputRef.current?.focus(); // programmatically focus the input field when the search icon is clicked
  };

  return (
    <OuterContainer>
      <InputContainerForm onSubmit={onSubmit}>
        {isTablet ? (
          <>
            <Label htmlFor="searchInput">Search</Label>
            <StyledInput
              id="searchInput"
              aria-labelledby="searchInput"
              placeholder="Search"
              value={input}
              onChange={onChange}
              readOnly={isReadOnly}
              onClick={handleSearchClick}
              style={{
                backgroundColor: Colors.greyLightest,
                color: Colors.black,
                border: '1px solid',
              }}
              ref={inputRef}
            />
          </>
        ) : null}
        {isMobile ? null : (
          <Link href="/search" aria-label="Search the University Student Union">
            <FaSearch size={'1.25em'} color={isTablet ? 'black' : '#FFF'} />
          </Link>
        )}
      </InputContainerForm>
    </OuterContainer>
  );
};
