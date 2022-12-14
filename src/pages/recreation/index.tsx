import Head from 'next/head';
import { Page } from 'modules';
import { Image, Typography, Card, Divider, FluidContainer } from 'components';

export default function Recreation() {
  return (
    <Page>
      <Head>
        <title>Recreation</title>
        <meta name="author" content="Recreation" />
        <meta
          name="keywords"
          content="recreation fitness workout calstate la los angeles cal state california state university csula chris balam jay san luis gym"
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FluidContainer
        backgroundImage="/recreation/recreation-hero-background.jpg"
        flex
        justifyContent="center"
        alignItems="center"
        innerMinHeight="640px"
        innerMaxWidth="640px"
      >
        <Image
          src="/recreation/recreation-hero.png"
          alt="recreation logo"
          width="100%"
          height="fit-content"
        />
      </FluidContainer>
      <FluidContainer flex justifyContent="space-between" alignItems="center">
        <div style={{ width: '60%' }}>
          <Typography as="h2" variant="pageHeader" lineHeight="1">
            The Recreation Fitness Center is now open!
          </Typography>
        </div>
        <div>
          <Typography as="h3" variant="titleSmall">
            Our Hours
          </Typography>
          <Typography margin="0 0 8px">
            Monday – Friday: 7:00 a.m. to 9:30 p.m. <br />
            Saturday: 7:00 a.m. to 2:30 p.m. <br />
            Sunday: Closed <br />
          </Typography>
        </div>
        <Divider />
      </FluidContainer>
      <FluidContainer flex justifyContent="space-between">
        <Typography margin="0 72px 0 0">
          Recreation at Cal State LA provides Golden Eagles with opportunities
          to play, exercise and engage their campus community through
          programming and events aimed toward enhancing the experience of all
          who participate.
        </Typography>
        <Typography>
          Recreation is comprised of the Recreation Fitness Center Center and
          Recreation Esports. The Recreation Fitness Center is located on the
          basement level of the U-SU, and will be open to all students, staff
          and faculty.
        </Typography>
      </FluidContainer>
      <FluidContainer backgroundColor="greyLighter">
        <Typography as="h3" variant="title" margin="24px 0 0 0">
          Our Newly Renovated Fitness Center is Ready For You!
        </Typography>
      </FluidContainer>
      <FluidContainer
        backgroundColor="greyLighter"
        flex
        justifyContent="space-between"
      >
        <Card width="calc(33.33% - 8px)" title="Major Expansion">
          <Image
            src="/recreation/recreation-treadmill.jpg"
            alt="todo:"
            width="100%"
          />
        </Card>
        <Card width="calc(33.33% - 8px)" title="All New Strength Equipment">
          <Image
            src="/recreation/recreation-bench.jpg"
            alt="todo:"
            width="100%"
          />
        </Card>
        <Card width="calc(33.33% - 8px)" title="New Rubber Flooring">
          <Image
            src="/recreation/recreation-floor-2.jpg"
            alt="todo:"
            width="100%"
          />
        </Card>
      </FluidContainer>
      <FluidContainer backgroundColor="primary">
        <Typography variant="titleLarge" margin="24px 0 24px">
          For updates and ways to connect now, follow @calstatela_recreation on
          Instagram!
        </Typography>
      </FluidContainer>
    </Page>
  );
}
