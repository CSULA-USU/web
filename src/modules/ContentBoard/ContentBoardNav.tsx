import { Typography } from 'components';
import { Dispatch, SetStateAction } from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import { FontSizes } from 'theme';

const ContentBarNavContainer = styled.div`
  height: 64px;
  width: 100%;
  background-color: #2b2b2b;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  width: 300px;
  border: 2px solid #ccc;
  /* border-radius: 25px; */
  padding: 5px 10px;
  background-color: #fff;
`;

const SearchBar = ({
  filterInput,
  setFilterInput,
}: {
  filterInput: string;
  setFilterInput: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <SearchBarContainer>
      <FaSearch />
      <input
        type="text"
        placeholder="Search by title..."
        value={filterInput}
        onChange={(e) => {
          setFilterInput(e.target.value);
        }}
        style={{
          flex: 1,
          border: 'none',
          fontSize: '16px',
          height: '100%',
        }}
      />
    </SearchBarContainer>
  );
};

export const ContentBoardNav = ({
  title,
  filterInput,
  setFilterInput,
}: {
  title: string;
  filterInput: string;
  setFilterInput: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <ContentBarNavContainer>
      <Typography
        variant="labelTitle"
        weight="400"
        size="lg"
        lineHeight={FontSizes['lg']}
        color="white"
      >
        {title}
      </Typography>
      <SearchBar filterInput={filterInput} setFilterInput={setFilterInput} />
    </ContentBarNavContainer>
  );
};
