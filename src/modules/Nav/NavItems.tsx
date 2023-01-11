import styled from 'styled-components';
import { Colors } from 'theme';
import Link from 'next/link';
import { DropdownNav } from './DropdownNav';

const NavItemsContainer = styled.nav`
  display: flex;
  align-items: center;
  z-index: 10;
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
    <DropdownNav
      title="About"
      links={[
        { text: 'Contact', href: '/contact' },
        { text: 'Tenants', href: '/tenants' },
      ]}
    ></DropdownNav>
    <Link href="/events">Events</Link>
    <DropdownNav
      title="Departments"
      links={[
        { text: 'Center For Student Involvement', href: '/csi' },
        { text: 'Cross Cultural Centers', href: '/ccc' },
        { text: 'Operations', href: '/operations' },
        { text: 'Recreation', href: '/recreation' },
      ]}
    ></DropdownNav>
    <Link href="/employment">Employment</Link>
    <Link href="/governance">Governance</Link>
  </NavItemsContainer>
);
