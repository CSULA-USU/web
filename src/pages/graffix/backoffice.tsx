import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Card,
  FluidContainer,
  SideImageHeader,
  Typography,
} from 'components';
import { useBreakpoint } from 'hooks';
import { GenericModal, Page } from 'modules';
import { media, Spaces } from 'theme';
interface TenantCardData {
  title: string;
  children: string;
  iconSrc: string;
  iconAlt: string;
  number: string;
}

const RequestContainer = styled.div`
  ${media('tablet')(`min-width: 100%;`)}
  min-width: calc(33.33% - 8px);
  flex: 1;
  margin: ${Spaces.lg} 0;
`;
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
    iconSrc:
      '/departments/graffix/backoffice/request-images/individual-campaign.svg',
    iconAlt: 'individual campaign',
    children: '',
    number: '',
  },
  {
    title: 'Conference',
    iconSrc: '/departments/graffix/backoffice/request-images/conference.svg',
    iconAlt: 'conference',
    children: '',
    number: '',
  },
  {
    title: 'Awards',
    iconSrc: '/departments/graffix/backoffice/request-images/awards.svg',
    iconAlt: 'awards',
    children: '',
    number: '',
  },
  {
    title: 'Social Media',
    iconSrc: '/departments/graffix/backoffice/request-images/social-media.svg',
    iconAlt: 'social media',
    children: '',
    number: '',
  },
  {
    title: 'Single Item',
    iconSrc: '/departments/graffix/backoffice/request-images/single-item.svg',
    iconAlt: 'single item',
    children: 'asdf',
    number: '',
  },
  {
    title: 'Shirt',
    iconSrc: '/departments/graffix/backoffice/request-images/shirt.svg',
    iconAlt: 'shirt',
    children: 'asdf',
    number: '',
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
        <FluidContainer flex flexWrap="wrap" justifyContent="space-between">
          {requests.map((props) => (
            <RequestContainer
              key={props.title}
              onClick={() => {
                setModalData(props);
                setIsOpen(true);
              }}
            >
              <Card
                hoverable
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
      </FluidContainer>
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Guidelines
        </Typography>
      </FluidContainer>
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          What Programmers Will Receive From Graffix
        </Typography>
      </FluidContainer>
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Important Dates
        </Typography>
      </FluidContainer>
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Promotional Items Notes
        </Typography>
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
          <Typography margin={`${Spaces.md} 0`}>
            {modalData.children}
          </Typography>
        </GenericModal>
      )}
    </Page>
  );
}
