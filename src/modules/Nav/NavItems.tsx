import styled from 'styled-components';
import { Colors } from 'theme';
import Link from 'next/link';
import { DropdownNav } from './DropdownNav';

const NavItemsContainer = styled.nav`
  display: flex;
  align-items: center;
  > * {
    &:not(:last-child) {
      margin-right: 48px;
    }
  }
  * {
    font-weight: 700;
    color: ${Colors.grey};
  }
  *:hover {
    color: white;
  }
`;

export const NavItems = () => (
  <NavItemsContainer>
    <Link href="/about">About</Link>
    <Link href="/events">Events</Link>
    <DropdownNav
      title="Departments"
      links={[
        { text: 'Recreation', href: '/recreation' },
        { text: 'Center For Student Involvement', href: '/csi' },
      ]}
    ></DropdownNav>
    <Link href="/employment">Employment</Link>
    <Link href="/governance">Governance</Link>
  </NavItemsContainer>
);
