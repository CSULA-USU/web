import Head from 'next/head';
import styled from 'styled-components';
import { BiPlus } from 'react-icons/bi';
import RecData from '../../data/recreation.json';
import { Colors, FontSizes, Spaces } from 'theme';
import {
  AnchorNav,
  AutoGrid,
  Button,
  Card,
  CitedStat,
  Divider,
  Expandable,
  Eyebrow,
  FacilityCard,
  FluidContainer,
  Icon,
  Image,
  Panel,
  StyledLink,
  TapTarget,
  Typography,
  VisuallyHidden,
} from 'components';
import { Page, UtilityHeroHeader } from 'modules';
import { NonDiscriminationPolicy, PhotoVideoDisclaimer } from 'partials';
import { Component as InstagramFeed } from 'sections/InstagramFeed/InstagramFeed';

const MEMBERSHIP_HREF = '/recreation/membership';
const POLICIES_HREF =
  'https://www.dropbox.com/scl/fi/77otth0tcc69v2j6yz4lr/USU_Recreation_Facilities_General_Policies_8-19-25.pdf?rlkey=sp0iijyxc83ywk4c1dnnizbur&st=zlnqf6hq&raw=1';

/* Fluid section padding, applied at every breakpoint so the clamp() — not
   FluidContainer's own responsive defaults — governs the rhythm. */
const SECTION_PADDING = 'clamp(56px, 7vw, 96px) clamp(20px, 4vw, 36px)';
const BAND_PADDING = 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 36px)';

/* Matches FluidContainer's own default. Set explicitly because the anchor bar
   has to line its items up with the sections beneath it, and it needs the
   value to do that. */
const CONTENT_MAX_WIDTH = '1440px';

/* Both ends of every clamp land on real FontSizes steps, so no viewport width
   renders type that is off the scale. */
const FLUID_H2 = `clamp(${FontSizes.xl}, 3.8vw, ${FontSizes['2xl']})`;
const FLUID_LEAD = `clamp(${FontSizes.sm}, 1.6vw, ${FontSizes.md})`;

const sectionShell = {
  padding: SECTION_PADDING,
  paddingDesktop: SECTION_PADDING,
  paddingMobile: SECTION_PADDING,
  innerMaxWidth: CONTENT_MAX_WIDTH,
  scrollMarginTop: '84px',
  revealOnScroll: true,
} as const;

const bandShell = {
  padding: BAND_PADDING,
  paddingDesktop: BAND_PADDING,
  paddingMobile: BAND_PADDING,
  innerMaxWidth: CONTENT_MAX_WIDTH,
  scrollMarginTop: '84px',
  revealOnScroll: true,
} as const;

const anchorLinks = [
  { label: 'Facilities', href: '#facilities' },
  { label: 'Access', href: '#access' },
  { label: 'Programs', href: '#programs' },
  { label: 'FAQ', href: '#faq' },
];

const SectionHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.sm};
  max-width: 68ch;
  margin-bottom: ${Spaces.xl};
`;

/* The step number is the card's loudest mark, so it carries the gold rather
   than the heading — one accent per card, and it lands on the ordinal a
   reader uses to keep their place. */
const StepNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${Colors.primary};
  color: ${Colors.black};
  font-weight: 700;
  font-size: ${FontSizes.sm};
`;

const AppCta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${Spaces.md};
  width: 100%;
  padding: clamp(36px, 5vw, 56px) ${Spaces.lg};
  text-align: center;
  border-radius: 12px;
  background: linear-gradient(to right, rgb(255, 244, 200), ${Colors.primary});
`;

/* Icon beside the rule rather than above it: at six rows a stacked icon
   doubles the block's height for no extra clarity, and the eye tracks a
   left-hand column of glyphs faster than it does six centered ones. */
const RuleRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${Spaces.md};

  svg {
    flex: none;
    margin-top: 2px;
    color: ${Colors.gold};
  }
`;

const StoreBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${Spaces.lg};
`;

/* One height for every program image, whatever ratio the artwork arrived in.
   Matched widths would make the tall illustration dwarf the photograph beside
   it; matched heights keep the two cards reading as a pair.

   Photographs fill the frame; illustrations sit inside it whole, because a
   drawing cropped through its subject's head reads as a mistake in a way a
   cropped photograph does not. The frame carries the card's own color so a
   contained image looks placed rather than letterboxed. */
const MediaFrame = styled.div<{ $fit: 'cover' | 'contain' }>`
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${Colors.greyDarker};

  img {
    width: 100%;
    height: 100%;
    object-fit: ${(p) => p.$fit};
  }
`;

const FaqRow = styled.div`
  padding: ${Spaces.md} 0;
`;

export default function Recreation() {
  return (
    <Page>
      <Head>
        <title>U&ndash;SU Recreation</title>

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Get active with Cal State LA Recreation. Access our Fitness Center, Esports Game Room, and wellness programming. Download the Cal State LA Rec app to sign up for classes."
          key="description"
        />
        <meta name="author" content="Recreation" key="author" />
        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="Recreation | Cal State LA University-Student Union"
          key="og-title"
        />
        <meta
          property="og:description"
          content="Enhancing the Golden Eagle experience through play, exercise, and community connection. Visit the Fitness Center or Esports Game Room today."
          key="og-desc"
        />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/recreation"
          key="og-url"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:image"
          content="https://www.calstatelausu.org/departments/recreation/recreation-hero-background.jpg"
          key="og-image"
        />
        <meta
          property="og:image:alt"
          content="Students exercising at the Cal State LA U-SU Recreation Fitness Center"
          key="og-image-alt"
        />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter-card"
        />
        <meta name="twitter:title" content="Recreation | Cal State LA U-SU" />
        <meta
          name="twitter:description"
          content="Access the Fitness Center and Esports Game Room. Stay fit and connected at Cal State LA."
        />
        <meta
          name="twitter:image"
          content="https://www.calstatelausu.org/departments/recreation/recreation-hero-background.jpg"
        />
        <link rel="canonical" href="https://www.calstatelausu.org/recreation" />

        {/* Structured Data for Google/AI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'ExerciseGym',
                  '@id': 'https://www.calstatelausu.org/recreation',
                  name: 'U-SU Recreation',
                  url: 'https://www.calstatelausu.org/recreation',
                  logo: 'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/recreation/RecLogo_4%20INCH%20-%20REC.webp',
                  description:
                    'Cal State LA’s premier fitness and wellness hub, featuring full-service gyms, esports gaming, and residential wellness centers.',
                  email: 'cbalam2@calstatela.edu',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: '5154 State University Dr.',
                    addressLocality: 'Los Angeles',
                    addressRegion: 'CA',
                    postalCode: '90032',
                  },
                  parentOrganization: {
                    '@type': 'EducationalOrganization',
                    name: 'University-Student Union at Cal State LA',
                  },
                  subOrganization: [
                    {
                      '@type': 'HealthClub',
                      name: 'Recreation 1',
                      description:
                        'Full-service fitness center featuring weights, cardio machines, and locker facilities.',
                      location: 'U-SU Basement',
                      telephone: '+13233437546',
                      amenityFeature: [
                        {
                          '@type': 'LocationFeatureSpecification',
                          name: 'Free Weights',
                          value: 'true',
                        },
                        {
                          '@type': 'LocationFeatureSpecification',
                          name: 'Cardio Machines',
                          value: 'true',
                        },
                        {
                          '@type': 'LocationFeatureSpecification',
                          name: 'Lockers',
                          value: 'true',
                        },
                        {
                          '@type': 'LocationFeatureSpecification',
                          name: 'Exercise Classes',
                          value: 'true',
                        },
                      ],
                    },
                    {
                      '@type': 'HealthClub',
                      name: 'Recreation 2',
                      description:
                        'Full-service fitness center featuring weights and cardio machines.',
                      location: 'U-SU Basement',
                      telephone: '+13233432520',
                      amenityFeature: [
                        {
                          '@type': 'LocationFeatureSpecification',
                          name: 'Free Weights',
                          value: 'true',
                        },
                        {
                          '@type': 'LocationFeatureSpecification',
                          name: 'Cardio Machines',
                          value: 'true',
                        },
                        {
                          '@type': 'LocationFeatureSpecification',
                          name: 'Exercise Classes',
                          value: 'true',
                        },
                      ],
                    },
                    {
                      '@type': 'EntertainmentBusiness',
                      name: 'Recreation Esports Game Room',
                      description:
                        'A student gaming hub featuring 8-ball pool, air hockey, foosball, and Nintendo Switch favorites.',
                      location: 'U-SU Room 104',
                      telephone: '+13233436909',
                      amenityFeature: [
                        {
                          '@type': 'LocationFeatureSpecification',
                          name: 'Pool & Table Games',
                          value: '8-ball, Air Hockey, Foosball, Ping-Pong',
                        },
                        {
                          '@type': 'LocationFeatureSpecification',
                          name: 'Video Games',
                          value: 'Super Smash Bros, Mario Party, Mario Kart',
                        },
                      ],
                    },
                    {
                      '@type': 'HealthAndBeautyBusiness',
                      name: 'South Village Housing Wellness Zone',
                      description:
                        'Wellness and activity center for campus residents.',
                      location: 'South Village Housing',
                      telephone: '+13233434856',
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </Head>

      <AnchorNav
        title="Recreation"
        links={anchorLinks}
        ctaLabel="Membership"
        ctaHref={MEMBERSHIP_HREF}
        contentMaxWidth={CONTENT_MAX_WIDTH}
      />

      <UtilityHeroHeader
        src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/recreation/Rec-Hero.webp"
        alt="Cal State LA Recreation Fitness Center with students exercising"
        title="Recreation"
        eyebrow="Play, Wellness, and Connection"
        topScrim
        description="Recreation at Cal State LA provides Golden Eagles with opportunities to play, exercise and engage their campus community through programming and events aimed toward enhancing the experience of all who participate."
      >
        <Button href={MEMBERSHIP_HREF} variant="primary">
          Membership
        </Button>
        <Button href="#facilities" variant="whiteOutline">
          Hours
        </Button>
      </UtilityHeroHeader>

      <FluidContainer backgroundColor="greyDarkest" {...bandShell}>
        <VisuallyHidden as="h2">Recreation by the numbers</VisuallyHidden>
        <Eyebrow
          color="primary"
          accentColor="primary"
          margin={`0 0 ${Spaces.md}`}
        >
          By the numbers
        </Eyebrow>
        <AutoGrid minColumnWidth="240px" gap={Spaces.xl}>
          {RecData.home.stats.map((stat) => (
            <CitedStat
              key={stat.label}
              variant="onDark"
              value={stat.value}
              label={stat.label}
              highlightValue={stat.highlight}
              countTo={stat.countTo}
              formatValue={
                stat.countTo ? (n) => n.toLocaleString('en-US') : undefined
              }
            />
          ))}
        </AutoGrid>
      </FluidContainer>

      <FluidContainer id="facilities" {...sectionShell}>
        <SectionHeader>
          <Eyebrow>Where to go</Eyebrow>
          <Typography as="h2" variant="title" fluidSize={FLUID_H2} margin="0">
            Facilities and hours
          </Typography>
          <Typography as="p" variant="prose" fluidSize={FLUID_LEAD} margin="0">
            Recreation is comprised of the Recreation Fitness Center and
            Recreation Esports. The Recreation Fitness Center is located on the
            basement level of the U&ndash;SU and the Recreation Game Room is
            located on the first floor at room 104. They are open to all
            students, staff and faculty.
          </Typography>
          <Typography as="p" variant="prose" size="xs" margin="0">
            Fall 2026 hours. Call ahead if you are making a special trip — hours
            shift between sessions.
          </Typography>
        </SectionHeader>
        <AutoGrid minColumnWidth="280px" gap={Spaces.lg}>
          {RecData.home.locations.map((location) => (
            <FacilityCard
              key={location.title}
              name={location.title}
              location={location.location}
              phone={location.phone}
              description={location.description}
              hours={location.hours}
              href={location.href}
              linkText={location.linkText}
              titleLines={2}
            />
          ))}
        </AutoGrid>

        <VisuallyHidden as="h3">Inside the fitness centers</VisuallyHidden>
        <AutoGrid
          minColumnWidth="280px"
          gap={Spaces.lg}
          margin={`${Spaces['2xl']} 0 0`}
        >
          {RecData.home.cards.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              titleAs="h4"
              padding={Spaces.lg}
            >
              <Image
                alt={card.alt}
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 624px, 100vw"
                src={card.src}
                srcset={`${card.src} 271w, ${card.desktopSrc} 400w, ${card.tabletSrc} 624w`}
                width="100%"
                borderRadius="8px"
              />
            </Card>
          ))}
        </AutoGrid>
      </FluidContainer>

      <FluidContainer
        backgroundColor="primary"
        {...bandShell}
        textAlign="center"
      >
        <Typography
          as="h2"
          variant="title"
          fluidSize={FLUID_H2}
          color="black"
          margin={`0 0 ${Spaces.md}`}
        >
          Can you get in?
        </Typography>
        <Typography
          as="p"
          variant="prose"
          fluidSize={FLUID_LEAD}
          color="black"
          margin={`0 auto ${Spaces.xl}`}
          style={{ maxWidth: '60ch' }}
        >
          Gym access depends on the kind of Cal State LA student you are. The
          membership page spells out who is covered, what it costs, and how to
          check in at the door.
        </Typography>
        <Button href={MEMBERSHIP_HREF} variant="black">
          Check your membership
        </Button>
      </FluidContainer>

      <FluidContainer
        id="access"
        backgroundColor="greyLightest"
        {...sectionShell}
      >
        <SectionHeader>
          <Eyebrow>Before your first visit</Eyebrow>
          <Typography as="h2" variant="title" fluidSize={FLUID_H2} margin="0">
            Getting started
          </Typography>
        </SectionHeader>
        <AutoGrid minColumnWidth="280px" gap={Spaces.lg}>
          {RecData.home.access.map((step, index) => (
            <Panel key={step.title} rounded padding={Spaces.lg} shadow="soft">
              <div>
                <StepNumber aria-hidden="true">{index + 1}</StepNumber>
                <Typography
                  as="h3"
                  variant="labelTitle"
                  size="md"
                  margin={`${Spaces.md} 0 ${Spaces.sm}`}
                >
                  {step.title}
                </Typography>
                <Typography
                  as="p"
                  variant="copy"
                  size="xs"
                  lineHeight="1.6"
                  margin="0"
                >
                  {step.description}
                </Typography>
              </div>
              {step.href && (
                <Typography as="span" variant="cta" size="xs">
                  <TapTarget>
                    <StyledLink
                      href={step.href}
                      isExternalLink={step.isExternalLink}
                      isInverseUnderlineStyling
                    >
                      {step.linkText}
                    </StyledLink>
                  </TapTarget>
                </Typography>
              )}
            </Panel>
          ))}
        </AutoGrid>
        <Divider
          color="greyLighter"
          size="1px"
          margin={`${Spaces['2xl']} 0 ${Spaces.xl}`}
        />
        <Typography
          as="h3"
          variant="titleSmall"
          size="lg"
          weight="700"
          margin={`0 0 ${Spaces.lg}`}
        >
          What to know before you walk in
        </Typography>
        <AutoGrid minColumnWidth="300px" gap={Spaces.lg}>
          {RecData.home.rules.map((rule) => (
            <RuleRow key={rule.title}>
              <Icon iconName={rule.iconName} size="28px" />
              <div>
                <Typography
                  as="h4"
                  variant="labelTitle"
                  size="sm"
                  margin={`0 0 ${Spaces.xs}`}
                >
                  {rule.title}
                </Typography>
                <Typography
                  as="p"
                  variant="copy"
                  size="xs"
                  lineHeight="1.6"
                  margin="0"
                >
                  {rule.description}
                </Typography>
              </div>
            </RuleRow>
          ))}
        </AutoGrid>
        <Typography
          as="p"
          variant="copy"
          size="xs"
          lineHeight="1.6"
          margin={`${Spaces.xl} 0 0`}
        >
          Recreation is tobacco&ndash;free: no smoking, vaping, or alcohol.
          Service animals only. Personal training is for certified Recreation
          instructors and staff. The{' '}
          <StyledLink
            href={POLICIES_HREF}
            isExternalLink
            isInverseUnderlineStyling
          >
            full facility policies
          </StyledLink>{' '}
          cover everything else.
        </Typography>
      </FluidContainer>

      <FluidContainer
        id="programs"
        backgroundColor="greyDarkest"
        {...sectionShell}
      >
        <SectionHeader>
          <Eyebrow color="primary" accentColor="primary">
            More than the weight room
          </Eyebrow>
          <Typography
            as="h2"
            variant="title"
            fluidSize={FLUID_H2}
            color="white"
            margin="0"
          >
            Programs
          </Typography>
        </SectionHeader>
        <AutoGrid minColumnWidth="320px" gap={Spaces.lg}>
          {RecData.home.programs.map((program) => (
            <Panel
              key={program.title}
              backgroundColor="greyDarker"
              rounded
              padding={Spaces.lg}
              shadow="none"
            >
              <div>
                <MediaFrame
                  $fit={program.fit === 'contain' ? 'contain' : 'cover'}
                >
                  <Image src={program.src} alt={program.alt} width="100%" />
                </MediaFrame>
                <Typography
                  as="h3"
                  variant="titleSmall"
                  size="lg"
                  weight="700"
                  lineHeight="1.3"
                  color="white"
                  margin={`${Spaces.md} 0 ${Spaces.sm}`}
                >
                  {program.title}
                </Typography>
                <Typography
                  as="p"
                  variant="copy"
                  size="xs"
                  lineHeight="1.6"
                  color="greyLighter"
                  margin="0"
                >
                  {program.description}
                </Typography>
              </div>
              <Typography as="span" variant="cta" size="xs" color="primary">
                <TapTarget>
                  <StyledLink
                    href={program.href}
                    isExternalLink={program.isExternalLink}
                    isInverseUnderlineStyling
                  >
                    {program.linkText}
                  </StyledLink>
                </TapTarget>
              </Typography>
            </Panel>
          ))}
        </AutoGrid>
      </FluidContainer>

      <FluidContainer {...sectionShell}>
        <AppCta>
          <Typography
            as="h2"
            variant="title"
            fluidSize={FLUID_H2}
            color="black"
            lineHeight="1.3"
            margin="0"
          >
            Get the Recreation app
          </Typography>
          <Typography
            as="p"
            variant="prose"
            fluidSize={FLUID_LEAD}
            color="black"
            margin={`0 0 ${Spaces.sm}`}
            style={{ maxWidth: '52ch' }}
          >
            Sign up for workout classes and check in at our facilities, free on
            iOS and Android.
          </Typography>
          <StoreBadges>
            <StyledLink href="https://apps.apple.com/us/app/cal-state-la-recreation/">
              <Image
                src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/recreation/App_Store_Badge.webp"
                alt="Download on the App Store"
                width={150}
              />
            </StyledLink>
            <StyledLink href="https://play.google.com/store/apps/details?id=com.innosoftfusiongo.californiastateuniversitylosangeles&pcampaignid=web_share">
              <Image
                src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/recreation/Google_Play_Store_badge.webp"
                alt="Get it on Google Play"
                width={150}
              />
            </StyledLink>
          </StoreBadges>
        </AppCta>
      </FluidContainer>

      <FluidContainer
        id="faq"
        backgroundColor="greyLightest"
        {...sectionShell}
        innerMaxWidth="900px"
      >
        <SectionHeader>
          <Eyebrow>Common questions</Eyebrow>
          <Typography as="h2" variant="title" fluidSize={FLUID_H2} margin="0">
            FAQ
          </Typography>
        </SectionHeader>
        {RecData.home.faq.map((item, index) => (
          <FaqRow key={item.question}>
            {index > 0 && (
              <Divider
                color="greyLighter"
                size="1px"
                margin={`0 0 ${Spaces.lg}`}
              />
            )}
            <Expandable
              indicator={<BiPlus size={24} />}
              indicatorRotation="45deg"
              header={
                <Typography
                  as="h3"
                  variant="titleSmall"
                  size="md"
                  weight="700"
                  lineHeight="1.3"
                >
                  {item.question}
                </Typography>
              }
            >
              <Typography
                as="p"
                variant="copy"
                size="xs"
                lineHeight="1.6"
                margin={`${Spaces.sm} 0 0`}
              >
                {item.answer}
              </Typography>
            </Expandable>
          </FaqRow>
        ))}
        <Typography as="p" variant="span" size="xs" margin={`${Spaces.xl} 0 0`}>
          <TapTarget>
            <StyledLink
              href={POLICIES_HREF}
              isExternalLink
              isInverseUnderlineStyling
            >
              Recreation general policies
            </StyledLink>
          </TapTarget>
        </Typography>
      </FluidContainer>

      <InstagramFeed department="recreation" />
      <NonDiscriminationPolicy />
      <PhotoVideoDisclaimer />
      <FluidContainer flex justifyContent="center">
        <Image
          alt="university-student union recreation play wellness connection"
          src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/recreation/RecLogo_4%20INCH%20-%20REC.webp"
          width="100%"
          maxWidth={'1000px'}
        />
      </FluidContainer>
    </Page>
  );
}
