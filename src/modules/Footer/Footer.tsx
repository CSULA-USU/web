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

const LogoLink = styled(Link)`
  max-width: 1200px;
  max-height: 90px;
  margin: ${Spaces.xl} 0;
  &:focus {
    box-shadow: 0 0 0 6px black;
    outline: 3px solid #fece07;
    text-decoration: underline;
  }
`;

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

const FooterUnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FooterBottomContainer = styled(FooterTopContainer)`
  justify-content: space-between;
  ${media('mobile')(`justify-content: center`)}
`;

const StyledLinkMargins = styled.li`
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
  <footer role="contentinfo">
    <FluidContainer backgroundColor="greyDarkest">
      <FooterTopContainer>
        <LogoLink
          target="_blank"
          href={'https://www.calstatela.edu/'}
          tabIndex={0}
        >
          <Image
            src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/calstatela-logo.webp"
            alt="Cal State LA Homepage"
            width="250"
            height="40"
          />
        </LogoLink>
        <FooterTopLinks>
          <FooterUnorderedList>
            <li>
              <Typography margin="0 0 7px 0" as="h2" color="white" weight="600">
                Building Hours
              </Typography>
            </li>
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
                    'https://www.dropbox.com/scl/fi/32f2ttnx421m6f8p0w47c/fall-2025-hours.docx?rlkey=dghcrwg3rf2w63gw2ks9ghxm1&st=4ljddxow&raw=1'
                  }
                  isExternalLink
                >
                  2025 Fall Schedule
                </StyledLink>
              </Typography>
            </StyledLinkMargins>
          </FooterUnorderedList>
          <FooterUnorderedList>
            <li>
              <Typography margin="0 0 7px 0" as="h2" color="white" weight="600">
                Involvement
              </Typography>
            </li>
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
                  isExternalLink
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
          </FooterUnorderedList>
          <FooterUnorderedList>
            <li>
              <Typography margin="0 0 7px 0" as="h2" color="white" weight="600">
                Resources
              </Typography>
            </li>
            <StyledLinkMargins>
              <Typography color="primary" size="sm">
                <StyledLink href={'https://www.calstatela.edu/'} isExternalLink>
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
                  isExternalLink
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
          </FooterUnorderedList>
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
          <span>
            <Link
              target="_blank"
              href={'https://www.instagram.com/usucalstatela/?hl=en'}
              aria-label="link to the CalState L.A. University-Student Union's Instagram feed"
            >
              <StyledInstagramIcon />
            </Link>
          </span>
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
