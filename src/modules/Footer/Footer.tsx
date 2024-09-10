import Image from 'next/image';
import styled from 'styled-components';
import {
  Divider,
  FluidContainer,
  NonBreakingSpan,
  StyledLink,
  Typography,
} from 'components';
import { Colors, media, Spaces } from 'theme';
import { AiOutlineInstagram, AiOutlineLinkedin } from 'react-icons/ai';
import Link from 'next/link';

const currentYear = new Date().getFullYear();

const StyledInstagramIcon = styled(AiOutlineInstagram)`
  color: ${Colors.greyLighter};
  font-size: 32px;
  &:hover {
    color: ${Colors.primary};
    transition: 0.4s ease-in-out;
  }
`;

const StyledLinkedinIcon = styled(AiOutlineLinkedin)`
  color: ${Colors.greyLighter};
  font-size: 32px;
  &:hover {
    color: ${Colors.primary};
    transition: 0.4s ease-in-out;
  }
`;

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

const StyledLinkMargins = styled.div`
  margin: 10px 0 0 0;
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
            <Typography margin="0 0 7px 0" as="h2" color="white" weight="600">
              Building Hours
            </Typography>
            <StyledLinkMargins>
              <Typography color="white" size="sm">
                Monday to Thursday: 7 AM to 10 PM
              </Typography>
            </StyledLinkMargins>
            <StyledLinkMargins>
              <Typography color="white" size="sm">
                Friday: 7 AM to 8 PM
              </Typography>
            </StyledLinkMargins>
            <StyledLinkMargins>
              <Typography color="white" size="sm">
                Saturday: 7 AM to 3 PM
              </Typography>
            </StyledLinkMargins>
            <StyledLinkMargins>
              <Typography color="white" size="sm">
                Sunday: Closed
              </Typography>
            </StyledLinkMargins>
            <StyledLinkMargins>
              <Typography color="primary" size="sm">
                <StyledLink
                  href={
                    'https://www.dropbox.com/scl/fi/s6eek5pluym965zpbjn97/tenant-memo-8-23-24-letterhead.docx?rlkey=wipoile2q0zk2m3bsrzeykv12&dl=0'
                  }
                  isExternal
                >
                  Upcoming Building Hours
                </StyledLink>
              </Typography>
            </StyledLinkMargins>
          </div>
          <div>
            <Typography margin="0 0 7px 0" as="h2" color="white" weight="600">
              Involvement
            </Typography>

            <StyledLinkMargins>
              <Typography color="primary" size="sm">
                <StyledLink href={'/events'}>Calendar of Events</StyledLink>
              </Typography>
            </StyledLinkMargins>

            <StyledLinkMargins>
              <Typography color="primary" size="sm">
                <StyledLink href={'/csi/student-orgs'}>Clubs & Orgs</StyledLink>
              </Typography>
            </StyledLinkMargins>

            <StyledLinkMargins>
              <Typography color="primary" size="sm">
                <StyledLink
                  href={'https://form.jotform.com/210416532268047'}
                  isExternal
                >
                  U-SU Board of Directors Application
                </StyledLink>
              </Typography>
            </StyledLinkMargins>

            <StyledLinkMargins>
              <Typography color="primary" size="sm">
                <StyledLink href={'/employment'}>U-SU Employment</StyledLink>
              </Typography>
            </StyledLinkMargins>
          </div>
          <div>
            <Typography margin="0 0 7px 0" as="h2" color="white" weight="600">
              Resources
            </Typography>
            <StyledLinkMargins>
              <Typography color="primary" size="sm">
                <StyledLink href={'https://www.calstatela.edu/'} isExternal>
                  Cal State LA Homepage
                </StyledLink>
              </Typography>
            </StyledLinkMargins>

            <StyledLinkMargins>
              <Typography color="primary" size="sm">
                <StyledLink
                  href={
                    'https://www.dropbox.com/scl/fi/mhz4o8qwrgoc5fs1913pa/strategic-plan-2024.pdf?rlkey=0lqvmafy11699jekjtgru89lg&e=1&dl=0'
                  }
                  isExternal
                >
                  Strategic Plan
                </StyledLink>
              </Typography>
            </StyledLinkMargins>

            <StyledLinkMargins>
              <Typography color="primary" size="sm">
                <StyledLink href={'/governance/public-documents'}>
                  View Public Documents
                </StyledLink>
              </Typography>
            </StyledLinkMargins>
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
            <StyledInstagramIcon />
          </Link>
          <Link
            target="_blank"
            href={
              'https://www.linkedin.com/company/university-student-union-at-california-state-university-los-angeles'
            }
            aria-label="link to the CalState L.A. University-Student Union's LinkedIn"
          >
            <StyledLinkedinIcon />
          </Link>
        </div>
      </FooterBottomContainer>
    </FluidContainer>
  </footer>
);
