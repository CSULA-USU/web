import Head from 'next/head';
import styled from 'styled-components';
import { Page, EventCard } from 'modules';
import { Spaces } from 'theme';
import { Typography, Card, FluidContainer } from 'components';

const HeaderContent = styled.div`
  width: 80%;
  padding: 72px;
`;
const cards = [
  {
    title: 'Inclusive',
    children:
      'A welcoming, inclusive space to safely talk about your dietary patterns and nutritional needs.',
  },
  {
    title: 'Community',
    children:
      'Empowering conversations that focus on your strengths and areas for growth.',
  },
  {
    title: 'Set Goals',
    children:
      'Goal setting, problem-solving, and ongoing accountability to reach health goals that are important to you.',
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
          content="Here, you can sign up for personalized nutrition education sessions provided by our Cal State LA Nutritional Science students. Our student coaches can teach you everything you need to know about nutrition, plus the science of mindfulness and habit change. Think of your nutrition coach as a supportive mentor who can offer individual feedback and encouragement as you make food and lifestyle changes. At GENE, we believe we all can benefit from learning new skills and receiving support to live our best lives. We are your partner in change and want to support you in fostering new possibilities and discovering habits of well-being that will last a lifetime."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FluidContainer flex>
        <EventCard
          featured
          image="/event-0.jpg"
          org="Recreation"
          title="Golden Eagle Nutrition Education (GENE)"
          location="Zoom"
          time="12:00 AM – 11:59 PM"
          href="#"
        />
        <HeaderContent>
          <Typography margin="0 0 24px" variant="titleSmall">
            Join Us
          </Typography>
          <Typography margin="0 0 24px" variant="titleLarge" weight="400">
            Golden Eagle Nutrition Education (GENE)
          </Typography>
          <Typography>
            Welcome to the Golden Eagle Nutrition Education (GENE) program!
            Here, you can sign up for personalized nutrition education sessions
            provided by our Cal State LA Nutritional Science students. Our
            student coaches can teach you everything you need to know about
            nutrition, plus the science of mindfulness and habit change. Think
            of your nutrition coach as a supportive mentor who can offer
            individual feedback and encouragement as you make food and lifestyle
            changes. At GENE, we believe we all can benefit from learning new
            skills and receiving support to live our best lives. We are your
            partner in change and want to support you in fostering new
            possibilities and discovering habits of well-being that will last a
            lifetime.
          </Typography>
        </HeaderContent>
      </FluidContainer>

      <FluidContainer flex flexWrap="wrap">
        {cards.map((props) => (
          <Card
            margin={`${Spaces.md}`}
            topBorder
            key={`${props.title}`}
            {...props}
            width="calc(30.33% - 8px)"
            minHeight="200px"
          ></Card>
        ))}
      </FluidContainer>
    </Page>
  );
}
