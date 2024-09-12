import { FluidContainer, Image } from 'components';
import styled from 'styled-components';
import Link from 'next/link';
import { useBreakpoint } from 'hooks';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';
import { Search } from 'modules/Search';

const StyledLogo = styled.a`
  &:focus {
    border: 2px inset #1565c0; /* blue */
    display: inline-block;
    outline: 3px outset #4caf50; /* green */
    text-decoration: underline;
  }
`;

const NavWrapper = styled.div`
  filter: drop-shadow(0px 4px 4px rgb(0, 0, 0, 0.25));
  z-index: 99;
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
        <Link href="/" passHref>
          <StyledLogo id="nav-logo" tabIndex={0}>
            <Image
              maxHeight={isMobile ? '64px' : '80px'}
              src={isMini ? '/usu-logo-white.png' : '/usu-wordmark.png'}
              alt="Cal State LA University-Student Union Logo"
            />
          </StyledLogo>
        </Link>
        <MobileNav />
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
        <Link href="/" passHref>
          <StyledLogo id="nav-logo" tabIndex={0}>
            <Image
              width="200px"
              height="70"
              src="/usu-wordmark-white.png"
              alt="Cal State LA University-Student Union"
            />
          </StyledLogo>
        </Link>
        <DesktopNav />
        <Search />
      </FluidContainer>
    </NavWrapper>
  );
};
