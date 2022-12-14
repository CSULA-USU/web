import { FluidContainer, Image } from 'components';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { Colors } from 'theme';
import { NavItems } from './NavItems';

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 200px;
    height: auto;
  }
`;
const NavExtra = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GetInvolvedButton = styled.button`
  border-radius: 40px;
  background-color: ${Colors.primary};
  border: none;
  font-weight: bold;
  width: 245px;
  height: 50px;
`;

export const Nav = () => (
  <FluidContainer backgroundColor="greyDarkest">
    <NavContainer>
      <Image
        src="/usu-logo-white.png"
        alt="Cal State LA Univeristy-Student Union Logo"
      />
      <NavItems />
      <NavExtra>
        <MdSearch color={Colors.white} fontSize="36px" />
        <GetInvolvedButton>Get Involved</GetInvolvedButton>
      </NavExtra>
    </NavContainer>
  </FluidContainer>
);
