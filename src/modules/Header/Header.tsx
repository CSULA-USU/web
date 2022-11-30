import Image from 'next/image';
import styled from 'styled-components';
import { Colors } from 'theme';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 210px;
  padding: 36px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  a {
    text-transform: uppercase;
    display: inline-block;
    &:not(:last-child) {
      margin-right: 48px;
    }
  }
`;

const Search = styled.input`
  border-radius: 26px;
  margin-right: 24px;
  padding: 24px;
  width: 230px;
  height: 52px;
`;

const GetInvolvedButton = styled.button`
  border-radius: 50px;
  padding: 24px 36px;
  background-color: ${Colors.primary};
  border: none;
  font-weight: bold;
`;

export const Header = () => (
  <HeaderContainer>
    <Image
      src="/usu-logo.png"
      alt="Cal State LA Univeristy-Student Union Logo"
      width={253}
      height={89}
    />
    <Nav>
      <a href="#">About</a>
      <a href="#">Events</a>
      <a href="#">Departments</a>
      <a href="#">Employment</a>
      <a href="#">Governance</a>
    </Nav>
    <div>
      <Search placeholder="Search" />
      <GetInvolvedButton>Get Involved</GetInvolvedButton>
    </div>
  </HeaderContainer>
);
