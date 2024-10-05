import Head from 'next/head';
import styled from 'styled-components';
import { Page, Header } from 'modules';
import { Spaces } from 'theme';
import {
  Button,
  Card,
  FluidContainer,
  Icon,
  Image,
  Typography,
} from 'components';
import { useBreakpoint } from 'hooks';
import data from 'data/recreation.json';
import React from 'react';

const WelcomeContentContainer = styled.div`
  text-align: center;
`;

const buttons = [
  {
    text: 'Program Portfolio',
    href: 'https://www.dropbox.com/scl/fi/umgxniy3fxfocj60vmxja/ACHA_Poster_Final_5.31.22.pdf?rlkey=hel3lzj55v8tuzao50fvu66y1&raw=1',
  },
];

export default function Gene() {
  const { isDesktop, isMobile, isWidescreen } = useBreakpoint();
  const geneData = data.gene;

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
        <Button variant="black" href="https://forms.office.com/r/YFfnjw0K1F">
          RSVP
        </Button>
      </FluidContainer>
      <FluidContainer>
        <Typography variant="title" as="h2">
          <abbr title="gene">GENE</abbr> Bios Fall 2024:
        </Typography>
        <Typography as="p" margin="8px 0px 0px 0px">
          Our <abbr title="gene">GENE</abbr> coaches are all working to finish
          their Masters&apos; of Science in Nutrition here at Cal State LA.
        </Typography>
        <FluidContainer flex flexWrap="wrap" justifyContent="center">
          {geneData.educators.map((props) => (
            <Card
              margin={`${Spaces.md}`}
              topBorder
              key={`${props.iconAlt}`}
              {...props}
              width={isWidescreen ? '100%' : 'calc(48% - 8px)'}
              minHeight="200px"
              iconWidth="100px"
              iconElement={<Icon iconName={`${props.iconName}`} size="50px" />}
            />
          ))}
        </FluidContainer>
      </FluidContainer>
      <FluidContainer>
        <Typography variant="title" as="h2" margin="0px">
          What to expect:
        </Typography>
        <FluidContainer flex flexWrap="wrap">
          {geneData.cards.map((props) => (
            <Card
              margin={`${Spaces.md}`}
              key={`${props.title}`}
              {...props}
              width={isDesktop ? '100%' : 'calc(30.33% - 8px)'}
              minHeight="200px"
              iconWidth="100px"
            />
          ))}
        </FluidContainer>
      </FluidContainer>
    </Page>
  );
}
