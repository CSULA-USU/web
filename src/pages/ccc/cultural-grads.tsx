import styled from 'styled-components';
import Head from 'next/head';
import { Button, Card, FluidContainer, Image, Typography } from 'components';
import { Page } from 'modules';
import { Spaces } from 'theme';

const TeaserContainer = styled.div`
  width: 500px;
  height: 520px;
  background: center / contain no-repeat
    url('/departments/ccc/nuestra-teaser.jpeg');
  border-radius: 12px;
`;

const cards = [
  {
    title: 'APIDA',
    children: 'Asian, Pacific Islander, South Asian, Desi-American',
    linkText: 'Apply Here',
    href: '#',
    iconSrc: '/departments/logos/apisrc-icon.svg',
    iconAlt: 'Cal State LA Logo',
  },
  {
    title: 'Black',
    children: 'Black, African-American, Pan-African Diaspora',
    linkText: 'Apply Here',
    href: '#',
    iconSrc: '/departments/logos/pasrc-icon.svg',
    iconAlt: 'Cal State LA Logo',
  },
  {
    title: 'Nuestra',
    children: 'Chicana/o, Latina/o, Central American, South American',
    linkText: 'Apply Here',
    href: '#',
    iconSrc: '/calstatela-badge.svg',
    iconAlt: 'Cal State LA Logo',
  },
  {
    title: 'Pride',
    children:
      'Lesbian, Gay, Bisexual, Trans, Queer, Intersex, Asexual + Community',
    linkText: 'Apply Here',
    href: '#',
    iconSrc: '/calstatela-badge.svg',
    iconAlt: 'Cal State LA Logo',
  },
];

export default function CCC() {
  return (
    <Page>
      <Head>
        <title>Cultural Graduate Celebrations</title>
        <meta
          name="author"
          content="The University Student Union Center for Student Involvement"
        />
        <meta
          name="keywords"
          content="csula cal state la student union center for student involvement csi u-su university-student"
        />
        <meta
          name="description"
          content="The Center for Student Involvement in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FluidContainer
        backgroundColor="primary"
        flex
        justifyContent="center"
        alignItems="center"
        innerMaxWidth="560px"
      >
        <Image
          src="/departments/ccc/ccc-grad-banner.jpg"
          alt="recreation logo"
          width="100%"
          height="fit-content"
        />
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection="column"
        backgroundImage="/bod-cta-background.jpg"
      >
        <FluidContainer flex>
          <FluidContainer flex flexDirection="column">
            <TeaserContainer />
            <Typography variant="titleSmall">Nuestra Grad &apos;22</Typography>
          </FluidContainer>
          <FluidContainer>
            <Typography variant="title">
              <u>2023 Cultural Graduate Celebrations</u>
            </Typography>
            <Typography margin="24px 0">
              <strong>Dear Cal State LA Prospective Graduate,</strong>
              <br />
              These ceremonies and celebrations are great opportunities to
              acknowledge your academic achievements, honor your families,
              communities, and other significant people in your lives, and to
              celebrate the cultural influences that have contributed to your
              academic success. The ceremonies are open to all students who
              would like to sign up and participate.
            </Typography>
            <Button variant="black">Apply now</Button>
          </FluidContainer>
        </FluidContainer>
        <Typography as="h2" variant="title">
          Graduations:
        </Typography>
        <FluidContainer flex flexWrap="wrap">
          {cards.map((props) => (
            <Card
              margin={`${Spaces.md}`}
              topBorder
              key={`${props.title}`}
              {...props}
              width="calc(22% - 8px)"
              minHeight="280px"
            >
              {/* {if (props.title === 'APIDA') {
              return(
                  <h1>this is apida grad</h1>
              )
            }}
            {props.title === 'Pride' ? (
            <div>
            <h1>Date: January 13</h1>
            <br />
            </div>) : ''}
            <br />
            <br /> */}
              {`${
                props.children.length > 200
                  ? props.children.substring(0, 200) + '...'
                  : props.children
              }`}
              <br />
              <br />
            </Card>
          ))}
        </FluidContainer>
      </FluidContainer>
    </Page>
  );
}
