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
  Typography,
} from 'components';

const { benefits, meetings, learningOutcomes, pathways, socialChangeValues } =
  wingspanData;

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

type IconName = keyof typeof iconMap;

const CenteredText = styled.div`
  text-align: center;
`;

const CardContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const OrgCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${Spaces.md};
  transition: transform 0.3s ease;
  width: 200px;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LogoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
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
    background-color: #f3f4f6;
    font-weight: bold;
  }
`;

const TableHeaderCell = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: table-cell;
    padding: 16px;
    color: #374151;
    font-size: 0.875rem;
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

const CircleNumber = styled.div`
  border-radius: 10px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  flex-shrink: 0;
  margin-right: ${Spaces.sm};
`;

const LearningOutcomesSection = styled(FluidContainer)`
  padding: ${Spaces.xl} ${Spaces.md};
`;

const HeroSection = styled(FluidContainer)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 16px;
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
  padding: 0;
  margin: 0; // ⬅️ remove outer margin
  border: 0; // just in case
`;

export default function Wingspan() {
  const { returnByBreakpoint, isMobile, isTablet } = useBreakpoint();

  const descriptionCardWidth = returnByBreakpoint({
    tablet: '100%',
    desktop: 'calc(50% - 16px)',
    widescreen: 'calc(30% - 12px)',
  });

  return (
    <Page>
      <Head>
        <title>U-SU CSI Wingspan</title>
        <meta
          name="author"
          content="The University-Student Union Center for Student Involvement at Cal State LA"
          key="author"
        />
        <meta
          name="keywords"
          content="Wingspan Leadership Program, Wingspan, Wingspan CSULA, wingspan csula, Wingspanla CSULA, wingspanla csula, wingspan la, wingspan cal state la, wingspan la leadership, Cal State LA leadership, csula lead, 
          csula leadership, cal state la leadership program, student leadership development, college student leadership programs, public speaking workshops, leadership conference, teamwork and communication skills, 
          social change model, leadership program, the university student union, California State University Los Angeles, student union, csula, cal state la, u-su, usu, student organizations, center for student involvement, 
          student organizations, events, csi, graffix, college, student, union, cal state los angeles, cal state, los angeles, university student union, ussu, ussu la, ussu los angeles"
        />

        <meta
          name="description"
          content="The Wingspan Leadership Program strives to enhance our students' experience at Cal State LA through meaningful opportunities to cultivate leadership skills, social responsibility, and holistic development of students."
          key="description"
        />
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
            Learn More
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
        <FluidContainer>
          <Typography as="h2" variant="subheader" size={isMobile ? 'md' : 'lg'}>
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
        <Image
          src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan/overview-event.webp"
          alt="Large group of students gathered outdoors under an arch of black, white, and gold balloons"
          className="object-cover object-center"
          width={isMobile ? '100%' : '45%'}
          height={isMobile ? '100%' : '45%'}
        />
      </FluidContainer>

      <FluidContainer backgroundColor="greyLightest">
        <CenteredText>
          <SectionTitle>What You&apos;ll Gain</SectionTitle>
          <Typography
            as="h2"
            variant="subheader"
            size={isMobile ? 'md' : 'lg'}
            margin={
              isMobile ? `0 auto ${Spaces.lg}` : `0 250px ${Spaces.lg} 250px`
            }
          >
            Participation provides you with valuable skills, experiences, and
            opportunities that will benefit you throughout your academic and
            professional careers.
          </Typography>
        </CenteredText>

        <FluidContainer
          flex
          flexWrap="wrap"
          justifyContent="space-between"
          padding="0"
        >
          {benefits.map(({ icon, title, description }, index) => {
            const Icon = iconMap[icon as IconName];
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
                <Typography as="span" variant="copy">
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        backgroundColor: '#fef3c7',
                        padding: '12px',
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.75rem',
                      }}
                    >
                      <Icon size={24} color={Colors.primary} />
                    </div>
                    <strong
                      style={{ display: 'block', marginBottom: '0.25rem' }}
                    >
                      {title}
                    </strong>
                    <span style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>
                      {description}
                    </span>
                  </div>
                </Typography>
              </DescriptionCard>
            );
          })}
        </FluidContainer>
      </FluidContainer>

      <LearningOutcomesSection>
        <CenteredText>
          <SectionTitle>Learning Outcomes</SectionTitle>
        </CenteredText>
        <CenteredText>
          <Typography
            as="h2"
            variant="subheader"
            size={isMobile ? 'md' : 'lg'}
            margin={`0 auto ${Spaces.lg}`}
          >
            By participating in the Wingspan Leadership Program, students will:
          </Typography>
        </CenteredText>

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
              <CardContentLeft>
                <CircleNumber>
                  <Typography
                    as="span"
                    variant="label"
                    weight="700"
                    size="sm"
                    color="white"
                  >
                    {number}
                  </Typography>
                </CircleNumber>
                <Typography as="p" variant="copy" size="sm" lineHeight="1.4">
                  {text}
                </Typography>
              </CardContentLeft>
            </DescriptionCard>
          ))}
        </FluidContainer>
      </LearningOutcomesSection>

      <FluidContainer
        flex
        flexWrap="wrap"
        flexDirection={isMobile ? 'column' : 'row'}
        gap="36px"
        alignItems="center" // center both items vertically on desktop
      >
        {/* Left column: stacked images */}
        <FluidContainer
          flex
          flexDirection="column"
          gap="24px"
          width={isMobile ? '100%' : '45%'}
        >
          <Image
            src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan/outcomes-students-seated-at-table.webp"
            alt="Students seated at a banquet table during a leadership event"
            width="100%"
            height="auto"
          />
          <Image
            src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan/outcomes-audience-listening-to-speaker.webp"
            alt="Audience seated at banquet tables listening to a keynote speaker during a leadership event"
            width="100%"
            height="auto"
          />
        </FluidContainer>

        {/* Right column: text */}
        <FluidContainer
          flex
          flexDirection="column"
          justifyContent="center"
          gap="16px"
          width={isMobile ? '100%' : '50%'}
        >
          <Typography
            as="h2"
            variant="subheader"
            size={isMobile ? 'md' : 'lg'}
            margin={`0 0 ${Spaces.lg}`}
          >
            Students can participate through:
          </Typography>
          <ul
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: Spaces.lg,
              paddingLeft: '1.5rem',
              listStyle: 'disc',
            }}
          >
            <li>Attendance at LEAD Series workshops</li>
            <li>Attendance at the annual Student Leadership Conference</li>
            <li>
              Participation in trainings available at Cal State LA (Undocually,
              VetNet Ally, Mental Health First Aid, etc.)
            </li>
            <li>Participation in service projects/service hours</li>
            <li>Completing online learning modules assigned on Canvas</li>
            <li>Joining student organization(s)</li>
          </ul>
        </FluidContainer>
      </FluidContainer>

      {/* Pathways Section */}
      <FluidContainer>
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
      </FluidContainer>

      {/* Events */}
      <FluidContainer backgroundColor="greyLightest">
        <CenteredText>
          <SectionTitle>Upcoming Events</SectionTitle>
        </CenteredText>
        <CenteredText>
          <Typography
            as="h2"
            variant="subheader"
            size={isMobile ? 'md' : 'lg'}
            margin={isMobile ? `0 0 ${Spaces.lg} 0` : `0 250px 0 250px`}
          >
            Take part in thoughtful events that support your growth, celebrate
            your identity, and empower you to lead with confidence.
          </Typography>
        </CenteredText>
        <WingspanMeetingCalendar meetings={meetings} />
      </FluidContainer>

      <FluidContainer>
        <CenteredText>
          <SectionTitle>
            The Seven &quot;C&quot;s of the Social Change Model
          </SectionTitle>
        </CenteredText>
        <CenteredText>
          <Typography
            as="h2"
            variant="subheader"
            size="md"
            color="grey"
            margin={
              isMobile ? `0 0 ${Spaces.lg} 0` : `0 250px ${Spaces.lg} 250px`
            }
          >
            Grounded in the Social Change Model of Leadership (SCM), the
            Wingspan Leadership Program incorporates leadership development,
            educational awareness, and civic engagement. Social responsibility
            and change for the common good are achieved through the development
            of 7 core values targeted at enhancing students&apos; levels of
            self–awareness and ability to work with others.
          </Typography>
          <Image
            margin="auto"
            borderRadius="12px"
            src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan/values-model.webp"
            alt="Nuestra Grad smiling while giving a hug"
            width={isMobile ? '100%' : '45%'}
            height={isMobile ? '100%' : '45%'}
          />
        </CenteredText>

        <FluidContainer
          flex
          flexWrap="wrap"
          justifyContent="center"
          padding="0"
        >
          {socialChangeValues.map(({ icon, title, description }, index) => {
            const Icon = iconMap[icon as keyof typeof iconMap];
            return (
              <DescriptionCard
                key={index}
                rounded
                hoverable
                backgroundColor="white"
                width={descriptionCardWidth}
                minHeight="auto"
                imgSrc=""
                imgAlt=""
              >
                <Typography as="span" variant="copy">
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        backgroundColor: '#fef3c7',
                        padding: '12px',
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.75rem',
                      }}
                    >
                      <Icon size={24} color="primary" />
                    </div>
                    <strong
                      style={{ display: 'block', marginBottom: '0.25rem' }}
                    >
                      {title}
                    </strong>
                    <span style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>
                      {description}
                    </span>
                  </div>
                </Typography>
              </DescriptionCard>
            );
          })}
        </FluidContainer>

        <FluidContainer>
          <CenteredText>
            <SectionTitle>Leadership Milestones</SectionTitle>
            <Typography
              as="h2"
              variant="subheader"
              size="md"
              margin={
                isMobile ? `0 0 ${Spaces.lg} 0` : `0 250px ${Spaces.lg} 250px`
              }
            >
              Students will participate in various training events to achieve
              the designations of Rising Leader, Soaring Leader, and Golden
              Leader. Throughout the program, students will have opportunities
              to connect with peers and build community through in-person and
              online engagement. Transfer students may be able to apply their
              prior leadership experience toward these levels.
            </Typography>
          </CenteredText>
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
                      <Badge color={color} />
                      {level}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                      {requirements.map((req, i) => (
                        <li key={i}>
                          <Typography as="span" variant="copy">
                            {req}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                      {perks.map((perk, i) => (
                        <li key={i}>
                          <Typography as="span" variant="copy">
                            {perk}
                          </Typography>
                        </li>
                      ))}
                    </ul>
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
            margin={
              isMobile ? `0 0 ${Spaces.lg} 0` : `0 700px ${Spaces.lg} 700px`
            }
          >
            The Wingspan Leadership Program is put together by the collaborative
            efforts of on-campus organizations dedicated to student development.
          </Typography>
          <SectionTitle>Ready to Spread Your Wings?</SectionTitle>
          <FluidContainer
            flex
            flexWrap="wrap"
            justifyContent="center"
            gap="24px"
            padding="0"
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
                        width="200px"
                        height="80px"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </LogoContainer>
                  </a>
                </OrgCard>
              ),
            )}
          </FluidContainer>
        </CenteredText>
        <FluidContainer flex justifyContent="center" padding="0">
          <DescriptionCard
            rounded
            backgroundColor="white"
            width={descriptionCardWidth}
            minHeight="auto"
            imgSrc=""
            imgAlt=""
            margin={isMobile ? `0 0 100px 0` : `0 0 100px 0`}
          >
            <Typography
              as="h1"
              variant="title"
              style={{
                fontFamily: "'Bitter', serif",
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              Get Started Today
            </Typography>

            <Typography variant="span">
              Fill out the form to start developing your leadership potential
              here at Cal State LA
            </Typography>

            <FluidContainer
              flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="100px"
            >
              <Button
                href="https://forms.office.com/r/fpLZipPcJK"
                isExternalLink
                style={{
                  fontFamily: "'Bitter', serif",
                  fontWeight: 700,
                }}
              >
                Join Wingspan →
              </Button>
            </FluidContainer>

            <Typography variant="copy" margin={`0 0 ${Spaces.sm}`}>
              By adding your contact info on this form, you will receive further
              information about the program and next steps for signing up! You
              may join at any point in the year.
            </Typography>
          </DescriptionCard>
        </FluidContainer>
      </GradientSection>
    </Page>
  );
}
