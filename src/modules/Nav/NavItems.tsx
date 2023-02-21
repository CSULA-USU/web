import styled from 'styled-components';
import { Colors, Spaces, media } from 'theme';
import Link from 'next/link';
import { DropdownNav } from './DropdownNav';

const NavItemsContainer = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  z-index: 10;
  > * {
    &:not(:last-child) {
      margin-right: ${Spaces.xl};
      ${media('tablet')(`margin-right: ${Spaces.md}`)}
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
      href="/about"
      links={[
        { text: 'Contact', href: '/contact' },
        { text: 'Tenants', href: '/about/tenants' },
      ]}
    ></DropdownNav>
    <Link href="/events">Events</Link>
    <DropdownNav
      title="Departments"
      href="/departments"
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
