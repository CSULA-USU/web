import Head from 'next/head';
import styled from 'styled-components';
import {
  Button,
  FluidContainer,
  SideImageHeader,
  Typography,
} from 'components';
import { useBreakpoint } from 'hooks';
import { ImageAndCard, Page } from 'modules';
import { media, Spaces } from 'theme';

const HeaderContainer = styled.div`
  width: 50%;
  ${media('tablet')(`width:50%;`)}
  ${media('desktop')(`width:50%;`)}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
`;
const requests = [
  {
    title: 'Individual',
    children:
      'Join us for events on campus like movie nights, arts and crafts, leadership workshops, pet therapy and off campus for musical theater trips, theme park visits, and leadership retreats. New events are hosted each semester!',
    imgSrc: '/vectors/csi/trip.svg',
    imgAlt: 'trip image',
    href: 'https://calstatela.presence.io/events',
    linkText: 'Learn More',
  },
  {
    title: 'Conference',
    children:
      'Join us for events on campus like movie nights, arts and crafts, leadership workshops, pet therapy and off campus for musical theater trips, theme park visits, and leadership retreats. New events are hosted each semester!',
    imgSrc: '/vectors/csi/trip.svg',
    imgAlt: 'trip image',
    href: 'https://calstatela.presence.io/events',
    linkText: 'Learn More',
  },
  {
    title: 'Awards',
    children:
      'Join us for events on campus like movie nights, arts and crafts, leadership workshops, pet therapy and off campus for musical theater trips, theme park visits, and leadership retreats. New events are hosted each semester!',
    imgSrc: '/vectors/csi/trip.svg',
    imgAlt: 'trip image',
    href: 'https://calstatela.presence.io/events',
    linkText: 'Learn More',
  },
  {
    title: 'Social Media',
    children:
      'Join us for events on campus like movie nights, arts and crafts, leadership workshops, pet therapy and off campus for musical theater trips, theme park visits, and leadership retreats. New events are hosted each semester!',
    imgSrc: '/vectors/csi/trip.svg',
    imgAlt: 'trip image',
    href: 'https://calstatela.presence.io/events',
    linkText: 'Learn More',
  },
  {
    title: 'Single Item',
    children:
      'Join us for events on campus like movie nights, arts and crafts, leadership workshops, pet therapy and off campus for musical theater trips, theme park visits, and leadership retreats. New events are hosted each semester!',
    imgSrc: '/vectors/csi/trip.svg',
    imgAlt: 'trip image',
    href: 'https://calstatela.presence.io/events',
    linkText: 'Learn More',
  },
  {
    title: 'Shirt',
    children:
      'Join us for events on campus like movie nights, arts and crafts, leadership workshops, pet therapy and off campus for musical theater trips, theme park visits, and leadership retreats. New events are hosted each semester!',
    imgSrc: '/vectors/csi/trip.svg',
    imgAlt: 'trip image',
    href: 'https://calstatela.presence.io/events',
    linkText: 'Learn More',
  },
];

export default function Backoffice() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  return (
    <Page>
      <Head>
        <title>Graffix Backoffice</title>
        <meta name="author" content="Graffix Backoffice" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideImageHeader
        imgAlt="future graffix office"
        imgSrc="/departments/graffix/backoffice/graffix-future.png"
        imgWidth={isDesktop ? '100%' : '50%'}
      >
        <HeaderContainer>
          <Typography
            as="h1"
            variant="pageHeader"
            size={isDesktop ? '2xl' : isTablet ? '3xl' : '4xl'}
            margin={isMobile ? `${Spaces.md} 0 ${Spaces.md} 0` : `0 0}`}
          >
            Graffix Backoffice
          </Typography>
          <Typography
            as="p"
            variant="title"
            size={isDesktop ? 'lg' : isTablet ? 'xl' : '2xl'}
          >
            Requests for Graphics for Summer and Fall 2023
          </Typography>
          <Button href="https://form.jotform.com/222994969107168" margin="16px">
            Request Form
          </Button>
        </HeaderContainer>
      </SideImageHeader>
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Types of Requests
        </Typography>
        {requests.map((props) => (
          <ImageAndCard key={props.title} {...props} />
        ))}
      </FluidContainer>
    </Page>
  );
}
