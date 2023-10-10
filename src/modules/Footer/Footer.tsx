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
            Building Hours
          </Typography>
          <Typography color="primary" size="sm" lineHeight="2.4">
            Monday - Friday: 7 AM - 10 PM
          </Typography>
          <Typography color="primary" size="sm" lineHeight="2.4">
            Saturday: 7 AM - 3 PM
          </Typography>
          <Typography color="primary" size="sm" lineHeight="2.4">
            Sunday: Closed
          </Typography>
        </div>
        <div>
          <Typography as="h5" color="white">
            Involvement
          </Typography>
          <Link href={'/events'}>
            <Typography color="primary" size="sm" lineHeight="2.4">
              Calendar of Events
            </Typography>
          </Link>
          <Link href={'/csi/student-orgs'}>
            <Typography color="primary" size="sm" lineHeight="2.4">
              Clubs & Orgs
            </Typography>
          </Link>
          <Link href={'/employment'}>
            <Typography color="primary" size="sm" lineHeight="2.4">
              U-SU Employment
            </Typography>
          </Link>
        </div>
        <div>
          <Typography as="h5" color="white">
            Resources
          </Typography>
          <Link href={'https://www.calstatela.edu/president'}>
            <Typography color="primary" size="sm" lineHeight="2.4">
              Office of the President
            </Typography>
          </Link>
          <Link href={'https://www.calstatela.edu/'}>
            <Typography color="primary" size="sm" lineHeight="2.4">
              Cal State LA Homepage
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
      <Link
        href={'https://www.instagram.com/usucalstatela/?hl=en'}
        aria-label="link to the CalState L.A. University-Student Union's Instagram feed"
      >
        <AiOutlineInstagram
          color={Colors.greyLighter}
          fontSize="32px"
        ></AiOutlineInstagram>
      </Link>
    </FooterBottomContainer>
  </FluidContainer>
);
