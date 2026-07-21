import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import { Button, Card, FluidContainer, Image, Typography } from 'components';
import items from 'data/backoffice.json';
import requests from 'data/graffixRequestPackages.json';
import { useBreakpoint } from 'hooks';
import { GenericModal, GraffixGuidelines, Page } from 'modules';
import { media, Spaces } from 'theme';

interface PackageContentBlock {
  type: 'label' | 'text' | 'list';
  text?: string;
  items?: string[];
}

interface RequestPackage {
  title: string;
  iconSrc: string;
  iconAlt: string;
  content: PackageContentBlock[];
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

const requestPackages = requests as RequestPackage[];

function PackageContent({ content }: { content: PackageContentBlock[] }) {
  return (
    <FluidContainer
      flex
      flexDirection="column"
      justifyContent="center"
      innerMaxWidth="100%"
    >
      {content.map((block, index) => {
        if (block.type === 'label') {
          return (
            <Typography
              key={index}
              variant="label"
              as="h3"
              margin={`${Spaces.sm} 0`}
            >
              {block.text}
            </Typography>
          );
        }
        if (block.type === 'list') {
          return (
            <ol key={index}>
              {block.items?.map((listItem) => (
                <li key={listItem}>{listItem}</li>
              ))}
            </ol>
          );
        }
        return (
          <Typography key={index} as="p">
            {block.text}
          </Typography>
        );
      })}
    </FluidContainer>
  );
}

export default function Backoffice() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<RequestPackage | null>(null);

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
        {requestPackages.map((props) => (
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
          <PackageContent content={modalData.content} />
        </GenericModal>
      )}
    </Page>
  );
}
