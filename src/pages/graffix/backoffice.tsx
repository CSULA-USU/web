import Head from 'next/head';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Card,
  Divider,
  Expandable,
  FluidContainer,
  SideImageHeader,
  Typography,
} from 'components';
import { useBreakpoint } from 'hooks';
import { GenericModal, Page } from 'modules';
import { media, Spaces } from 'theme';
import { BiChevronRight } from 'react-icons/bi';

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
    children: (
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        innerMaxWidth="100%"
      >
        <Expandable
          indicator={<BiChevronRight color="black" size={48} />}
          header={
            <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
              Requirements
            </Typography>
          }
        >
          <Typography as="p" margin="0px 0px 8px">
            Event title
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Series or single event choice
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Event dates and times
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Design options
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Calendar descriptions
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Themes
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Social media choices
          </Typography>
        </Expandable>
        <Divider color="gold" />
        <Expandable
          indicator={<BiChevronRight color="black" size={48} />}
          header={
            <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
              Item Selection
            </Typography>
          }
        >
          <Typography as="h5" weight="700">
            Printed Items
          </Typography>
          <Typography as="p" margin="0px 0px 1px">
            Color Posters
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Postcards
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Button
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            UT Ad (Published Every Tuesday)
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Other (specify)
          </Typography>
          <br />
          <Typography as="h5" weight="700">
            Large Scale Items
          </Typography>
          <Typography as="p" margin="0px 0px 1px">
            Big Banner (22&quot; x 28&quot;)
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Foam Board (20&quot; x 30&quot;)
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Window Decal (CCC 35&quot; x 28&quot;)
          </Typography>
          <Typography as="h5" weight="700">
            Signage
          </Typography>
          <Typography as="p" margin="0px 0px 1px">
            2 A-Frame (24&quot; x 36&quot;)
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 1px">
            Vinyl (12&quot; x 4&quot;)
          </Typography>
          <br />
          <Typography as="p" margin="0px 0px 8px">
            Vinyl (3&quot; x 8&quot;)
          </Typography>
        </Expandable>
        <Divider color="gold" />
        <Expandable
          indicator={<BiChevronRight color="black" size={48} />}
          header={
            <Typography variant="label" as="h3" margin={`${Spaces.sm} 0`}>
              Social Media
            </Typography>
          }
        >
          <Typography as="p">Event title</Typography>
        </Expandable>
      </FluidContainer>
    ),
  },
  {
    title: 'Conference',
    iconSrc: '/departments/graffix/backoffice/request-images/conference.svg',
    iconAlt: 'conference',
    children: '',
  },
  {
    title: 'Awards',
    iconSrc: '/departments/graffix/backoffice/request-images/awards.svg',
    iconAlt: 'awards',
    children: '',
  },
  {
    title: 'Social Media',
    iconSrc: '/departments/graffix/backoffice/request-images/social-media.svg',
    iconAlt: 'social media',
    children: '',
  },
  {
    title: 'Single Item',
    iconSrc: '/departments/graffix/backoffice/request-images/single-item.svg',
    iconAlt: 'single item',
    children: 'asdf',
  },
  {
    title: 'Shirt',
    iconSrc: '/departments/graffix/backoffice/request-images/shirt.svg',
    iconAlt: 'shirt',
    children: 'asdf',
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
      <FluidContainer justifyContent="flex-start">
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
          {modalData.children}
        </GenericModal>
      )}
    </Page>
  );
}
