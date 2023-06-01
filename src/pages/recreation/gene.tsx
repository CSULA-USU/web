import Head from 'next/head';
import styled from 'styled-components';
import { Page, Header } from 'modules';
import { Spaces } from 'theme';
import { Typography, Card, FluidContainer, Button } from 'components';
import { useBreakpoint } from 'hooks';

const WelcomeContentContainer = styled.div`
  text-align: center;
`;

const cards = [
  {
    title: 'Inclusive',
    children:
      'A welcoming, inclusive space to safely talk about your dietary patterns and nutritional needs.',
    iconSrc: '/vectors/recreation/cooking.svg',
    iconAlt: 'cooking image',
  },
  {
    title: 'Community',
    children:
      'Empowering conversations that focus on your strengths and areas for growth.',
    iconSrc: '/vectors/recreation/group-workout.svg',
    iconAlt: 'community workout image',
  },
  {
    title: 'Set Goals',
    children:
      'Goal setting, problem-solving, and ongoing accountability to reach health goals that are important to you.',
    iconSrc: '/vectors/recreation/goal.svg',
    iconAlt: 'goal image',
  },
];

const buttons = [
  { text: 'Linktree', href: 'https://linktr.ee/CalStateLA_Recreation' },
  {
    text: 'Meet Your Educators',
    href: 'https://www.dropbox.com/s/kv2x9skhab6pn69/gene-bios.pdf?dl=0',
  },
];

export default function Gene() {
  const { isTablet } = useBreakpoint();

  return (
    <Page>
      <Head>
        <title>Recreation GENE</title>
        <meta name="author" content="Recreation" />
        <meta
          name="keywords"
          content="Recreation, Fitness, Workout, Calstate LA, CSULA, U-SU, University Student Union, Chris Balam Jay San Luis, Gym, GENE, Golden Eagle Nutrition Education, Nutrition"
        />
        <meta
          name="description"
          content="At GENE, we believe we all can benefit from learning new skills and
          receiving support to live our best lives. We are your partner in
          change and want to support you in fostering new possibilities and
          discovering habits of well-being that will last a lifetime."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Golden Eagle Nutrition Education (GENE)" buttons={buttons}>
        <Typography as="p">
          At GENE, we believe we all can benefit from learning new skills and
          receiving support to live our best lives. We are your partner in
          change and want to support you in fostering new possibilities and
          discovering habits of well-being that will last a lifetime.
        </Typography>
      </Header>
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        innerMinHeight="200px"
        backgroundColor="primary"
      >
        <Typography margin="auto" variant="title" as="h2">
          Welcome
        </Typography>
        <WelcomeContentContainer>
          <Typography as="p" margin="12px 0">
            Welcome to the Golden Eagle Nutrition Education (GENE) program!
            Here, you can sign up for personalized nutrition education sessions
            provided by our Cal State LA Nutritional Science students. Our
            student coaches can teach you everything you need to know about
            nutrition, plus the science of mindfulness and habit change. Think
            of your nutrition coach as a supportive mentor who can offer
            individual feedback and encouragement as you make food and lifestyle
            changes.
          </Typography>
          <Typography as="p" margin="24px 0" weight="700">
            Schedule your appointment today by filling out an RSVP form with the
            RSVP button to be partnered with a Nutrition Educator! Please allow
            24 hours to be scheduled. Student organizations must complete and
            submit this form at least 10 business days prior to the
            event/meeting date. Reservations for on-campus events/meetings will
            not be confirmed unless this form has been completed.
          </Typography>
        </WelcomeContentContainer>
        <Button
          variant="black"
          href="https://forms.office.com/pages/responsepage.aspx?id=AiCKzo9EWE-Csdhvc-Ov3V0syxBFmSRKh-en1AxipFNUNUFPNFZZVTQzRTBCOElUV0UzMUc1NDhKUy4u"
        >
          RSVP
        </Button>
      </FluidContainer>

      <FluidContainer
        flex
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="title" as="h2">
          What to expect
        </Typography>
        <FluidContainer flex flexWrap="wrap">
          {cards.map((props) => (
            <Card
              margin={`${Spaces.md}`}
              topBorder
              key={`${props.title}`}
              {...props}
              width={isTablet ? '100%' : 'calc(30.33% - 8px)'}
              minHeight="200px"
              iconWidth="100px"
            ></Card>
          ))}
        </FluidContainer>
      </FluidContainer>
    </Page>
  );
}
