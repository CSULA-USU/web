import Head from 'next/head';
import styled from 'styled-components';
import { Page, EventCard } from 'modules';
import { Spaces } from 'theme';
import { Typography, Card, FluidContainer, Button } from 'components';

const HeaderContent = styled.div`
  width: 80%;
  padding: 72px;
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
export default function Gene() {
  return (
    <Page>
      <Head>
        <title>Recreation - GENE</title>
        <meta name="author" content="Recreation" />
        <meta
          name="keywords"
          content="recreation fitness workout calstate la los angeles cal state california state university csula chris balam jay san luis gym"
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
      <FluidContainer flex>
        <HeaderContent>
          <Typography margin="0 0 24px" variant="titleLarge" weight="400">
            Golden Eagle Nutrition Education (GENE)
          </Typography>
          <Typography>
            At GENE, we believe we all can benefit from learning new skills and
            receiving support to live our best lives. We are your partner in
            change and want to support you in fostering new possibilities and
            discovering habits of well-being that will last a lifetime.
          </Typography>
          <Typography margin="24px 0 24px" size="md" weight="700">
            Schedule your appointment today by filling out an RSVP form with the
            RSVP button to be partnered with a Nutrition Educator! Please allow
            24 hours to be scheduled.
          </Typography>
          <Typography margin="0 0 24px" weight="700" size="md">
            Student organizations must complete and submit this form at least 10
            business days prior to the event/meeting date. Reservations for
            on-campus events/meetings will not be confirmed unless this form has
            been completed.
          </Typography>
          <Button margin={`0 ${Spaces.sm} 0 0`} variant="black">
            Linktree
          </Button>
          <Button variant="black"> Meet your Educators </Button>
        </HeaderContent>
        <EventCard
          featured
          image="/recreation/gene-event.png"
          org="Recreation"
          title="Golden Eagle Nutrition Education (GENE)"
          location="Zoom"
          time="12:00 AM – 11:59 PM"
          href="#"
        />
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMinHeight="200px"
        backgroundColor="primary"
      >
        <Typography variant="title" margin="24px 72px 0 72px">
          Welcome
        </Typography>
        <Typography margin="0 72px 32px">
          Welcome to the Golden Eagle Nutrition Education (GENE) program! Here,
          you can sign up for personalized nutrition education sessions provided
          by our Cal State LA Nutritional Science students. Our student coaches
          can teach you everything you need to know about nutrition, plus the
          science of mindfulness and habit change. Think of your nutrition coach
          as a supportive mentor who can offer individual feedback and
          encouragement as you make food and lifestyle changes.
        </Typography>
      </FluidContainer>
      <FluidContainer
        flex
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="title">What to expect</Typography>
        <FluidContainer flex>
          {cards.map((props) => (
            <Card
              margin={`${Spaces.md}`}
              topBorder
              key={`${props.title}`}
              {...props}
              width="calc(30.33% - 8px)"
              minHeight="200px"
              iconWidth="100px"
            ></Card>
          ))}
        </FluidContainer>
      </FluidContainer>
    </Page>
  );
}
