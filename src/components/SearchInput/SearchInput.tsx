import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { ChangeEvent, FormEvent } from 'react';
import { useBreakpoint } from 'hooks';
import { Colors } from 'theme';

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
  &:focus {
    border: 0;
    border-style: none;
  }
  &::placeholder {
    color: black;
  }
`;

const StyledSubmit = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const Label = styled.label`
  display: none;
`;

export const SearchInput = ({ input, onChange, onSubmit }: SearchProps) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

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
              style={{
                backgroundColor: Colors.greyLightest,
                color: Colors.black,
                border: '1px solid',
              }}
            />
          </>
        ) : (
          <>
            {isDesktop ? (
              ''
            ) : (
              <>
                <Label htmlFor="searchInput">Search</Label>
                <StyledInput
                  id="searchInput"
                  aria-labelledby="searchInput"
                  placeholder="Search"
                  value={input}
                  onChange={onChange}
                />
              </>
            )}
          </>
        )}
        {/* <Link href="/search" aria-label="Search the University Student Union"> */}
        {isMobile ? (
          <></>
        ) : (
          <StyledSubmit type="submit">
            <FaSearch size={'1.25em'} color={isTablet ? 'black' : '#FFF'} />
          </StyledSubmit>
        )}
        {/* </Link> */}
      </InputContainerForm>
    </OuterContainer>
  );
};
