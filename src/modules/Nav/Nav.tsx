import { FluidContainer, Image } from 'components';
import styled from 'styled-components';
import Link from 'next/link';
import { useBreakpoint } from 'hooks';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';
import { Search } from 'modules/Search';

const NavWrapper = styled.div`
  filter: drop-shadow(0px 4px 4px rgb(0, 0, 0, 0.25));
  z-index: 99;
`;

export const Nav = () => {
  const { isMini, isMobile, isTablet } = useBreakpoint();
  return isTablet ? (
    <NavWrapper>
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
    </NavWrapper>
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
            width="200px"
            height="70"
            src="/usu-wordmark-white.png"
            alt="Cal State LA University-Student Union"
          />
        </Link>
        <DesktopNav />
        <Search />
      </FluidContainer>
    </NavWrapper>
  );
};
