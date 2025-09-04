import { FluidContainer, StyledLink, Typography, Image } from 'components';
import { Page } from 'modules';
import { MdOutlineEmail } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import { useBreakpoint } from 'hooks';

export default function Accessibility() {
  const { isMobile, isTablet } = useBreakpoint();
  return (
    <Page>
      <head>
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
          content="Accessibility | Cal State LA University-Student Union"
        />
        <meta
          property="og:description"
          content="Discover how the University-Student Union at Cal State LA promotes accessibility and inclusion through ADA compliance, resources, and accessible facilities."
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
          content="https://usu.calstatela.edu/accessibility"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Accessibility at Cal State LA U-SU"
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
      </head>

      <FluidContainer backgroundImage="/backgrounds/subtle-background-2.jpg">
        <Typography variant="pageHeader" as="h1">
          Accessibility Statement
        </Typography>
      </FluidContainer>
      <FluidContainer>
        <Typography margin="0 0 24px 0" as="p">
          The University&ndash;Student Union at Cal State LA is committed to
          ensuring that our website is accessible to all users, including
          individuals with disabilities. We strive to follow best practices and
          compliance standards that support equal access to information and
          digital resources.
        </Typography>
        <Typography>
          Our website follows the guidelines outlined by the{' '}
          <StyledLink
            href="https://www.ada.gov/"
            isInverseUnderlineStyling
            isExternalLink
          >
            Americans with Disabilities Act
          </StyledLink>
          ,{' '}
          <StyledLink
            href="https://www2.ed.gov/policy/rights/reg/ocr/edlite-34cfr104.html"
            isExternalLink
            isInverseUnderlineStyling
          >
            Section 504 of the Rehabilitation Act of 1973
          </StyledLink>{' '}
          and{' '}
          <StyledLink
            href="https://www.section508.gov/manage/laws-and-policies/"
            isExternalLink
            isInverseUnderlineStyling
          >
            Section 508 of the Rehabilitation Act
          </StyledLink>
          , as well as the{' '}
          <StyledLink
            href="https://www.w3.org/TR/WCAG21/"
            isExternalLink
            isInverseUnderlineStyling
          >
            Web Content Accessibility Guidelines 2.1
          </StyledLink>
          . These standards are designed to remove barriers in information
          technology and promote inclusive access.
        </Typography>
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection={isMobile || isTablet ? 'column' : 'row'}
        justifyContent="space-between"
        alignItems="center"
        gap="24px"
      >
        <FluidContainer
          padding="0"
          flex
          flexDirection="column"
          gap="24px"
          alignItems="flex-start"
        >
          <FluidContainer padding="0">
            <Typography
              as="h2"
              variant="title"
              size={isMobile ? 'xl' : '2xl'}
              margin=""
            >
              Key accessibility features website include:
            </Typography>
          </FluidContainer>
          <Typography>
            <Typography as="p">
              <ul>
                <li>
                  Alternative text for meaningful non&ndash;text elements (such
                  as images).
                </li>
                <li>Captions and transcripts for videos and multimedia.</li>
                <li>
                  Compatibility with keyboard navigation (no mouse required).
                </li>
                <li>
                  Content that is not dependent on color, with sufficient color
                  contrast.
                </li>
                <li>Scalable and legible text.</li>
                <li>
                  Properly structured headings, lists, and form labels for
                  screen reader navigation.
                </li>
              </ul>
            </Typography>
          </Typography>
        </FluidContainer>
        <Image
          src="https://live-csu-northridge.pantheonsite.io/sites/default/files/2023-02/Accessibility_Statement.png"
          alt="Keyboard with Accesibility statement as the enter button"
          width={'400px'}
          height={'400px'}
        />
      </FluidContainer>
      <FluidContainer>
        <Typography
          margin="0 0 24px 0"
          as="h2"
          variant="title"
          size={isMobile ? 'xl' : '2xl'}
        >
          Reporting Accessibility Issues
        </Typography>
        <FluidContainer flex gap="10px" flexDirection="column" padding="0">
          <Typography as="p">
            If you encounter any accessibility barriers on our website or have
            suggestions for improvement, please contact us at:
          </Typography>
          <FluidContainer flex alignItems="center" padding="0" gap="5px">
            <MdOutlineEmail />
            <Typography as="p">
              <StyledLink
                isExternalLink
                isInverseUnderlineStyling
                href="mailto:graffixwebteam@gmail.com"
              >
                graffixwebteam@gmail.com
              </StyledLink>
            </Typography>
          </FluidContainer>
          <FluidContainer flex alignItems="center" padding="0" gap="5px">
            <FiPhone />
            <Typography as="p">(323) 343&ndash;2464</Typography>
          </FluidContainer>
          <Typography as="p">
            We welcome your feedback and will work to address issues promptly.
          </Typography>
          <Typography as="p">
            For more information about accessibility requirements, visit the
            U.S. Department of Justice ADA regulations page:{' '}
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
    </Page>
  );
}
