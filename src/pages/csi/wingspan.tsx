import Head from 'next/head';
import styled from 'styled-components';
import { Page } from 'modules';
import {
  Button,
  DescriptionCard,
  FluidContainer,
  Typography,
} from 'components';
import { QuoteBanner } from 'components/QuoteBanner';
import { Image } from 'components';
import { useBreakpoint } from 'hooks';
import {
  Handshake,
  BriefcaseBusiness,
  Network,
  Medal,
  MessageCircle,
  Lightbulb,
} from 'lucide-react';

const HeroSection = styled(FluidContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const benefits = [
  {
    icon: Handshake,
    title: 'Hands-On Leadership Experience',
    description:
      'Tutoring, college prep, scholarship opportunities, and academic mentorship...',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Personal and Professional Development',
    description: 'Hands-on leadership training, public speaking workshops...',
  },
  {
    icon: Network,
    title: 'Supportive Network of Emerging Leaders',
    description:
      'Internship placements, job readiness training, resume building...',
  },
  {
    icon: Medal,
    title: 'Clarity on Strengths and Leadership Style',
    description: 'Achievement certificates and public recognition...',
  },
  {
    icon: MessageCircle,
    title: 'Practical Skills in Communication...',
    description: 'Build confidence, emotional intelligence, mentorship...',
  },
  {
    icon: Lightbulb,
    title: 'Stronger Campus and Community Connections',
    description: 'Learn problem-solving, design thinking, entrepreneurship...',
  },
];

export default function Wingspan() {
  const { returnByBreakpoint, isTablet, isMobile } = useBreakpoint();
  const descriptionCardWidth = returnByBreakpoint({
    tablet: '100%',
    desktop: 'calc(50% - 16px)',
    widescreen: 'calc(25% - 16px)',
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
        <meta name="keywords" content="..." key="keywords" />
        <meta
          name="description"
          content="The Wingspan Leadership Program strives to..."
          key="description"
        />
      </Head>

      <HeroSection>
        <Typography
          as="h1"
          variant="titleLarge"
          style={{
            fontSize: '4rem',
            lineHeight: '1.2',
            fontWeight: 1000,
            textAlign: 'center',
          }}
        >
          Wingspan
          <span
            style={{
              display: 'block',
              color: '#f9b000',
              fontWeight: 700,
              fontFamily: 'serif',
              marginTop: '1rem',
              fontSize: '4rem',
            }}
          >
            Leadership Program
          </span>
        </Typography>

        <Typography
          as="h2"
          variant="subheader"
          style={{
            fontSize: '1.5rem',
            color: '#6b7280',
            textAlign: 'center',
            marginTop: '2rem',
            marginBottom: '2rem',
          }}
        >
          Expand Your Leadership Reach
        </Typography>

        <ButtonGroup>
          <Button
            href="https://forms.office.com/r/fpLZipPcJK"
            isExternalLink
            style={{
              backgroundColor: '#f9b000',
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: 'bold',
              borderRadius: '0.5rem',
              padding: '1rem 2rem',
            }}
          >
            Sign Up →
          </Button>

          <Button
            variant="black"
            onClick={() => {
              const section = document.getElementById('overview');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Learn More
          </Button>
        </ButtonGroup>
      </HeroSection>

      <QuoteBanner
        quote="Leadership is a relational and ethical process of people together attempting to accomplish positive change"
        attribution="Komives, Lucas, McMahon (2007)"
      />

      <Typography
        as="h1"
        variant="title"
        style={{
          fontSize: '3rem',
          lineHeight: '1.2',
          textAlign: 'center',
          marginTop: '5rem',
          marginBottom: '1rem',
        }}
      >
        Program Overview
      </Typography>

      <FluidContainer flex flexWrap={isTablet ? 'wrap' : 'nowrap'}>
        <FluidContainer>
          <Typography variant="titleSmall" as="h2">
            Cal State LA Wants You to Lead
          </Typography>
          <Typography margin="24px 0" as="p">
            The Wingspan Leadership Program strives to enhance our students'
            experience at Cal State LA...
          </Typography>
        </FluidContainer>
        <Image
          margin="auto"
          borderRadius="12px"
          src="/departments/ccc/nuestra-teaser.jpeg"
          alt="Nuestra Grad smiling while giving a hug"
          width={isMobile ? '100%' : '45%'}
          height={isMobile ? '100%' : '45%'}
        />
      </FluidContainer>

      <FluidContainer backgroundColor="greyLightest">
        <Typography
          as="h1"
          variant="title"
          style={{
            fontSize: '2rem',
            lineHeight: '1.2',
            textAlign: 'center',
            marginTop: '5rem',
            marginBottom: '1rem',
          }}
        >
          What You'll Gain
        </Typography>

        <Typography
          as="p"
          style={{
            textAlign: 'center',
            fontSize: '1.2rem',
            marginTop: '3rem',
            marginLeft: '15rem',
            marginRight: '15rem',
          }}
        >
          Participation provides you with valuable skills, experiences, and
          opportunities that will benefit you throughout your academic and
          professional careers.
        </Typography>

        <FluidContainer
          flex
          flexWrap="wrap"
          justifyContent="space-between"
          padding="0"
        >
          {benefits.map(({ icon: Icon, title, description }, index) => (
            <DescriptionCard
              key={index}
              rounded
              hoverable
              backgroundColor="white"
              width="calc(30% - 12px)"
              margin="0 0 24px"
              minHeight="auto"
              imgSrc=""
              imgAlt=""
            >
              <Typography
                as="span"
                variant="copy"
                style={{ display: 'block', textAlign: 'center' }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '0.75rem',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#fef3c7',
                      padding: '12px',
                      borderRadius: '9999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={24} color="#f9b000" strokeWidth={2} />
                  </div>
                </div>
                <strong
                  style={{
                    display: 'block',
                    marginBottom: '0.25rem',
                    fontSize: '1rem',
                  }}
                >
                  {title}
                </strong>
                <span style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>
                  {description}
                </span>
              </Typography>
            </DescriptionCard>
          ))}
        </FluidContainer>
      </FluidContainer>

      <FluidContainer flex flexWrap={isTablet ? 'wrap' : 'nowrap'}>
        <Image
          margin="auto"
          borderRadius="12px"
          src="/departments/ccc/nuestra-teaser.jpeg"
          alt="Nuestra Grad smiling while giving a hug"
          width={isMobile ? '100%' : '45%'}
          height={isMobile ? '100%' : '45%'}
        />
        <FluidContainer>
          <Typography variant="titleSmall" as="h2">
            Students can participate through:
          </Typography>
          <ul
            style={{
              margin: '24px 0',
              paddingLeft: '1.5rem',
              listStyleType: 'disc',
            }}
          >
            {[
              'Attendance at LEAD Series workshops',
              'Attendance at the annual Student Leadership Conference',
              'Participation in trainings available at Cal State LA (Undocually, VetNet Ally, Mental Health First Aid, etc.)',
              'Participation in service projects/service hours',
              'Completing online learning modules assigned on Canvas',
              'Joining student organization(s)',
            ].map((text, idx) => (
              <li key={idx} style={{ marginBottom: '1rem' }}>
                <Typography as="span" variant="copy">
                  {text}
                </Typography>
              </li>
            ))}
          </ul>
        </FluidContainer>
      </FluidContainer>
    </Page>
  );
}
