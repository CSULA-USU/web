import { FluidContainer, Image } from 'components';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { Colors } from 'theme';
import Link from 'next/link';

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

const NavItems = styled.nav`
  display: flex;
  align-items: center;
  a {
    font-weight: 700;
    color: ${Colors.grey};
    display: inline-block;
    &:not(:last-child) {
      margin-right: 48px;
    }
  }
  a:hover {
    color: white;
  }
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
      <NavItems>
        <Link href="/about">About</Link>
        <Link href="/events">Events</Link>
        <Link href="/departments">Departments</Link>
        <Link href="/employment">Employment</Link>
        <Link href="/governance">Governance</Link>
      </NavItems>
      <NavExtra>
        <MdSearch color={Colors.white} fontSize="36px" />
        <GetInvolvedButton>Get Involved</GetInvolvedButton>
      </NavExtra>
    </NavContainer>
  </FluidContainer>
);
