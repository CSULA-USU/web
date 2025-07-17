import styled from 'styled-components';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { FluidContainer, Image } from 'components';
import { useBreakpoint } from 'hooks';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';
import { Search } from 'modules/Search';

const LogoLink = styled(Link)`
  &:focus {
    box-shadow: 0 0 0 6px black;
    outline: 3px solid #fece07;
    text-decoration: underline;
  }
`;

const MobileIconsContainer = styled.div`
  display: flex;
  align-items: center;
`;
const NavWrapper = styled.div`
  filter: drop-shadow(0px 4px 4px rgb(0, 0, 0, 0.25));
  z-index: 99;
`;

const SearchIconLink = styled(FaSearch)`
  font-size: 33px;
`;

export const Nav = () => {
  const { isMini, isMobile, isTablet } = useBreakpoint();
  return isTablet ? (
    <NavWrapper role="banner">
      <FluidContainer
        padding="24px"
        backgroundColor="white"
        justifyContent="space-between"
        alignItems="center"
        flex
      >
        <LogoLink href="/" id="nav-logo" tabIndex={0}>
          <Image
            maxHeight={isMobile ? '64px' : '80px'}
            src={isMini ? '/usu-logo-white.png' : '/usu-wordmark.png'}
            alt="Cal State LA University-Student Union Logo"
          />
        </LogoLink>
        <MobileIconsContainer>
          <Link href="/search" aria-label="Search" tabIndex={0}>
            <SearchIconLink />
          </Link>
          <MobileNav />
        </MobileIconsContainer>
      </FluidContainer>
    </NavWrapper>
  ) : (
    <NavWrapper role="banner">
      <FluidContainer
        flex
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
        padding="24px"
        backgroundColor="greyDarkest"
      >
        <LogoLink href="/" id="nav-logo" tabIndex={0}>
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
    </NavWrapper>
  );
};
