import Head from 'next/head';
import styled from 'styled-components';
import { Page, Header } from 'modules';
import { Spaces } from 'theme';
import { Button, Card, FluidContainer, Image, Typography } from 'components';
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
  {
    text: 'Program Portfolio',
    href: 'https://www.dropbox.com/scl/fi/umgxniy3fxfocj60vmxja/ACHA_Poster_Final_5.31.22.pdf?rlkey=hel3lzj55v8tuzao50fvu66y1&raw=1',
  },
  {
    text: 'Meet Your Educators',
    href: '/departments/recreation/gene-spring-2024.docx',
  },
];

export default function Gene() {
  const { isDesktop, isMobile } = useBreakpoint();

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
          content="At gene, we believe we all can benefit from learning new skills and
          receiving support to live our best lives. We are your partner in
          change and want to support you in fostering new possibilities and
          discovering habits of well-being that will last a lifetime."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FluidContainer flex flexDirection="row" padding="0px">
        <Header
          title="Golden Eagle Nutrition Education (GENE)"
          buttons={buttons}
        >
          {isDesktop && isMobile && (
            <Image
              src="https://www.dropbox.com/scl/fi/x06btckk835exjbsp6m5i/orangeeatinglaptopman.png?rlkey=eqtehnbu4xze03wln81960lew&raw=1"
              alt="young man using gene services on mobile"
              height="232px"
              margin="0px auto"
            />
          )}
          <Typography as="p">
            At GENE, we believe we all can benefit from learning new skills and
            receiving support to live our best lives. We are your partner in
            change and want to support you in fostering new possibilities and
            discovering habits of well-being that will last a lifetime.
          </Typography>
        </Header>
        {!isDesktop && (
          <Image
            src="https://www.dropbox.com/scl/fi/x06btckk835exjbsp6m5i/orangeeatinglaptopman.png?rlkey=eqtehnbu4xze03wln81960lew&raw=1"
            alt="young man using gene services"
            height="500px"
            margin="auto"
          />
        )}
        {!isMobile && isDesktop && (
          <Image
            src="https://www.dropbox.com/scl/fi/x06btckk835exjbsp6m5i/orangeeatinglaptopman.png?rlkey=eqtehnbu4xze03wln81960lew&raw=1"
            alt="a young man using gene services eating an apple"
            height="250px"
            margin="auto"
          />
        )}
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        innerMinHeight="200px"
        backgroundColor="primary"
      >
        <Typography margin="auto" variant="title" as="h2">
          Welcome!
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
        </WelcomeContentContainer>
        <Button variant="black" href="https://forms.office.com/r/GCaxAbqwQZ">
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
          What to expect:
        </Typography>
        <FluidContainer flex flexWrap="wrap" padding="0px">
          {cards.map((props) => (
            <Card
              margin={`${Spaces.md}`}
              topBorder
              key={`${props.title}`}
              {...props}
              width={isDesktop ? '100%' : 'calc(30.33% - 8px)'}
              minHeight="200px"
              iconWidth="100px"
            ></Card>
          ))}
        </FluidContainer>
      </FluidContainer>
    </Page>
  );
}
