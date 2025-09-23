import Head from 'next/head';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FluidContainer, Typography, Divider, Image, Card } from 'components';
import { Colors, Spaces } from 'theme';
import { useBreakpoint } from 'hooks';
import { Page } from 'modules';
import aboutBrand from 'data/aboutBrand.json';
import { Montserrat, Merriweather, Bitter, Roboto } from 'next/font/google';
import cards from 'data/about.json';
import { FaRegCopy } from 'react-icons/fa6';
import { IoIosCheckmark } from 'react-icons/io';

const montserrat = Montserrat({
  weight: ['100', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const bitter = Bitter({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const fontClassByName: Record<string, string> = {
  Roboto: roboto.className,
  Montserrat: montserrat.className,
  Merriweather: merriweather.className,
  Bitter: bitter.className,
  'Akzidenz-Grotesk': roboto.className, // alias → Roboto
};

const SampleP = styled.p<{ $size?: string; $weight?: number }>`
  margin: 0;
  line-height: 1.4;
  font-size: ${({ $size }) => $size ?? '1.125rem'}; /* ~18px */
  font-weight: ${({ $weight }) => $weight ?? 400};
`;

const SampleLabel = styled.p`
  margin: 0 0 4px 0;
  line-height: 1.2;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: ${Colors.black};
  text-transform: uppercase;
`;

const SampleLabelBold = styled(SampleLabel)`
  font-weight: 700;
`;

const getFontClass = (name: string) => fontClassByName[name] ?? '';

const RoundedFluidContainer = styled(FluidContainer)`
  border-radius: 8px; /* or use your theme token */
  overflow: hidden; /* optional, ensures children respect rounding */
`;

const RoundedWrapper = styled.div`
  border: 1px solid ${Colors.greyLighter};
  border-radius: 8px;
  overflow: hidden; /* optional if you want children clipped */
  padding: ${Spaces.md};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const MainContent = styled(FluidContainer)`
  display: flex;
  align-items: flex-start;
  gap: ${Spaces.xl};
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: ${Spaces.lg};
    margin-top: 0;
  }
`;

const TOCWrapper = styled.aside`
  flex: 0 0 250px;
  position: sticky;
  top: 100px;
  align-self: flex-start;

  @media (max-width: 1024px) {
    position: static;
    width: 100%;
  }
`;

const TOC = styled.nav`
  background: ${Colors.white};
  border: 1px solid ${Colors.greyLighter};
  border-radius: 8px;
  padding: ${Spaces.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TOCList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TOCItem = styled.li<{ active?: boolean }>`
  margin: 0 0 ${Spaces.sm} 0;
`;

const TOCLink = styled.a<{ $active?: boolean }>`
  display: block;
  padding: ${Spaces.sm};
  color: ${({ $active }) => ($active ? Colors.black : Colors.black)};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  background-color: ${({ $active }) =>
    $active ? Colors.pastelYellow : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${Colors.pastelYellow};
    color: ${Colors.black};
  }
`;

const Section = styled.section`
  margin-bottom: ${Spaces['2xl']};
  scroll-margin-top: 20px;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${Spaces.lg};
  margin: ${Spaces.lg} 0;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const ColorSwatch = styled.div`
  border: 1px solid ${Colors.greyLighter};
  border-radius: 8px;
  overflow: hidden;
  background: ${Colors.white};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* subtle shadow */
`;

const ColorPreview = styled.div<{ color: string }>`
  height: 80px;
  background-color: ${(props) => props.color};
  position: relative;
`;

const ColorInfo = styled.div`
  padding: ${Spaces.md};
  display: flex;
  flex-direction: column;
`;

const ColorValue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${Spaces.xs} 0;
  font-family: monospace;
  font-size: 0.875rem;
`;

const CopyButton = styled.button`
  background: none;
  border: 1px solid ${Colors.black};
  padding: 2px 6px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.75rem;

  &:hover {
    background-color: ${Colors.black};
    color: ${Colors.white};
  }
`;

const GuidelineCallout = styled.div`
  background-color: #fff8e1;
  border: 1px solid ${Colors.primary};
  padding: ${Spaces.md};
  margin: ${Spaces.lg} 0;
  border-radius: 8px;
`;

const LocationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: ${Spaces.lg};
  margin: ${Spaces.lg} 0;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const LocationCard = styled.div`
  border: 1px solid ${Colors.greyLighter};
  border-radius: 8px;
  padding: ${Spaces.lg};
  background: ${Colors.white};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  gap: ${Spaces.md};
  margin: ${Spaces.lg} 0;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SocialCard = styled.div<{ $copied?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${Spaces.sm};
  padding: ${Spaces.md};
  border: 1px solid ${Colors.greyLighter};
  border-radius: 8px;
  background: ${({ $copied }) => ($copied ? '#e6f9e6' : Colors.white)};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* subtle shadow */
  width: 250px;
  &:hover {
    background: ${({ $copied }) => ($copied ? '#e6f9e6' : Colors.greyLightest)};
    border-color: ${Colors.greyLighter};
  }

  &:focus {
    outline: 2px solid ${Colors.primary};
    outline-offset: 2px;
  }
`;

const CopyHint = styled.span`
  font-size: 0.75rem;
  color: ${Colors.grey};
`;

export default function Brand() {
  const { sections, colors, fonts, locations, socialMedia } = aboutBrand;
  const [activeSection, setActiveSection] = useState('brand');
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const { isMobile, isDesktop } = useBreakpoint();

  type HeaderWithDividerProps = { text: string };

  const HeaderWithDivider: React.FC<HeaderWithDividerProps> = ({ text }) => (
    <>
      <Typography as="h2" variant="title" size="2xl" weight="600" color="black">
        {text}
      </Typography>
      <Divider margin="0 0 24px 0" color="primary" size="5px" />
    </>
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(text);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    // Keep DOM order
    const ordered = [...els].sort((a, b) => a.offsetTop - b.offsetTop);

    const onScroll = () => {
      const triggerY = window.scrollY + window.innerHeight * 0.5;

      // “Last section whose top is above the trigger line”
      let current = ordered[0]?.id ?? '';
      for (const el of ordered) {
        if (el.offsetTop <= triggerY) current = el.id;
        else break;
      }
      if (current && current !== activeSection) setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  return (
    <Page>
      <Head>
        <title>U&ndash;SU Brand Guidelines</title>
        <meta
          name="description"
          content="Official brand guidelines for the University-Student Union (U&ndash;SU) at Cal State LA — logos, colors, typography, voice, and usage examples for consistent communications."
        />
        <meta name="author" content="University-Student Union, Cal State LA" />
        <meta
          name="keywords"
          content="U-SU brand guidelines, Cal State LA, California State University Los Angeles, CSULA, student union, Cal State LA U-SU, Cal State LA University Student Union, U-SU logo, U-SU colors, typography, brand voice, accessibility"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:title" content="U&ndash;SU Brand Guidelines" />
        <meta
          property="og:description"
          content="Logos, colors, typography, and voice for the University-Student Union (U&ndash;SU) at Cal State LA."
        />
        <meta
          property="og:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/brand/usu_logo_measurements.webp"
        />
        <meta
          property="og:url"
          content="https://usu.calstatela.edu/about/brand"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="U&ndash;SU Brand Guidelines" />
        <meta
          name="twitter:description"
          content="Official guidelines for U-SU brand usage at Cal State LA."
        />
        <meta
          name="twitter:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/brand/usu_logo_measurements.webp"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'U–SU Brand Guidelines',
              description:
                'Official brand guidelines for the University-Student Union (U–SU) at Cal State LA — logos, colors, typography, voice, and usage examples.',
              url: 'https://usu.calstatela.edu/about/brand',
              publisher: {
                '@type': 'Organization',
                name: 'University-Student Union, Cal State LA',
                url: 'https://usu.calstatela.edu',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan/usu-dark-logo.webp',
                },
              },
              inLanguage: 'en-US',
            }),
          }}
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContent>
        <TOCWrapper>
          <TOC role="navigation" aria-label="Table of contents">
            <Typography
              as="h2"
              variant="title"
              size="lg"
              weight="700"
              margin="0 0 16px 0"
            >
              Table of Contents
            </Typography>
            <TOCList>
              {sections.map((section) => (
                <TOCItem key={section.id}>
                  <TOCLink
                    href={`#${section.id}`}
                    $active={activeSection === section.id}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(section.id)
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {section.title}
                  </TOCLink>
                </TOCItem>
              ))}
            </TOCList>
          </TOC>
        </TOCWrapper>

        <FluidContainer id="main-content" padding="0">
          <RoundedFluidContainer
            flex
            flexDirection="column"
            backgroundColor="primary"
            alignItems="center"
            margin="0 0 24px 0"
          >
            <Typography variant="title" size="4xl" as="h1">
              U&ndash;SU Brand Guidelines
            </Typography>
            <Typography
              as="p"
              variant="span"
              size={isMobile ? 'sm' : 'lg'}
              lineHeight="1.6"
              margin="0 0 24px 0"
              style={{ textAlign: 'center' }}
            >
              The University&ndash;Student Union (U&ndash;SU) brand at Cal State
              LA represents community, connection, and growth. To maintain a
              consistent and recognizable brand across all our communications
              and materials, please follow these simple guidelines. These
              instructions are designed for non-designers to ensure you&apos;re
              using the U&ndash;SU&apos;s visual and written elements correctly.
            </Typography>
          </RoundedFluidContainer>

          <Section id="branding">
            <HeaderWithDivider text="What is branding?" />
            <Typography
              as="p"
              variant="span"
              size={isMobile ? 'sm' : 'md'}
              lineHeight="1.6"
              margin="0 0 24px 0"
            >
              Branding is more than just a logo or a color
              scheme&mdash;it&apos;s the entire identity, experience, and
              reputation of an organization. It&apos;s how people feel and
              connect with the brand, whether through visuals, messaging, or the
              experiences they have with it.
            </Typography>
            <Typography
              as="p"
              variant="span"
              size={isMobile ? 'sm' : 'md'}
              lineHeight="1.6"
              weight="700"
            >
              For the University-Student Union (U&ndash;SU) at Cal State LA,
              branding is about:
            </Typography>
            <List>
              <li>
                <Typography as="p" variant="span" size="md">
                  Creating a recognizable identity for students, staff, and the
                  university.
                </Typography>
              </li>
              <li>
                <Typography as="p" variant="span" size="md">
                  Setting a tone that feels welcoming, inclusive, and
                  empowering.
                </Typography>
              </li>
              <li>
                <Typography as="p" variant="span" size="md">
                  Ensuring consistency across everything from event flyers to
                  social media to in&ndash;person experiences.
                </Typography>
              </li>
              <li>
                <Typography as="p" variant="span" size="md">
                  Creating a recognizable identity for students, staff, and the
                  university.
                </Typography>
              </li>
            </List>
            <Typography
              as="p"
              variant="span"
              size={isMobile ? 'sm' : 'md'}
              lineHeight="1.6"
              weight="700"
            >
              Let&apos;s explore the University&ndash;Student Union brand and
              how it creates a strong, connected campus experience.
            </Typography>
          </Section>

          <Section id="mission">
            <HeaderWithDivider text="Mission, Vision, and Values" />
            <FluidContainer
              padding="0"
              margin="0 0 32px 0"
              flex
              flexDirection="column"
            >
              <Typography as="h3" variant="title" size="xl" weight="600">
                Market Pitch
              </Typography>
              <Typography
                as="p"
                variant="span"
                size={isMobile ? 'sm' : 'md'}
                lineHeight="1.6"
                margin="0 0 24px 0"
              >
                The University&ndash;Student Union (U&ndash;SU) is your campus
                hub for connection, growth, and success. From recreation and
                events to leadership opportunities and essential resources, the
                U&ndash;SU empowers students and partners alike to create a
                thriving campus experience. Your place, your future, your
                U&ndash;SU. Ready to get involved and make the most of your
                student experience? Visit U&ndash;SU today and start exploring!
              </Typography>
              <Typography as="h3" variant="title" size="xl" weight="600">
                Mission
              </Typography>
              <Typography
                as="p"
                variant="span"
                size={isMobile ? 'sm' : 'md'}
                lineHeight="1.6"
                margin="0 0 24px 0"
              >
                With open doors and minds, we provide space and opportunities,
                enabling Golden Eagles to soar.
              </Typography>

              <Typography as="h3" variant="title" size="xl" weight="600">
                Vision
              </Typography>
              <Typography
                as="p"
                variant="span"
                size={isMobile ? 'sm' : 'md'}
                lineHeight="1.6"
                margin="0 0 24px 0"
              >
                The vision of the U&ndash;SU is to become the central hub for
                connection and growth.
              </Typography>

              <Typography as="h3" variant="title" size="xl" weight="600">
                Core Values
              </Typography>

              <FluidContainer
                flex
                flexWrap="wrap"
                justifyContent="center"
                padding="0"
              >
                {cards.map((props) => (
                  <Card
                    key={props.title}
                    {...props}
                    width={isDesktop ? '100%' : 'calc(33.33% - 24px)'}
                    topBorder
                    margin="16px 8px"
                    iconWidth="112px"
                  />
                ))}
              </FluidContainer>
            </FluidContainer>
          </Section>

          <Section id="logo">
            <HeaderWithDivider text="Logo Usage" />

            <FluidContainer
              padding="0"
              margin="0 0 24px 0"
              flex
              flexDirection="column"
            >
              <GuidelineCallout>
                <FluidContainer flex flexDirection="column" padding="0">
                  <Typography
                    as="h3"
                    variant="span"
                    size={isMobile ? 'sm' : 'md'}
                    lineHeight="1.6"
                    weight="700"
                  >
                    Always use the official U&ndash;SU Logo
                  </Typography>
                  <Typography
                    as="p"
                    variant="span"
                    size={isMobile ? 'sm' : 'md'}
                    lineHeight="1.6"
                    margin="0"
                  >
                    Use as provided by the marketing department. This includes
                    the full name or acronym, both requires a hyphen.
                  </Typography>
                  <Typography
                    as="h3"
                    variant="span"
                    size="md"
                    lineHeight="1.6"
                    weight="700"
                  >
                    • University&ndash;Student Union
                    <br />• U&ndash;SU
                  </Typography>
                </FluidContainer>
              </GuidelineCallout>

              <Typography as="h3" variant="title" size="xl" weight="600">
                Correct Placement
              </Typography>
              <Typography
                as="p"
                variant="span"
                size="md"
                lineHeight="1.6"
                margin="0 0 16px 0"
              >
                The logo should always have space around it so that it&aspos;s
                clearly visible and not crowded by other elements. Avoid placing
                it on busy or patterned backgrounds.
              </Typography>

              <Typography as="h3" variant="title" size="xl" weight="600">
                Color Variation
              </Typography>
              <Typography
                as="p"
                variant="span"
                size="md"
                lineHeight="1.6"
                margin="0 0 16px 0"
              >
                Use the correct logo for light or dark backgrounds. If unsure,
                use the standard color version for light backgrounds and the
                white version for dark backgrounds.
              </Typography>
              <Typography
                as="p"
                variant="span"
                size="md"
                lineHeight="1.6"
                margin="0 0 16px 0"
                weight="700"
              >
                If you need access to the logo files, contact the Graffix team.
              </Typography>
              <Typography as="h3" variant="title" size="xl" weight="600">
                Do Not
              </Typography>
              <Typography variant="span" size="md" lineHeight="1.6" margin="0">
                • Stretch, rotate, or modify the logo in any way.
                <br />• Use any colors other than the official yellow, black,
                and light grey.
              </Typography>
            </FluidContainer>
            <FluidContainer
              padding="0"
              flex
              flexDirection={isMobile ? 'column' : 'row'}
              justifyContent="flex-start"
            >
              <FluidContainer backgroundColor="black">
                <Image
                  src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/brand/usu_logo_white.webp"
                  alt="USU logo white"
                  width="100%"
                  maxWidth={'500px'}
                />
              </FluidContainer>
              <FluidContainer backgroundColor="greyLighter">
                <Image
                  src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan/usu-dark-logo.webp"
                  alt="USU logo black"
                  width="100%"
                  maxWidth={'500px'}
                />
              </FluidContainer>
            </FluidContainer>
            <FluidContainer>
              <Image
                src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/brand/usu_logo_measurements.webp"
                alt="USU logo black with measurements"
                width="100%"
                maxWidth={'1000px'}
              />
            </FluidContainer>
          </Section>

          <Section id="colors">
            <HeaderWithDivider text="Color Palette" />
            <FluidContainer padding="0" margin="0 0 24px 0">
              <Typography
                as="p"
                variant="copy"
                size="lg"
                lineHeight="1.6"
                margin="0 0 24px 0"
              >
                Stick to the official U&ndash;SU colors to keep all
                communications consistent. When creating any documents,
                presentations, or emails, use these colors as much as possible.
              </Typography>

              <ColorGrid>
                {colors.map((color) => (
                  <ColorSwatch key={color.name}>
                    <ColorPreview color={color.hex} />
                    <ColorInfo>
                      <Typography
                        as="h3"
                        variant="labelTitle"
                        weight="700"
                        margin="0 0 12px 0"
                      >
                        {color.name}
                      </Typography>
                      <Typography
                        as="p"
                        variant="span"
                        size="sm"
                        lineHeight="1.4"
                        margin="0 0 12px 0"
                      >
                        {color.usage}
                      </Typography>

                      <ColorValue>
                        <Typography as="span" variant="span" size="xs">
                          HEX: {color.hex}
                        </Typography>
                        <CopyButton onClick={() => copyToClipboard(color.hex)}>
                          {copiedValue === color.hex ? '✓' : 'Copy'}
                        </CopyButton>
                      </ColorValue>

                      <ColorValue>
                        <Typography as="span" variant="span" size="xs">
                          RGB: {color.rgb}
                        </Typography>
                        <CopyButton onClick={() => copyToClipboard(color.rgb)}>
                          {copiedValue === color.rgb ? '✓' : 'Copy'}
                        </CopyButton>
                      </ColorValue>

                      <ColorValue>
                        <Typography as="span" variant="span" size="xs">
                          CMYK: {color.cmyk}
                        </Typography>
                        <CopyButton onClick={() => copyToClipboard(color.cmyk)}>
                          {copiedValue === color.cmyk ? '✓' : 'Copy'}
                        </CopyButton>
                      </ColorValue>

                      <ColorValue>
                        <Typography as="span" variant="span" size="xs">
                          HSL: {color.hsl}
                        </Typography>
                        <CopyButton onClick={() => copyToClipboard(color.hsl)}>
                          {copiedValue === color.hsl ? '✓' : 'Copy'}
                        </CopyButton>
                      </ColorValue>
                    </ColorInfo>
                  </ColorSwatch>
                ))}
              </ColorGrid>
            </FluidContainer>
          </Section>

          <Section id="typography">
            <HeaderWithDivider text="Typography" />

            <FluidContainer padding="0">
              <Typography
                as="p"
                variant="copy"
                size="lg"
                lineHeight="1.6"
                margin="0 0 16px 0"
              >
                Use these fonts in your documents, emails, and presentations
              </Typography>

              <GuidelineCallout>
                <Typography
                  as="p"
                  variant="span"
                  size={isMobile ? 'sm' : 'md'}
                  lineHeight="1.6"
                  margin="0"
                >
                  Contact the Graffix department for more information on how to
                  access, install, or utilize these fonts.
                </Typography>
              </GuidelineCallout>

              {fonts.map((font) => {
                const fontClass = getFontClass(font.name);

                return (
                  <FluidContainer key={font.name}>
                    {/* Keep your heading however you like; if Typography forces a family, wrap only the name */}
                    <Typography as="h3" variant="title" size="xl" weight="600">
                      <span className={fontClass}>{font.name}</span>
                      {font.isPaid && ' (PAID FONT)'}
                      <Typography
                        as="span"
                        variant="span"
                        size="sm"
                        weight="600"
                        color="grey"
                        margin="0 0 0 8px"
                      >
                        - {font.type}
                      </Typography>
                    </Typography>

                    <RoundedWrapper>
                      {/* LIGHT */}
                      <FluidContainer
                        padding={`${Spaces.sm} ${Spaces.md}`}
                        flex
                        flexDirection="column"
                      >
                        <SampleLabel>Light</SampleLabel>
                        <SampleP
                          className={fontClass}
                          $size="1.125rem"
                          $weight={300}
                        >
                          A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                          <br />a b c d e f g h i j k l m n o p q r s t u v w x
                          y z
                        </SampleP>
                      </FluidContainer>

                      {/* BOLD */}
                      <FluidContainer
                        padding={`${Spaces.sm} ${Spaces.md}`}
                        flex
                        flexDirection="column"
                      >
                        <SampleLabelBold>Bold</SampleLabelBold>
                        <SampleP
                          className={fontClass}
                          $size="1.125rem"
                          $weight={700}
                        >
                          A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                          <br />a b c d e f g h i j k l m n o p q r s t u v w x
                          y z
                        </SampleP>
                      </FluidContainer>
                    </RoundedWrapper>

                    {/* descriptions can stay as Typography since font choice isn't critical there */}
                    <Typography
                      as="p"
                      variant="span"
                      size="md"
                      lineHeight="1.6"
                      margin="16px 0 0 0"
                    >
                      {font.description}
                    </Typography>
                    <Typography
                      as="p"
                      variant="span"
                      size="md"
                      lineHeight="1.6"
                      margin="8px 0 0 0"
                    >
                      {font.usage}
                    </Typography>
                  </FluidContainer>
                );
              })}
            </FluidContainer>
          </Section>

          <Section id="locations">
            <HeaderWithDivider text="U-SU Location Directory" />

            <FluidContainer padding="0" margin="0 0 24px 0">
              <Typography
                as="p"
                variant="copy"
                size="lg"
                lineHeight="1.6"
                margin="0 0 24px 0"
              >
                The University&ndash;Student Union (U&ndash;SU) building at Cal
                State LA offers various resources and spaces that foster
                community involvement, student support, and engagement. Use the
                following directory when referencing specific locations in
                communications.
              </Typography>

              <LocationGrid>
                {locations.map((location) => (
                  <LocationCard key={location.floor}>
                    <Typography as="h3" variant="title" size="xl" weight="600">
                      {location.floor}
                    </Typography>
                    <Divider margin="0 0 16px 0" color="primary" size="3px" />
                    <FluidContainer padding="0" flex flexDirection="column">
                      {location.spaces.map((space, index) => {
                        if (typeof space === 'string') {
                          return (
                            <Typography
                              key={index}
                              as="p"
                              variant="span"
                              size="md"
                              lineHeight="1.4"
                              margin="0 0 8px 0"
                            >
                              • {space}
                            </Typography>
                          );
                        }

                        // If the item is an object with subRooms
                        return (
                          <div key={index}>
                            <Divider margin="0 0 16px 0" size="5px" />
                            {space.subRooms.map((sub, subIndex) => (
                              <FluidContainer
                                padding="0"
                                flex
                                flexDirection="column"
                                key={subIndex}
                              >
                                <Typography
                                  as="p"
                                  variant="span"
                                  size="md"
                                  lineHeight="1.4"
                                  weight="600"
                                  margin="0 0 4px 10px"
                                >
                                  {sub.name}
                                </Typography>
                                <Typography
                                  key={subIndex}
                                  as="p"
                                  variant="span"
                                  size="md"
                                  lineHeight="1.4"
                                  margin="0 0 4px 10px"
                                >
                                  {sub.alt}
                                </Typography>
                              </FluidContainer>
                            ))}
                          </div>
                        );
                      })}
                    </FluidContainer>
                  </LocationCard>
                ))}
              </LocationGrid>
            </FluidContainer>
          </Section>

          <Section id="voice">
            <HeaderWithDivider text="Brand Voice and Messaging" />

            <FluidContainer padding="0" flex flexDirection="column">
              <Typography as="h3" variant="title" size="xl" weight="600">
                Tone of Voice
              </Typography>
              <FluidContainer padding="0" margin="0 0 32px 0">
                <Typography as="h4" variant="title" size="md" weight="600">
                  Friendly and Approachable
                </Typography>
                <Typography
                  as="p"
                  variant="span"
                  size={isMobile ? 'sm' : 'md'}
                  lineHeight="1.6"
                  margin="0 0 16px 0"
                >
                  The U&ndash;SU welcomes everyone with open doors and minds.
                  Communications should feel conversational, friendly, and
                  professional.
                </Typography>

                <Typography as="h4" variant="title" size="md" weight="600">
                  Supportive and Empowering
                </Typography>
                <Typography
                  as="p"
                  variant="span"
                  size={isMobile ? 'sm' : 'md'}
                  lineHeight="1.6"
                  margin="0 0 16px 0"
                >
                  All messaging should inspire students and faculty to get
                  involved, highlighting the U&ndash;SU as a place where growth
                  happens and opportunities abound.
                </Typography>

                <Typography as="h4" variant="title" size="md" weight="600">
                  Clear and Inclusive
                </Typography>
                <Typography
                  as="p"
                  variant="span"
                  size={isMobile ? 'sm' : 'md'}
                  lineHeight="1.6"
                  margin="0 0 16px 0"
                >
                  Avoid jargon and overly complex language. The tone should make
                  everyone feel represented and understood, creating a sense of
                  belonging.
                </Typography>
              </FluidContainer>

              <Typography as="h3" variant="title" size="xl" weight="600">
                Messaging Examples
              </Typography>

              <FluidContainer padding="0" flex flexDirection="column">
                <Typography as="h4" variant="title" size="md" weight="600">
                  Event Promotions
                </Typography>
                <Typography
                  as="p"
                  variant="span"
                  size={isMobile ? 'sm' : 'md'}
                  lineHeight="1.6"
                  margin="0 0 16px 0"
                >
                  &quot;Get ready for a week full of exciting activities at the
                  U&ndash;SU! Whether you&apos;re looking to relax, connect, or
                  learn, we&apos;ve got something for you.&quot;
                </Typography>

                <Typography as="h4" variant="title" size="md" weight="600">
                  Informational Content
                </Typography>
                <Typography
                  as="p"
                  variant="span"
                  size={isMobile ? 'sm' : 'md'}
                  lineHeight="1.6"
                  margin="0 0 16px 0"
                >
                  &quot;The U&ndash;SU is here for you! Need a place to study,
                  grab a bite, or meet new people? Stop by anytime we&apos;re
                  open with opportunities for everyone.&quot;
                </Typography>

                <Typography as="h4" variant="title" size="md" weight="600">
                  Call&ndash;to&ndash;Actions
                </Typography>
                <Typography
                  as="p"
                  variant="span"
                  size={isMobile ? 'sm' : 'md'}
                  lineHeight="1.6"
                  margin="0 0 16px 0"
                >
                  &quot;Join the U&ndash;SU today and be part of something
                  bigger. From leadership roles to fun events, there&apos;s a
                  place for you here.&quot;
                </Typography>
                <Typography as="h3" variant="title" size="xl" weight="600">
                  Taglines
                </Typography>
                <Typography
                  as="p"
                  variant="span"
                  size={isMobile ? 'sm' : 'md'}
                  lineHeight="1.6"
                  margin="0 0 8px 0"
                >
                  Simple, impactful taglines that reflect the U&ndash;SU&apos;s
                  mission and values
                </Typography>
              </FluidContainer>

              <FluidContainer padding="0" flex flexDirection="column">
                <Typography
                  as="h4"
                  variant="span"
                  size={isMobile ? 'md' : 'lg'}
                  lineHeight="1.6"
                  margin="0 0 8px 0"
                  weight="600"
                >
                  &quot;Where Connections Take Flight&quot;
                </Typography>
                <Typography
                  as="h4"
                  variant="span"
                  size={isMobile ? 'md' : 'lg'}
                  lineHeight="1.6"
                  margin="0 0 8px 0"
                  weight="600"
                >
                  &quot;Empowering Golden Eagles Every Day&quot;
                </Typography>
                <Typography
                  as="h4"
                  variant="span"
                  size={isMobile ? 'md' : 'lg'}
                  lineHeight="1.6"
                  margin="0"
                  weight="600"
                >
                  &quot;The Heart of Campus Life at Cal State LA&quot;
                </Typography>
              </FluidContainer>
            </FluidContainer>
          </Section>

          <Section id="social">
            <HeaderWithDivider text="Social Media" />

            <FluidContainer padding="0">
              <SocialGrid>
                {socialMedia.map((social) => (
                  <SocialCard
                    key={social.department}
                    onClick={() => copyToClipboard(social.handle)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        copyToClipboard(social.handle);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    $copied={copiedValue === social.handle}
                  >
                    <FluidContainer
                      padding="0"
                      flex
                      flexDirection="column"
                      alignItems="flex-start"
                      gap="8px"
                    >
                      <Typography as="h3" variant="labelTitle" weight="700">
                        {social.department}
                      </Typography>
                      <Typography as="p" variant="span" size="sm" color="grey">
                        {social.handle}
                      </Typography>
                    </FluidContainer>
                    <CopyHint>
                      {copiedValue === social.handle ? (
                        <IoIosCheckmark color="green" size={'40px'} />
                      ) : (
                        <FaRegCopy color={Colors.greyLighter} size={'20px'} />
                      )}
                    </CopyHint>
                  </SocialCard>
                ))}
              </SocialGrid>
            </FluidContainer>
          </Section>

          <Section id="final_thoughts">
            <HeaderWithDivider text="Final Thoughts and Brand Consistency" />
            <Typography
              as="p"
              variant="span"
              size={isMobile ? 'sm' : 'md'}
              lineHeight="1.6"
              margin="0 0 24px 0"
            >
              To ensure that the U&ndash;SU brand remains cohesive,
              recognizable, and impactful across all materials
            </Typography>
            <FluidContainer
              padding="0"
              margin="0 0 32px 0"
              flex
              flexDirection={isMobile ? 'column' : 'row'}
              alignItems="flex-start"
              gap="20px"
            >
              <FluidContainer padding="0">
                <Typography as="h3" variant="title" size="lg" weight="600">
                  Consistency
                </Typography>
                <Typography
                  as="p"
                  variant="span"
                  size={isMobile ? 'sm' : 'md'}
                  lineHeight="1.6"
                  margin="0 0 24px 0"
                >
                  Always adhere to these guidelines when creating materials that
                  revolves around the U&ndash;SU, whether it&apos;s a flyer,
                  digital post, or promotional contents.
                </Typography>
              </FluidContainer>
              <FluidContainer padding="0">
                <Typography as="h3" variant="title" size="lg" weight="600">
                  Feedback
                </Typography>
                <Typography
                  as="p"
                  variant="span"
                  size={isMobile ? 'sm' : 'md'}
                  lineHeight="1.6"
                  margin="0 0 24px 0"
                >
                  Regularly encourage team members to provide input to ensure
                  the guidelines are adaptable to all applications while
                  maintaining core brand values.
                </Typography>
              </FluidContainer>
              <FluidContainer padding="0">
                <Typography as="h3" variant="title" size="lg" weight="600">
                  The U&ndash;SU Brand
                </Typography>
                <Typography
                  as="p"
                  variant="span"
                  size={isMobile ? 'sm' : 'md'}
                  lineHeight="1.6"
                  margin="0 0 24px 0"
                >
                  Remember that the U&ndash;SU brand is more than just logos and
                  fonts—it&apos;s about fostering a vibrant, inclusive, and
                  connected community at Cal State LA.
                </Typography>
              </FluidContainer>
            </FluidContainer>
            <FluidContainer
              padding="0"
              flex
              flexDirection={isMobile ? 'column' : 'row'}
            >
              <FluidContainer padding="0">
                <Typography
                  as="p"
                  variant="span"
                  size={isMobile ? 'sm' : 'md'}
                  lineHeight="1.6"
                  margin="0 0 24px 0"
                >
                  We are always open to new ideas, questions or concerns about
                  our brand. <br />
                  Please stop by for a quick chat or set a meeting, we are here
                  to collaborate. <br /> It&apos;s our personality as an
                  organization.
                </Typography>
              </FluidContainer>
            </FluidContainer>
          </Section>
        </FluidContainer>
      </MainContent>
    </Page>
  );
}
