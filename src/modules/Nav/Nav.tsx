import { FluidContainer, Image } from 'components';
import Link from 'next/link';
import { useBreakpoint } from 'hooks';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';

export const Nav = () => {
  const { isMini, isMobile, isTablet } = useBreakpoint();
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
    </FluidContainer>
  );
};
