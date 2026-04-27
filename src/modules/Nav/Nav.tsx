import styled from 'styled-components';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { FluidContainer, Image } from 'components';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';
import { Search } from 'modules/Search';

const LogoLink = styled(Link)`
  &:focus {
    text-decoration: underline;
  }
`;

const MobileIconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavWrapper = styled.nav`
  filter: drop-shadow(0px 4px 4px rgb(0, 0, 0, 0.25));
  z-index: 99;
`;

const SearchIconLink = styled(FaSearch)`
  font-size: 33px;
`;

const MobileNavContainer = styled.div`
  display: none; /* Hidden by default (on Desktop) */
  @media (max-width: 1024px) {
    display: block; /* Shown instantly on Tablet/Mobile screens */
  }
`;

const DesktopNavContainer = styled.div`
  display: block; /* Shown by default */
  @media (max-width: 1024px) {
    display: none; /* Hidden instantly on Tablet/Mobile screens */
  }
`;

export const Nav = () => {
  return (
    <NavWrapper role="banner">
      {/* MOBILE / TABLET NAV */}
      <MobileNavContainer>
        <FluidContainer
          padding="24px"
          backgroundColor="white"
          justifyContent="space-between"
          alignItems="center"
          flex
        >
          <LogoLink href="/" id="nav-logo-mobile" tabIndex={0}>
            {/* Using CSS classes for the logo swap is safer than JS hooks */}
            <Image
              className="mobile-logo"
              src="/usu-wordmark.png"
              alt="Cal State LA University-Student Union Logo"
              style={{ maxHeight: '64px' }}
            />
          </LogoLink>
          <MobileIconsContainer>
            <Link href="/search" aria-label="Search" tabIndex={0}>
              <SearchIconLink />
            </Link>
            <MobileNav />
          </MobileIconsContainer>
        </FluidContainer>
      </MobileNavContainer>

      {/* DESKTOP NAV */}
      <DesktopNavContainer>
        <FluidContainer
          flex
          justifyContent="space-between"
          flexWrap="wrap"
          alignItems="center"
          padding="24px"
          backgroundColor="greyDarkest"
        >
          <LogoLink href="/" id="nav-logo-desktop" tabIndex={0}>
            <Image
              width="200px"
              height="70"
              src="/usu-wordmark-white.png"
              alt="Cal State LA University-Student Union"
            />
          </LogoLink>
          <DesktopNav />
          <Search />
        </FluidContainer>
      </DesktopNavContainer>
    </NavWrapper>
  );
};
