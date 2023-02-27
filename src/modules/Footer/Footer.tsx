import Image from 'next/image';
import styled from 'styled-components';
import { NonBreakingSpan, Typography } from 'components';
import { Colors, media, Spaces } from 'theme';
import { FluidContainer, Divider } from 'components';
import { AiOutlineInstagram } from 'react-icons/ai';
import Link from 'next/link';

const currentYear = new Date().getFullYear();

const FooterTopLogo = styled.div`
  max-width: 1200px;
  margin-bottom: ${Spaces.xl};
`;
const FooterTopLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 72px;
`;

const FooterTopContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FooterBottomContainer = styled(FooterTopContainer)``;
const FooterBottomInner = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1200px;
  text-align: left;
  gap: 24px;
  ${media('desktop')(`
    gap: 0;
    flex-direction: column;
    .mobile-hidden {
      display: none;
    }
  `)}
`;

export const Footer = () => (
  <FluidContainer backgroundColor="greyDarkest">
    <FooterTopContainer>
      <FooterTopLogo>
        <Image
          src="/calstatela-badge.svg"
          alt="Cal State LA Univeristy-Student Union Logo"
          width={90}
          height={90}
        />
      </FooterTopLogo>
      <FooterTopLinks>
        <div>
          <Typography as="h5" color="white">
            Involvement
          </Typography>
          <Link href={'/employment'}>
            <Typography color="primary" size="sm" lineHeight="2.4">
              U-SU Employment
            </Typography>
          </Link>
          <Link href={'/events'}>
            <Typography color="primary" size="sm" lineHeight="2.4">
              Calendar of Events
            </Typography>
          </Link>
        </div>
        <div>
          <Typography as="h5" color="white">
            Resources
          </Typography>
          <Link
            href={
              'https://www2.calstate.edu/Pages/a-call-for-unity-and-understanding.aspx'
            }
          >
            <Typography color="primary" size="sm" lineHeight="2.4">
              Cal State L.A. Chancellor Message against racism
            </Typography>
          </Link>
          <Link href={'https://www.calstatela.edu/president/may30-message'}>
            <Typography color="primary" size="sm" lineHeight="2.4">
              President Covino&apos;s message against racism
            </Typography>
          </Link>
          <Link href={'https://www.calstatelausu.org/blackLivesResources'}>
            <Typography color="primary" size="sm" lineHeight="2.4">
              Black Lives Matter Resources
            </Typography>
          </Link>
          <Link href={'https://www.calstatelausu.org/covid19'}>
            <Typography color="primary" size="sm" lineHeight="2.4">
              Covid-19 Resources
            </Typography>
          </Link>
          <Link href={'governance/public-documents'}>
            <Typography color="primary" size="sm" lineHeight="2.4">
              View Public Documents
            </Typography>
          </Link>
        </div>
      </FooterTopLinks>
    </FooterTopContainer>
    <Divider color="grey" margin={`${Spaces.xl}`} />
    <FooterBottomContainer>
      <FooterBottomInner>
        <Typography color="greyLighter" size="sm" lineHeight="2.4">
          © {currentYear}{' '}
          <NonBreakingSpan>University-Student Union</NonBreakingSpan>{' '}
          <NonBreakingSpan>at Cal State LA</NonBreakingSpan>
        </Typography>
        <Typography
          className="mobile-hidden"
          color="greyLighter"
          size="sm"
          lineHeight="2.4"
        >
          |
        </Typography>
        <Typography color="greyLighter" size="sm" lineHeight="2.4">
          5154 State University Dr,{' '}
          <NonBreakingSpan>Los Angeles, CA 90032</NonBreakingSpan>
        </Typography>
        <Typography
          className="mobile-hidden"
          color="greyLighter"
          size="sm"
          lineHeight="2.4"
        >
          |
        </Typography>
        <Typography color="greyLighter" size="sm" lineHeight="2.4">
          (323) 343-2465
        </Typography>
      </FooterBottomInner>
      <Link href={'https://www.instagram.com/usucalstatela/?hl=en'}>
        <AiOutlineInstagram
          color={Colors.greyLighter}
          fontSize="32px"
        ></AiOutlineInstagram>
      </Link>
    </FooterBottomContainer>
  </FluidContainer>
);
