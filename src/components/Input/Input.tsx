import Link from 'next/link';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { ChangeEvent, FormEvent } from 'react';
import { useBreakpoint } from 'hooks';

export interface SearchProps {
  input?: string;
  onChange?: (_: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (_: FormEvent<HTMLFormElement>) => void;
}

const HiddenSpan = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
`;

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

const Input = styled.input`
  background-color: #757575;
  color: white;
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
  &:focus {
    border: 0;
    border-style: none;
  }
  &::placeholder {
    color: #2b2b2b;
  }
`;

const Label = styled.label`
  display: none;
`;

export const StyledInput = ({ input, onChange, onSubmit }: SearchProps) => {
  const { isDesktop } = useBreakpoint();

  return (
    <OuterContainer>
      <InputContainerForm onSubmit={onSubmit}>
        {isDesktop ? (
          ''
        ) : (
          <>
            <Label htmlFor="searchInput">Search</Label>
            <Input
              id="searchInput"
              placeholder="Search"
              value={input}
              onChange={onChange}
            />
          </>
        )}
        <Link href="/search" aria-label="Search the University Student Union">
          <HiddenSpan aria-hidden="true">Search</HiddenSpan>
          <FaSearch size={'1.25em'} color="#FFF" />
        </Link>
      </InputContainerForm>
    </OuterContainer>
  );
};
