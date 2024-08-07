import Image from 'next/image';
import styled from 'styled-components';
import { NonBreakingSpan, Typography } from 'components';
import { Colors, media, Spaces } from 'theme';
import { FluidContainer, Divider } from 'components';
import { AiOutlineInstagram, AiOutlineLinkedin } from 'react-icons/ai';
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

const FooterBottomContainer = styled(FooterTopContainer)`
  justify-content: space-between;
  ${media('mobile')(`justify-content: center`)}
`;

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
  ${media('mobile')(`
    text-align: center;
-  `)}
`;

export const Footer = () => (
  <footer>
    <FluidContainer backgroundColor="greyDarkest">
      <FooterTopContainer>
        <FooterTopLogo>
          <Link target="_blank" href={'https://www.calstatela.edu/'}>
            <Image
              src="/calstatela-badge.svg"
              alt="Cal State LA Logo"
              width={90}
              height={90}
            />
          </Link>
        </FooterTopLogo>
        <FooterTopLinks>
          <div>
            <Typography as="h2" color="white">
              Building Hours
            </Typography>
            <Typography color="primary" size="sm" lineHeight="2.4">
              Monday to Thursday: 7 AM to 10 PM
            </Typography>
            <Typography color="primary" size="sm" lineHeight="2.4">
              Friday: 7 AM to 8 PM
            </Typography>
            <Typography color="primary" size="sm" lineHeight="2.4">
              Saturday: 7 AM to 3 PM
            </Typography>
            <Typography color="primary" size="sm" lineHeight="2.4">
              Sunday: Closed
            </Typography>
            <Typography color="primary" size="sm" lineHeight="2.4">
              <Link
                target="_blank"
                href={
                  'https://www.dropbox.com/scl/fi/t6t1hpjup7f37chdb2s0m/tenant-memo-5-13-24-letterhead.docx?rlkey=k7f0kbzht7qjw988sfzyg84g4&dl=0'
                }
              >
                Upcoming Building Hours
              </Link>
            </Typography>
          </div>
          <div>
            <Typography as="h3" color="white">
              Involvement
            </Typography>
            <Link target="_blank" href={'/events'}>
              <Typography color="primary" size="sm" lineHeight="2.4">
                Calendar of Events
              </Typography>
            </Link>
            <Link target="_blank" href={'/csi/student-orgs'}>
              <Typography color="primary" size="sm" lineHeight="2.4">
                Clubs & Orgs
              </Typography>
            </Link>
            <Link
              target="_blank"
              href={'https://form.jotform.com/210416532268047'}
            >
              <Typography color="primary" size="sm" lineHeight="2.4">
                U-SU Board of Directors Application
              </Typography>
            </Link>
            <Link target="_blank" href={'/employment'}>
              <Typography color="primary" size="sm" lineHeight="2.4">
                U-SU Employment
              </Typography>
            </Link>
          </div>
          <div>
            <Typography as="h3" color="white">
              Resources
            </Typography>
            <Link target="_blank" href={'https://www.calstatela.edu/'}>
              <Typography color="primary" size="sm" lineHeight="2.4">
                Cal State LA Homepage
              </Typography>
            </Link>
            <Link
              target="_blank"
              href={
                'https://www.dropbox.com/scl/fi/mhz4o8qwrgoc5fs1913pa/strategic-plan-2024.pdf?rlkey=0lqvmafy11699jekjtgru89lg&e=1&dl=0'
              }
            >
              <Typography color="primary" size="sm" lineHeight="2.4">
                Strategic Plan
              </Typography>
            </Link>
            <Link target="_blank" href={'/governance/public-documents'}>
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
        <div>
          <Link
            target="_blank"
            href={'https://www.instagram.com/usucalstatela/?hl=en'}
            aria-label="link to the CalState L.A. University-Student Union's Instagram feed"
          >
            <AiOutlineInstagram
              color={Colors.greyLighter}
              fontSize="32px"
            ></AiOutlineInstagram>
          </Link>
          <Link
            target="_blank"
            href={
              'https://www.linkedin.com/company/university-student-union-at-california-state-university-los-angeles'
            }
            aria-label="link to the CalState L.A. University-Student Union's LinkedIn"
          >
            <AiOutlineLinkedin
              color={Colors.greyLighter}
              fontSize="32px"
            ></AiOutlineLinkedin>
          </Link>
        </div>
      </FooterBottomContainer>
    </FluidContainer>
  </footer>
);
