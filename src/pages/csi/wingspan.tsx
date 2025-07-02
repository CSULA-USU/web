import Head from 'next/head';
import styled from 'styled-components';
import wingspanData from 'data/wingspan.json';
import { Page } from 'modules';
import { Colors, media, Spaces } from 'theme';
import { WingspanMeetingCalendar } from 'components/WingspanMeetingCalendar';
import { BsBriefcase } from 'react-icons/bs';
import { CiMedal } from 'react-icons/ci';
import { FiMessageCircle } from 'react-icons/fi';
import { useBreakpoint } from 'hooks';
import { QuoteBanner } from 'components/QuoteBanner';
import { ImCheckmark } from 'react-icons/im';
import { IoMailOutline } from 'react-icons/io5';
import {
  FaRegHandshake,
  FaNetworkWired,
  FaRegLightbulb,
  FaUser,
  FaRegSmile,
  FaFire,
  FaUsers,
  FaBullseye,
  FaRegComments,
  FaGlobeAmericas,
} from 'react-icons/fa';
import {
  Button,
  DescriptionCard,
  FluidContainer,
  Image,
  NonBreakingSpan,
  Typography,
} from 'components';
import { IconType } from 'react-icons';

const iconMap = {
  FaRegHandshake,
  BsBriefcase,
  FaNetworkWired,
  CiMedal,
  FiMessageCircle,
  FaRegLightbulb,
  FaUser,
  FaRegSmile,
  FaFire,
  FaUsers,
  FaBullseye,
  FaRegComments,
  FaGlobeAmericas,
};

const { benefits, learningOutcomes, pathways, socialChangeValues } =
  wingspanData;

type IconName = keyof typeof iconMap;

const ImageLayoutWrapper = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const TwoColumnLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 24px; // smaller default for mobile
  padding: ${`${Spaces['2xl']} 16px 0 16px`};

  @media (min-width: 768px) {
    gap: 32px; // match Tailwind's gap-8 (32px)
  }
`;

const ResponsiveColumn = styled.div`
  flex: 1 1 312px;
  max-width: 600px;
  min-width: 312px;
  display: flex;
  flex-direction: column;
  gap: ${Spaces['md']};
`;

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  padding-bottom: ${Spaces.xl};
  width: 100%;
`;

const ResponsiveImage = styled.img`
  flex: 1 1 0;
  min-width: 312px;
  max-width: 100%;
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
`;

const CenteredText = styled.div`
  text-align: center;
`;

const OrgCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${Spaces.md};
  width: 200px;
  height: 64px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 1024px) {
    width: 25vw;
  }

  @media (max-width: 767px) {
    width: 100%;
    height: auto;
    flex-direction: column;
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 767px) {
    margin: 0 auto;
  }
`;

const ResponsiveLevels = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${Spaces.lg};

  @media (min-width: 768px) {
    display: table;
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 12px;
    overflow: hidden;
  }
`;

const TableRow = styled.div`
  display: block;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: ${Spaces.md};
  background-color: white;

  @media (min-width: 768px) {
    display: table-row;
    border: none;
    padding: 0;
  }
`;

const TableCell = styled.div`
  margin-bottom: ${Spaces.md};

  @media (min-width: 768px) {
    display: table-cell;
    padding: 16px;
    vertical-align: top;
    border-top: 1px solid #e5e7eb;

    &:first-child {
      font-weight: bold;
      white-space: nowrap;
      width: 15%;
    }
  }
`;

const TableHeaderRow = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: table-header-group;
    font-weight: bold;
  }
`;

const TableHeaderCell = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: table-cell;
    padding: 16px;
    color: ${Colors.black};
    font-size: 0.875rem;
    background-color: ${Colors.greyLightest};
  }
`;

const Badge = styled.span<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  display: inline-block;
  margin-right: 8px;
  background-color: ${(props) => props.color};
`;

const PathwayRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${Spaces.lg};
`;

const HeroSection = styled(FluidContainer)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 800;
  text-align: center;
  line-height: 1.2;
  margin-bottom: 0;

  ${media('mobile')(`
    font-size: 40px;
  `)}
`;

const HighlightedSub = styled.span`
  display: block;
  font-size: 40px;
  font-weight: 600;
  color: grey;
  margin: 8px 0 ${Spaces.md};

  ${media('mobile')(`
    font-size: 30px;
    margin-bottom: ${Spaces.md};
  `)}
`;

const SectionTitle = styled.span`
  display: block;
  font-size: 36px;
  font-weight: 600;
  margin: ${Spaces['2xl']} 0 ${Spaces.md};

  ${media('mobile')(`
    font-size: 30px;
    margin-bottom: ${Spaces.md};
  `)}
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const GradientSection = styled.section`
  background: linear-gradient(to bottom, white, ${Colors.primary});
  padding: 0 16px;
`;

const StyledDescription = styled.span`
  line-height: 1.4;
  max-width: 48ch;
`;

const StyledTitle = styled.strong`
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
`;

const StyledIconContainer = styled.div`
  background-color: #fef3c7;
  padding: 12px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
`;

interface StyledDescriptionCardProps {
  Icon?: IconType;
  title?: string;
  description: string;
  prefix?: React.ReactNode;
}

const StyledDescriptionCard = ({
  Icon,
  title,
  description,
  prefix,
}: StyledDescriptionCardProps) => {
  return (
    <Typography as="span" variant="copy">
      <CenteredText>
        {Icon && (
          <StyledIconContainer>
            <Icon size={24} color={Colors.primary} aria-hidden="true" />
          </StyledIconContainer>
        )}
        {prefix && (
          <Typography
            as="span"
            variant="label"
            weight="700"
            size="sm"
            color="black"
            style={{ display: 'block', marginBottom: '4px' }}
          >
            {prefix}
          </Typography>
        )}
        {title && <StyledTitle>{title}</StyledTitle>}
        <StyledDescription>{description}</StyledDescription>
      </CenteredText>
    </Typography>
  );
};

const IconList = ({
  items,
  icon: Icon,
  label,
}: {
  items: string[];
  icon: IconType;
  label?: string;
}) => (
  <ul
    style={{
      margin: 0,
      paddingLeft: '1rem',
      listStyle: 'none',
    }}
  >
    {label && (
      <Typography
        as="p"
        variant="labelTitleSmall"
        style={{ marginBottom: '4px' }}
      >
        {label}
      </Typography>
    )}
    {items.map((text, i) => (
      <li
        key={i}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          marginBottom: '8px',
        }}
      >
        <Icon color={Colors.primary} style={{ flexShrink: 0 }} aria-hidden />
        <Typography as="span" variant="copy">
          {text}
        </Typography>
      </li>
    ))}
  </ul>
);

const filterUpcomingMeetings = (meetings: any[]) => {
  const today = new Date();
  return meetings.filter((meeting) => new Date(meeting.date) >= today);
};

export default function Wingspan() {
  const { returnByBreakpoint, isMobile, isTablet } = useBreakpoint();

  const ResponsiveSubheader = ({ children }: { children: React.ReactNode }) => (
    <Typography
      as="h2"
      variant="subheader"
      size={isMobile ? 'md' : 'lg'}
      style={{
        maxWidth: '940px',
        margin: '0 auto',
        paddingBottom: Spaces.xl,
      }}
    >
      {children}
    </Typography>
  );

  const SectionHeader = ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle?: string;
  }) => (
    <CenteredText>
      <SectionTitle>{title}</SectionTitle>
      {subtitle && <ResponsiveSubheader>{subtitle}</ResponsiveSubheader>}
    </CenteredText>
  );

  const descriptionCardWidth = returnByBreakpoint({
    tablet: '100%',
    desktop: 'calc(50% - 16px)',
    widescreen: 'calc(30% - 12px)',
  });

  const upcomingMeetings = filterUpcomingMeetings(wingspanData.meetings);

  return (
    <Page>
      <Head>
        <title>U-SU CSI Wingspan</title>
        <meta
          name="author"
          content="The University-Student Union Center for Student Involvement at Cal State LA Wingspan Leadership Program"
          key="author"
        />
        <meta
          name="keywords"
          content="Wingspan Leadership Program, Wingspan, Wingspan CSULA, wingspan csula, Wingspanla CSULA, wingspanla csula, wingspan la, wingspan cal state la, wingspan la leadership, Cal State LA leadership, csula lead,
          csula leadership, cal state la leadership program, student leadership development, college student leadership programs, public speaking workshops, leadership conference, teamwork and communication skills,
          social change model, leadership program, the university student union, California State University Los Angeles, student union, csula, cal state la, u-su, usu, student organizations, center for student involvement,
          events, csi, graffix, college, student, union, cal state los angeles, cal state, los angeles, university student union, ussu, ussu la, ussu los angeles, asi, associated students inc., csula wingspan, csula wingspanla"
        />

        <meta
          name="description"
          content="The Wingspan Leadership Program strives to enhance our students' experience at Cal State LA through meaningful opportunities to cultivate leadership skills, social responsibility, and holistic development of students."
          key="description"
        />

        {/* Open Graph Meta Tags (Facebook, LinkedIn, etc.) */}
        <meta property="og:title" content="U-SU CSI Wingspan" />
        <meta
          property="og:description"
          content="The Wingspan Leadership Program at Cal State LA empowers students through leadership, teamwork, and social responsibility."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/csi/wingspan"
        />
        <meta
          property="og:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan//overview-event.webp"
        />
        <meta
          property="og:image:alt"
          content="Group of Cal State LA students at a Wingspan Leadership event"
        />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="U-SU CSI Wingspan" />
        <meta
          name="twitter:description"
          content="Empowering Cal State LA students through leadership, service, and holistic development."
        />
        <meta
          name="twitter:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan//overview-event.webp"
        />

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSection>
        <HeroTitle>
          Wingspan
          <HighlightedSub>Leadership Program</HighlightedSub>
        </HeroTitle>

        <Typography
          as="h2"
          variant="subheader"
          size={isMobile ? 'md' : 'lg'}
          margin={`0 0 ${Spaces.lg}`}
        >
          Expand Your Leadership Reach
        </Typography>

        <ButtonGroup>
          <Button href="https://forms.office.com/r/fpLZipPcJK" isExternalLink>
            Sign Up →
          </Button>
          <Button
            variant="black"
            href="https://www.wingspanla.org/"
            isExternalLink
            onClick={() =>
              document
                .getElementById('overview')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            View Site
          </Button>
        </ButtonGroup>
      </HeroSection>

      <QuoteBanner
        quote="Leadership is a relational and ethical process of people together attempting to accomplish positive change"
        attribution="Komives, Lucas, McMahon (2007)"
      />

      <CenteredText>
        <SectionTitle>Program Overview</SectionTitle>
      </CenteredText>

      <FluidContainer flex flexWrap={isTablet ? 'wrap' : 'nowrap'}>
        <FluidContainer padding={isMobile ? '0' : '0 20px 0 0'}>
          <Typography
            as="h2"
            variant="subheader"
            weight="600"
            size={isMobile ? 'md' : 'lg'}
          >
            Cal State LA Wants You to Lead
          </Typography>
          <Typography margin="24px 0" as="p">
            The Wingspan Leadership Program strives to enhance our
            students&apos; experience at Cal State LA through meaningful
            opportunities to cultivate leadership skills, social responsibility,
            and holistic development. A core principle of the program is that
            all students have the potential for leadership. By participating in
            workshops and programs, joining and leading student organizations,
            and engaging in student governance and service projects, they will
            develop their potential and make a positive difference personally,
            in the campus community, and beyond.
          </Typography>
        </FluidContainer>
        <div
          style={{
            width: isMobile ? '100%' : 'auto',
            maxWidth: isMobile ? '430px' : '100%',
            height: isMobile ? '550px' : 'auto',
            overflow: isMobile ? 'hidden' : 'visible',
            borderRadius: '8px',
            position: 'relative',
          }}
        >
          <Image
            src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan/overview-event.webp"
            alt="Large group of students gathered outdoors under an arch of black, white, and gold balloons"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              borderRadius: '8px',
            }}
          />
        </div>
      </FluidContainer>

      <FluidContainer backgroundColor="greyLightest" padding="0 16px 36px 16px">
        <SectionHeader
          title="What You'll Gain"
          subtitle="Participation provides you with valuable skills, experiences, and
            opportunities that will benefit you throughout your academic and
            professional careers."
        />
        <FluidContainer
          flex
          flexWrap="wrap"
          justifyContent="space-between"
          padding="0"
        >
          {benefits.map(({ icon, title, description }, index) => {
            return (
              <DescriptionCard
                key={index}
                rounded
                hoverable
                backgroundColor="white"
                width={descriptionCardWidth}
                margin="0 0 24px"
                minHeight="auto"
                imgSrc=""
                imgAlt=""
              >
                <StyledDescriptionCard
                  Icon={iconMap[icon as IconName]}
                  title={title}
                  description={description}
                />
              </DescriptionCard>
            );
          })}
        </FluidContainer>
      </FluidContainer>

      <FluidContainer>
        <SectionHeader
          title="Learning Outcomes"
          subtitle="By participating in the Wingspan Leadership Program, students will:"
        />
        <FluidContainer
          flex
          flexWrap="wrap"
          justifyContent="space-between"
          padding="0"
        >
          {learningOutcomes.map(({ number, text }, index) => (
            <DescriptionCard
              key={index}
              rounded
              hoverable
              backgroundColor="white"
              width={descriptionCardWidth}
              margin="0 0 24px"
              minHeight="auto"
              imgSrc=""
              imgAlt=""
            >
              <StyledDescriptionCard description={text} prefix={`${number}.`} />
            </DescriptionCard>
          ))}
        </FluidContainer>
      </FluidContainer>

      <TwoColumnLayout>
        {/* Left: Stacked Images */}
        <ResponsiveColumn>
          <ResponsiveImage
            src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan/outcomes-students-seated-at-table.webp"
            alt="Students seated at a banquet table during a leadership event"
          />
          <ResponsiveImage
            src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan/outcomes-audience-listening-to-speaker.webp"
            alt="Audience seated at banquet tables listening to a keynote speaker"
          />
        </ResponsiveColumn>

        {/* Right: Text Content */}
        <ResponsiveColumn style={{ justifyContent: 'center' }}>
          <Typography
            as="h2"
            variant="subheader"
            weight="600"
            size={isMobile ? 'md' : 'lg'}
          >
            Students can participate through:
          </Typography>
          <Typography as="p" variant="copy">
            <ul
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: Spaces.md,
                paddingLeft: '1.5rem',
                listStyle: 'disc',
              }}
            >
              <li>Attendance at LEAD Series workshops</li>
              <li>Attendance at the annual Student Leadership Conference</li>
              <li>
                Participation in trainings available at Cal State LA
                (Undocually, VetNet Ally, Mental Health First Aid, etc.)
              </li>
              <li>Participation in service projects/service hours</li>
              <li>Completing online learning modules assigned on Canvas</li>
              <li>Joining student organization(s)</li>
            </ul>
          </Typography>
        </ResponsiveColumn>
      </TwoColumnLayout>

      {/* Pathways Section */}
      <FluidContainer padding="0 16px 36px 16px">
        <SectionTitle>Pathways</SectionTitle>
        {pathways.map(({ number, title, description, bullets }) => (
          <PathwayRow key={number}>
            <div>
              <Typography
                as="h2"
                variant="subheader"
                weight="600"
                size={isMobile ? 'md' : 'lg'}
              >
                {number}. {title}
              </Typography>
              <Typography as="p" variant="copy">
                {description}
              </Typography>
              {bullets.length > 0 && (
                <ul>
                  {bullets.map((b, i) => (
                    <li key={i}>
                      <Typography as="span" variant="copy">
                        {b}
                      </Typography>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </PathwayRow>
        ))}
        {/* Images Below the Pathways Text */}
        <ImageLayoutWrapper>
          <ImageGrid>
            <ResponsiveImage
              src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan/outcomes-pathways-three-women-holding-award.webp"
              alt="Students holding award"
            />
            <ResponsiveImage
              src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan/outcomes-pathways-group-with-mascot.webp"
              alt="Group with mascot"
            />
          </ImageGrid>
        </ImageLayoutWrapper>
      </FluidContainer>

      {/* Events */}
      <>
        {upcomingMeetings.length > 0 && (
          <FluidContainer
            backgroundColor="greyLightest"
            padding={`0 16px ${Spaces['xl']} 16px`}
          >
            <SectionHeader
              title="Upcoming Events"
              subtitle="Take part in thoughtful events that support your growth,
                celebrate your identity, and empower you to lead with
                confidence."
            />
            <WingspanMeetingCalendar meetings={upcomingMeetings} />
          </FluidContainer>
        )}
      </>

      <FluidContainer padding="0  16px">
        <SectionHeader
          title='The Seven "C"s of the Social Change Model'
          subtitle="Grounded in the Social Change Model of Leadership (SCM), the
            Wingspan Leadership Program incorporates leadership development,
            educational awareness, and civic engagement. Social responsibility
            and change for the common good are achieved through the development
            of 7 core values targeted at enhancing students' levels of
            self–awareness and ability to work with others."
        />
        <Image
          src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan/values-model.webp"
          alt="Nuestra Grad smiling while giving a hug"
          style={{
            width: '100%',
            maxWidth: '576px',
            height: 'auto',
            display: 'block',
            margin: `0 auto 36px auto`,
            borderRadius: '12px',
          }}
        />

        <FluidContainer
          flex
          flexWrap="wrap"
          justifyContent="space-between"
          padding="0"
        >
          {socialChangeValues.map(({ icon, title, description }, index) => {
            const Icon = iconMap[icon as keyof typeof iconMap];
            const isLastOdd =
              socialChangeValues.length % 2 !== 0 &&
              index === socialChangeValues.length - 1;

            return (
              <div
                key={index}
                style={{
                  width: descriptionCardWidth,
                  marginBottom: '24px',
                  marginLeft: isLastOdd ? 'auto' : undefined,
                  marginRight: isLastOdd ? 'auto' : undefined,
                }}
              >
                <DescriptionCard
                  rounded
                  hoverable
                  backgroundColor="white"
                  width="100%"
                  minHeight="auto"
                  imgSrc=""
                  imgAlt=""
                >
                  <StyledDescriptionCard
                    Icon={Icon}
                    title={title}
                    description={description}
                  />
                </DescriptionCard>
              </div>
            );
          })}
        </FluidContainer>

        <FluidContainer padding="0">
          <SectionHeader
            title="Leadership Milestones"
            subtitle="Students will participate in various training events to achieve
              the designations of Rising Leader, Soaring Leader, and Golden
              Leader. Throughout the program, students will have opportunities
              to connect with peers and build community through in-person and
              online engagement. Transfer students may be able to apply their
              prior leadership experience toward these levels."
          />
          <ResponsiveLevels>
            <TableHeaderRow>
              <TableRow>
                <TableHeaderCell>Level</TableHeaderCell>
                <TableHeaderCell>Requirements</TableHeaderCell>
                <TableHeaderCell>Perks</TableHeaderCell>
              </TableRow>
            </TableHeaderRow>

            {wingspanData.leadershipLevels.map(
              ({ level, color, requirements, perks }) => (
                <TableRow key={level}>
                  <TableCell>
                    <Typography as="span" variant="labelTitle">
                      <Badge color={color} aria-hidden="true" />
                      {level}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconList
                      items={requirements}
                      icon={ImCheckmark}
                      label={isMobile ? 'Requirements' : undefined}
                    />
                  </TableCell>

                  <TableCell>
                    <IconList
                      items={perks}
                      icon={ImCheckmark}
                      label={isMobile ? 'Requirements' : undefined}
                    />
                  </TableCell>
                </TableRow>
              ),
            )}
          </ResponsiveLevels>
        </FluidContainer>
      </FluidContainer>
      <GradientSection id="get-started">
        <CenteredText>
          <SectionTitle>Presented in Partnership With</SectionTitle>
          <Typography
            as="h2"
            variant="subheader"
            size="md"
            style={{
              maxWidth: '940px',
              margin: '0 auto', // centers it horizontally
              paddingBottom: Spaces.xl, // optional for spacing below
            }}
          >
            The Wingspan Leadership Program is put together by the collaborative
            efforts of on-campus organizations dedicated to student development.
          </Typography>
          <FluidContainer
            flex
            flexWrap="wrap"
            justifyContent="space-between"
            gap="24px"
            padding={`${Spaces['xl']} 0 ${Spaces['2xl']} 0`}
          >
            {wingspanData.organizations.map(
              ({ name, logo, website }, index) => (
                <OrgCard key={index}>
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${name} website`}
                  >
                    <LogoContainer>
                      <Image
                        src={logo || '/placeholder.svg'}
                        alt={`${name} logo`}
                        style={{
                          width: '200px',
                          height: '64px',
                          objectFit: 'contain',
                        }}
                      />
                    </LogoContainer>
                  </a>
                </OrgCard>
              ),
            )}
          </FluidContainer>
          <SectionTitle>Ready to Spread Your Wings?</SectionTitle>
        </CenteredText>
        <div style={{ marginTop: Spaces.lg }}>
          <FluidContainer flex justifyContent="center" padding="0">
            <DescriptionCard
              rounded
              backgroundColor="white"
              width={descriptionCardWidth}
              margin={isMobile ? `0 0 ${Spaces.xl} 0` : `0 0 100px 0`}
              imgSrc=""
              imgAlt=""
              contentNotText
            >
              <StyledDescriptionCard
                Icon={IoMailOutline}
                title="Get Started Today"
                description="Fill out the form to start developing your leadership potential here at Cal State LA"
              />

              <FluidContainer
                flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100px"
              >
                <Button
                  href="https://forms.office.com/r/fpLZipPcJK"
                  variant="primary"
                  isExternalLink
                >
                  <NonBreakingSpan>Join Wingspan →</NonBreakingSpan>
                </Button>
              </FluidContainer>

              <Typography variant="copy" margin={`0 0 ${Spaces.sm}`}>
                By adding your contact info on this form, you will receive
                further information about the program and next steps for signing
                up! You may join at any point in the year.
              </Typography>
            </DescriptionCard>
          </FluidContainer>
        </div>
      </GradientSection>
    </Page>
  );
}
