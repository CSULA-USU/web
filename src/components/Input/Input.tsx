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

export const StyledInput = ({ input, onChange, onSubmit }: SearchProps) => {
  const { isDesktop } = useBreakpoint();

  return (
    <OuterContainer>
      <InputContainerForm onSubmit={onSubmit}>
        {isDesktop ? (
          ''
        ) : (
          <Input placeholder="Search" value={input} onChange={onChange} />
        )}
        <Link href="/search">
          <FaSearch size={'1.25em'} color="#FFF" />
        </Link>
      </InputContainerForm>
    </OuterContainer>
  );
};
