import styled from 'styled-components';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { FluidContainer, Image } from 'components';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';
import { Search } from 'modules/Search';
import { useBreakpoint } from 'hooks';

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

export const Nav = () => {
  const { breakpoint } = useBreakpoint();
  // The full bar needs roughly 1225px to lay out at rest — a 200px logo, six
  // top-level items, and the search icon — so anything narrower than the
  // `widescreen` bucket gets the hamburger. Not the hook's `isMobile` or
  // `isDesktop` flags: `isMobile` is only true below 580px, which left the
  // whole 580–1023 band rendering a bar that could not fit, and `isDesktop` is
  // true for *everything* at or below 1023px, the opposite of its name.
  const isCompactNav = !['widescreen', 'uhd'].includes(breakpoint);

  return (
    <NavWrapper aria-label="Main navigation">
      {isCompactNav ? (
        <FluidContainer
          padding="24px"
          backgroundColor="white"
          justifyContent="space-between"
          alignItems="center"
          flex
        >
          <LogoLink href="/" id="nav-logo-mobile">
            <Image
              className="mobile-logo"
              src="/usu-wordmark.png"
              alt="Cal State LA University-Student Union Logo"
              style={{ maxHeight: '64px' }}
            />
          </LogoLink>

          <MobileIconsContainer>
            <Link href="/search" aria-label="Search">
              <SearchIconLink />
            </Link>
            <MobileNav />
          </MobileIconsContainer>
        </FluidContainer>
      ) : (
        <FluidContainer
          flex
          justifyContent="space-between"
          alignItems="center"
          padding="24px"
          backgroundColor="greyDarkest"
        >
          <LogoLink href="/" id="nav-logo-desktop">
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
      )}
    </NavWrapper>
  );
};
