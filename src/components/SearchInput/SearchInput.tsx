import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { Colors } from 'theme';
import Link from 'next/link';

const OuterContainer = styled.div`
  display: flex;
`;

const StyledSearchIcon = styled(FaSearch)`
  font-size: 1.25em;
  /* Sits in a flex row beside the nav's items, which would squeeze it. */
  flex-shrink: 0;
  /* Always renders on the nav bar, whose background is greyDarkest — never
     inside a light field beside it — so this stays white at every width. An
     earlier version flipped it to black below 768px on the assumption it sat
     on the search field. It is that field's sibling, not its child, so the
     flip put black on #2b2b2b at roughly 1.5:1. */
  color: ${Colors.white};

  &:hover {
    color: ${Colors.primary};
  }
`;

export const SearchInput = () => (
  <OuterContainer>
    <Link href="/search" aria-label="Search the University Student Union">
      <StyledSearchIcon />
    </Link>
  </OuterContainer>
);
