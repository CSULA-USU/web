import { FluidContainer, Image, Typography } from 'components';
import Link from 'next/link';
import { useBreakpoint } from 'hooks';
import styled from 'styled-components';
import { Colors } from 'theme';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';

const GetInvolvedButton = styled.div`
  background-color: ${Colors.primary};
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 32px;
`;

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
      <GetInvolvedButton>
        <Link href="/csi/student-orgs">
          <Typography variant="eventDetail" color="black">
            Get Involved
          </Typography>
        </Link>
      </GetInvolvedButton>
    </FluidContainer>
  );
};
