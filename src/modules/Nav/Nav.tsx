import { FluidContainer, Image, Button } from 'components';
import styled from 'styled-components';
import { Colors, media } from 'theme';
import Link from 'next/link';
import { useBreakpoint } from 'hooks';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';

const NavExtra = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media('tablet')(`display: none;`)}
`;

const GetInvolvedButton = styled(Button)`
  border-radius: 40px;
  background-color: ${Colors.primary};
  border: none;
  font-weight: bold;
  height: 50px;
`;

export const Nav = () => {
  const { isMini, isMobile, isTablet, isDesktop } = useBreakpoint();
  return isTablet ? (
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
  ) : (
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
      {!isDesktop && (
        <NavExtra>
          <GetInvolvedButton href="/employment">Get Involved</GetInvolvedButton>
        </NavExtra>
      )}
    </FluidContainer>
  );
};
