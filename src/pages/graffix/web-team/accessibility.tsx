import Head from 'next/head';
import styled from 'styled-components';
import { MdOutlineEmail } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import { useBreakpoint } from 'hooks';
import {
  Divider,
  FluidContainer,
  StyledLink,
  Typography,
  Image,
} from 'components';
import { Header, Page } from 'modules';
import { Colors } from 'theme';

const LeftDescriptionContainer = styled.div`
  background-color: ${Colors.greyLightest};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const SectionContainer = styled.section`
  background-color: ${Colors.greyLightest};
  border-radius: 12px;
  padding: 36px 72px;
  @media (max-width: 1024px) {
    padding: 18px 36px;
  }
  @media (max-width: 580px) {
    padding: 18px 16px;
  }
  width: 100%;
`;

export default function Accessibility() {
  const { isMobile, isTablet } = useBreakpoint();
  return (
    <Page>
      <Head>
        <title>U&ndash;SU Accessibility Statement</title>
        <meta
          name="description"
          content="Learn about Accessibility at Cal State LA's University-Student Union. Explore resources, ADA compliance, inclusive design, and services that ensure all students can fully participate in campus life."
        />
        <meta name="author" content="University-Student Union, Cal State LA" />
        <meta
          name="keywords"
          content="Cal State LA, California State University Los Angeles, CSULA, accessibility, ADA compliance, disability services, inclusive design, Cal State LA U-SU, Cal State LA University Student Union, accessibility resources, accessible campus, assistive technology, student accessibility, universal design, equity inclusion Cal State LA"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta
          property="og:title"
          content="Accessibility | University-Student Union at Cal State LA"
        />
        <meta
          property="og:description"
          content="Discover how the University-Student Union at Cal State LA promotes web accessibility and inclusion through ADA compliance, and resources."
        />
        <meta
          property="og:image"
          content="https://live-csu-northridge.pantheonsite.io/sites/default/files/2023-02/Accessibility_Statement.png"
        />
        <meta
          property="og:image:alt"
          content="Accessibility Statement graphic representing accessibility and inclusion at Cal State LA University-Student Union"
        />
        <meta
          property="og:url"
          content="https://calstatelausu.org/graffix/web-team/accessibility"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="U-SU at Cal State LA Web Accessibiility"
        />
        <meta
          name="twitter:description"
          content="Learn about accessibility and inclusion at the University-Student Union, Cal State LA. Explore ADA compliance, resources, and accessible services."
        />
        <meta
          name="twitter:image"
          content="https://live-csu-northridge.pantheonsite.io/sites/default/files/2023-02/Accessibility_Statement.png"
        />
        <meta
          name="twitter:image:alt"
          content="Accessibility Statement graphic representing accessibility and inclusion at Cal State LA University-Student Union"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        title="Web Accessibility Statement"
        backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-2.webp"
      >
        <Typography margin="0 0 24px 0" as="p">
          The University&ndash;Student Union at Cal State LA is committed to
          ensuring that our website is accessible to all users, including
          individuals with disabilities. We are continually improving the user
          experience for everyone and we strive to follow best practices and
          compliance standards that support equal access to information and
          digital resources.
        </Typography>
      </Header>
      <FluidContainer
        flex
        flexDirection={isTablet ? 'column' : 'row'}
        gap="32px"
      >
        <SectionContainer>
          <LeftDescriptionContainer>
            <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
              Our Commitment
            </Typography>
            <Typography margin="0 0 12px 0">
              We believe that everyone should have equal access to information
              and functionality. This website aims to conform to the Web Content
              Accessibility Guidelines (WCAG) 2.1 at the AA level.
            </Typography>
            <Typography>
              Accessibility is not just a compliance requirement for us; it is a
              fundamental principle that guides our design and development
              process. We strive to create an inclusive digital environment
              where all users can navigate, understand, and interact with our
              content effectively.
            </Typography>
          </LeftDescriptionContainer>
        </SectionContainer>
        <Image
          src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/graffix/accessibility/accessibility-stock.webp"
          alt=""
          width={['100%', '100%', '424px']}
          height="auto"
          borderRadius="12px"
          noShrink
        />
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection="column"
        alignItems="flex-start"
        innerRounded
        innerBackgroundColor="greyLightest"
        innerPadding={
          isMobile ? '18px 16px' : isTablet ? '18px 36px' : '36px 72px'
        }
      >
        <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
          Guidelines
        </Typography>
        <Typography>
          Our website follows the guidelines outlined by the:
        </Typography>
        <ul>
          <li>
            <Typography>
              <StyledLink
                href="https://www.ada.gov/"
                isInverseUnderlineStyling
                isExternalLink
              >
                Americans with Disabilities Act
              </StyledLink>
            </Typography>
          </li>
          <li>
            <Typography>
              <StyledLink
                href="https://www.dol.gov/agencies/oasam/centers-offices/civil-rights-center/statutes/section-504-rehabilitation-act-of-1973"
                isExternalLink
                isInverseUnderlineStyling
              >
                Section 504 of the Rehabilitation Act of 1973
              </StyledLink>
            </Typography>
          </li>
          <li>
            <Typography>
              <StyledLink
                href="https://www.section508.gov/manage/laws-and-policies/"
                isExternalLink
                isInverseUnderlineStyling
              >
                Section 508 of the Rehabilitation Act
              </StyledLink>
            </Typography>
          </li>
          <li>
            <Typography>
              <StyledLink
                href="https://www.w3.org/TR/WCAG21/"
                isExternalLink
                isInverseUnderlineStyling
              >
                Web Content Accessibility Guidelines 2.1
              </StyledLink>
            </Typography>
          </li>
          <li>
            <Typography>
              <StyledLink
                href="https://www.calstatela.edu/accessibility/ada-title-ii-update"
                isExternalLink
                isInverseUnderlineStyling
              >
                Cal State LA Title II Update
              </StyledLink>
            </Typography>
          </li>
        </ul>
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection="column"
        alignItems="flex-start"
        innerRounded
        innerPadding={
          isMobile ? '18px 16px' : isTablet ? '18px 36px' : '36px 72px'
        }
        innerBackgroundColor="greyLightest"
      >
        <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
          Key Features
        </Typography>
        <ul>
          <li>
            <Typography>
              Alternative text for meaningful non&ndash;text elements (such as
              images).
            </Typography>
          </li>
          <li>
            <Typography>
              Compatibility with keyboard navigation (no mouse required).
            </Typography>
          </li>
          <li>
            <Typography>
              Content that is not dependent on color, with sufficient color
              contrast.
            </Typography>
          </li>
          <li>
            <Typography>Focus indicators for keyboard users</Typography>
          </li>
          <li>
            <Typography>
              Keyboard navigation support for all interactive elements.
            </Typography>
          </li>
          <li>
            <Typography>
              Responsive design that works across different devices and screen
              sizes.
            </Typography>
          </li>
          <li>
            <Typography>Scalable and legible text.</Typography>
          </li>
          <li>
            <Typography>
              Semantic HTML markup for proper structure and screen reader
              navigation.
            </Typography>
          </li>
        </ul>
      </FluidContainer>
      <FluidContainer
        innerRounded
        innerPadding={
          isMobile ? '18px 16px' : isTablet ? '18px 36px' : '36px 72px'
        }
        innerBackgroundColor="greyLightest"
      >
        <Typography
          margin="0 0 24px 0"
          as="h2"
          variant="title"
          size={isMobile ? 'xl' : '2xl'}
        >
          Feedback and Support
        </Typography>
        <FluidContainer flex gap="10px" flexDirection="column" padding="0">
          <Typography as="p">
            If you encounter any accessibility barriers on our website or have
            suggestions, please contact the web administrator at:
          </Typography>
          <FluidContainer flex alignItems="center" padding="0" gap="5px">
            <MdOutlineEmail />
            <Typography as="p">
              <StyledLink
                isInverseUnderlineStyling
                href="mailto:graffixwebteam@gmail.com"
              >
                graffixwebteam@gmail.com
              </StyledLink>
            </Typography>
          </FluidContainer>
          <FluidContainer flex alignItems="center" padding="0" gap="5px">
            <FiPhone />
            <Typography>
              <StyledLink href="tel:+13233432488" isInverseUnderlineStyling>
                (323) 343&ndash;2488
              </StyledLink>
            </Typography>
          </FluidContainer>
          <Typography as="p">
            We welcome your feedback and will work to address issues promptly.
          </Typography>
          <Typography as="p">
            For more information, visit the U.S. Department of Justice ADA
            regulations page:{' '}
            <StyledLink
              href="https://www.ada.gov/law-and-regs/regulations/title-ii-2010-regulations/#-35201-exceptions"
              isExternalLink
              isInverseUnderlineStyling
            >
              ADA Title II Regulations
            </StyledLink>
          </Typography>
        </FluidContainer>
      </FluidContainer>
      <FluidContainer
        innerRounded
        innerPadding={
          isMobile ? '18px 16px' : isTablet ? '18px 36px' : '36px 72px'
        }
        innerBackgroundColor="greyLightest"
      >
        <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
          Technical Specifications
        </Typography>
        <Typography>
          This website relies on the following technologies to work with
          assistive technologies:
        </Typography>
        <ul>
          <li>
            <Typography>
              ARIA attributes with appropriate alternative text
            </Typography>
          </li>
          <li>
            <Typography>
              CSS3 for visual presentation and responsive design
            </Typography>
          </li>
          <li>
            <Typography>
              HTML5 for semantic structure and proper document outline
            </Typography>
          </li>
          <li>
            <Typography>Javascript (ES6) for enhanced functionality</Typography>
          </li>
          <li>
            <Typography>
              Popetech, WAVE, and Google Lighthouse for automatic accessibility
              testing
            </Typography>
          </li>
        </ul>
      </FluidContainer>
      <FluidContainer>
        <Divider color="greyLighter" />
        <Typography margin="24px 0 0 0">
          Last updated{' '}
          <time dateTime="2025-09-09">
            <strong>September 9, 2025</strong>
          </time>
          .
        </Typography>
      </FluidContainer>
    </Page>
  );
}
