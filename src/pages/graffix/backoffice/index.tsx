import Head from 'next/head';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Button, Card, FluidContainer, Image, Typography } from 'components';
import items from 'data/backoffice.json';
import { useBreakpoint } from 'hooks';
import { GenericModal, GraffixGuidelines, Page } from 'modules';
import { media, Spaces } from 'theme';

interface TenantCardData {
  title: string;
  children: ReactNode;
  iconSrc: string;
  iconAlt: string;
}

const RequestContainer = styled.div`
  ${media('tablet')(`min-width: 100%;`)}
  min-width: calc(33.33% - 8px);
  flex: 1;
  margin: ${Spaces.lg} 0;
  font-decoration: none;
`;

const SideImageHeaderRoot = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  min-height: 360px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSlot = styled.div`
  aspect-ratio: 1;
  width: 100%;
  overflow: hidden;
`;

const ContentSlot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const requests = [
  {
    title: 'Package A',
    iconSrc:
      '/departments/graffix/backoffice/request-images/individual-campaign.svg',
    iconAlt: 'Package A request info',
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Social Media
        </Typography>
        <Typography as="p">IG Post/Story</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Small Print
        </Typography>
        <Typography as="p">Poster</Typography>
        <Typography as="p">Postcard</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Large Print
        </Typography>
        <Typography as="p">Large Poster</Typography>
        <Typography as="p">Window Decal</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Banners
        </Typography>
        <Typography as="p">12&apos; x 4&apos;</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Signage
        </Typography>
        <Typography as="p">A-Frame (2)</Typography>
        <Typography as="p">Location Signage (poster size)</Typography>
      </FluidContainer>
    ),
  },
  {
    title: 'Package B',
    iconSrc: '/departments/graffix/backoffice/request-images/party.svg',
    iconAlt: 'Package B Information',
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Social Media
        </Typography>
        <Typography as="p">IG Post/Story</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Small Print
        </Typography>
        <Typography as="p">Poster</Typography>
        <Typography as="p">Postcard</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Large Print
        </Typography>
        <Typography as="p">Large Poster</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Banners
        </Typography>
        <Typography as="p">3&apos; x 8&apos;</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Signage
        </Typography>
        <Typography as="p">A-Frame (2)</Typography>
      </FluidContainer>
    ),
  },
  {
    title: 'Package C',
    iconSrc: '/departments/graffix/backoffice/request-images/card.svg',
    iconAlt: 'Package C information',
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Social Media
        </Typography>
        <Typography as="p">IG Post/Story</Typography>
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Small Print
        </Typography>
        <Typography as="p">Poster</Typography>
        <Typography as="p">Postcard</Typography>
      </FluidContainer>
    ),
  },
  {
    title: 'Package D',
    iconSrc:
      '/departments/graffix/backoffice/request-images/features-overview.svg',
    iconAlt: 'Package D information',
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Single Item Request
        </Typography>
        <Typography as="p">Specify the Request</Typography>
      </FluidContainer>
    ),
  },
  {
    title: 'Package E',
    iconSrc:
      '/departments/graffix/backoffice/request-images/online-popularity.svg',
    iconAlt: 'Package E information',
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Department Social Media Design Post
        </Typography>
      </FluidContainer>
    ),
  },
  {
    title: 'Optional Promo',
    iconSrc: '/departments/graffix/backoffice/request-images/gift-box.svg',
    iconAlt: 'Package C information',
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
          Requires an additional week for design and print time
        </Typography>
        <Typography as="p">
          Needs to be disccussed prior to adding promo
        </Typography>
        <ol>
          <li>
            If solely requesting promo items, submit as a single item request
          </li>
        </ol>
        <Typography as="p">This is based on budget and capacity</Typography>
        <Typography as="p">Apparel</Typography>
        <ol>
          <li>Hats, shirts, hoodies, jackets, etc.</li>
        </ol>
        <Typography as="p">Products</Typography>
        <ol>
          <li>
            Bags, cups, planners, pens, stickers, pins (Enamel & Crocs), etc.
          </li>
        </ol>
        <Typography as="p">Outdoor</Typography>
        <ol>
          <li>Floor decals, large window decals (Window facing the plaza)</li>
        </ol>
      </FluidContainer>
    ),
  },
];

export default function Backoffice() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<TenantCardData | null>(null);

  return (
    <Page>
      <Head>
        <title>Graffix Backoffice</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <SideImageHeaderRoot>
        <ImageSlot>
          <Image
            src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/graffix/backoffice/graffix-future.webp"
            alt="future graffix office"
            width="1600"
            height="900"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </ImageSlot>

        <ContentSlot>
          <Typography
            as="h1"
            variant="pageHeader"
            size={isDesktop ? '2xl' : isTablet ? '3xl' : '4xl'}
            margin={`${Spaces.lg} 0 ${Spaces.lg} 0`}
          >
            Graffix Backoffice
          </Typography>
          <Typography
            as="p"
            variant="title"
            size={isDesktop ? 'lg' : isTablet ? 'xl' : '2xl'}
          >
            Requests for Graphics
          </Typography>
          <Typography
            as="p"
            variant="title"
            size={isDesktop ? 'lg' : isTablet ? 'xl' : '2xl'}
            margin={`0 0 ${Spaces.lg} 0`}
          >
            Spring 2026
          </Typography>
          <Button href="https://form.jotform.com/231835701552150" margin="3%">
            Request Form
          </Button>
        </ContentSlot>
      </SideImageHeaderRoot>
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Marketing Packages
        </Typography>
      </FluidContainer>
      <FluidContainer
        flex
        flexWrap="wrap"
        justifyContent="space-between"
        padding="0px 32px"
      >
        {requests.map((props) => (
          <RequestContainer
            key={props.title}
            onClick={() => {
              setModalData(props);
              setIsOpen(true);
            }}
          >
            <Card
              topBorder
              iconAlt={`${props.iconAlt}`}
              iconSrc={`${props.iconSrc}`}
              key={`${props.title}`}
              margin={`${Spaces.md}`}
              minHeight="100%"
              title={`${props.title}`}
            ></Card>
          </RequestContainer>
        ))}
      </FluidContainer>
      <GraffixGuidelines />
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Item Selection Examples:
        </Typography>
        <FluidContainer
          flex
          flexWrap="wrap"
          padding="0px"
          justifyContent="space-between"
        >
          {items.map((item) => (
            <Card
              width={isMobile ? '100%' : '45%'}
              key={item.title}
              margin={`${Spaces.md} 0px`}
            >
              <Image src={item.src} alt={item.alt} width="100%" />
              <Typography as="p">{item.title}</Typography>
            </Card>
          ))}
        </FluidContainer>
      </FluidContainer>
      {modalData && (
        <GenericModal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <Typography variant="titleSmall" as="h2" margin="16px 0">
            {modalData.title}
          </Typography>
          <br />
          {modalData.children}
        </GenericModal>
      )}
    </Page>
  );
}
