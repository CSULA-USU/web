import { FluidContainer, Image } from 'components';
import styled from 'styled-components';
import Link from 'next/link';
import { useBreakpoint } from 'hooks';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';
import { Search } from 'modules/Search';

const MobileNavWrapper = styled.div`
  filter: drop-shadow(0px 2px 4px rgb(0, 0, 0, 0.1));
`;

const NavWrapper = styled.div`
  filter: drop-shadow(0px 4px 4px rgb(0, 0, 0, 0.25));
`;

export const Nav = () => {
  const { isMini, isMobile, isTablet } = useBreakpoint();
  return isTablet ? (
    <MobileNavWrapper>
      <FluidContainer
        padding="24px"
        backgroundColor="white"
        justifyContent="space-between"
        alignItems="center"
        flex
      >
        <Link href="/">
          <Image
            tabIndex={0}
            maxHeight={isMobile ? '64px' : '80px'}
            src={isMini ? '/usu-logo-white.png' : '/usu-wordmark.png'}
            alt="Cal State LA University-Student Union Logo"
          />
        </Link>
        <MobileNav />
      </FluidContainer>
    </MobileNavWrapper>
  ) : (
    <NavWrapper>
      <FluidContainer
        flex
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
        padding="24px"
        backgroundColor="greyDarkest"
      >
        <Link href="/">
          <Image
            maxWidth="200px"
            src="/usu-wordmark-white.png"
            alt="Cal State LA University-Student Union Logo"
          />
        </Link>
        <DesktopNav />
        <Search />
      </FluidContainer>
    </NavWrapper>
  );
};
