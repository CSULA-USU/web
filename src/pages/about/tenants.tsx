import Head from 'next/head';
import { useState } from 'react';
import { Page, GenericModal, Header } from 'modules';
import { Spaces, media } from 'theme';
import styled from 'styled-components';
import { Typography, Card, FluidContainer, Image } from 'components';

interface TenantCardData {
  title: string;
  children: string;
  iconSrc: string;
  iconAlt: string;
  number: string;
}

const CardContainer = styled.div`
  ${media('tablet')(`min-width: 100%;`)}
  min-width: calc(33.33% - 8px);
  flex: 1;
  margin: ${Spaces.lg} 0;
  cursor: pointer;

  &:hover {
    & > div {
      opacity: 0.8;
      transition: opacity 0.2s ease-in-out;
    }
  }

  img {
    width: 100%;
    height: auto;
    max-height: 80px;
    object-fit: contain;
    aspect-ratio: 3 / 2;
  }
`;

const cards = [
  {
    title: 'Alumni Association',
    children:
      'Cal State LA Alumni Association is dedicated to past and present students desiring to stay involved in the Cal State LA community. ',
    iconSrc: '/calstatela-badge.svg',
    iconAlt: 'Cal State LA Alumni Logo',
    number: '323-343-2586',
  },
  {
    title: 'Associated Students, Incorporated',
    children:
      'Associated Students, Incorporated (ASI) is a non-profit student-run auxiliary governed by a Board of Directors elected by the student body of Cal State LA...',
    iconSrc: '/about/tenants/asi-logo.png',
    iconAlt: 'ASI Logo',
    number: '323-343-4780',
  },
  {
    title: 'In the Making',
    children:
      'In the Making is a nonprofit organization serving as a community resource center providing clothing and household items to individuals, groups and organizations as well as being a source for youth capacity building in a nonprofit environment.  Our programs form partnerships with schools, corporations and government agencies in order to serve the community.',
    iconSrc:
      'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/tenants/ITM_logo_black.png',
    iconAlt: 'In the Making Logo',
    number: '',
  },
  {
    title: 'Sbarro',
    children:
      'Extraordinary food and atmosphere, time-honored family recipes and the finest quality ingredients are the hallmarks of the Sbarro brand. From the moment our customers walk through the door, they know that dining at Sbarro will be a distinctive Italian experience.',

    iconSrc: '/about/tenants/sbarro-logo.png',
    iconAlt: 'Sbarro Logo',
    number: '323-225-1464',
  },
  {
    title: 'Starbucks',
    children:
      'It takes many hands to craft the perfect cup of coffee – from the farmers who tend to the red-ripe coffee cherries, to the master roasters who coax the best from every bean, and to the barista who serves it with care. We are committed to the highest standards of quality and service, embracing our heritage while innovating to create new experiences to savor.',
    iconSrc: '/about/tenants/starbucks-logo.png',
    iconAlt: 'Starbucks Logo',
    number: '323-343-6793',
  },
];

export default function Tenants() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<TenantCardData | null>(null);

  return (
    <Page>
      <Head>
        <title>Tenants & Dining | U&ndash;SU</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="author"
          content="University-Student Union at Cal State LA"
          key="author"
        />
        <meta
          name="description"
          content="Find essential services and dining at the Cal State LA U-SU. Home to ASI, the Alumni Association, Open Access Computer Labs, Starbucks, and Sbarro."
          key="description"
        />
        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="U-SU Tenants: Dining, Services, and Student Government"
          key="og-title"
        />
        <meta
          property="og:description"
          content="Meet our partners. From student government (ASI) to your morning coffee at Starbucks, explore the organizations and eateries located inside the U-SU."
          key="og-desc"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/about/tenants"
        />
        <meta
          property="og:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan/usu-dark-logo.webp"
          key="og-image"
        />

        {/* Twitter - Upgraded to large_image for better visibility */}
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href="https://www.calstatelausu.org/about/tenants"
        />

        {/* Structured Data for a Directory of Organizations */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'University-Student Union Tenants',
              description:
                'Directory of dining and student services located within the U-SU.',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  item: {
                    '@type': 'Organization',
                    name: 'Alumni Association',
                    telephone: '323-343-2586',
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  item: {
                    '@type': 'Organization',
                    name: 'Associated Students, Inc. (ASI)',
                    telephone: '323-343-4780',
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  item: {
                    '@type': 'FoodEstablishment',
                    name: 'Starbucks',
                    telephone: '323-343-6793',
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  item: {
                    '@type': 'FoodEstablishment',
                    name: 'Sbarro',
                    telephone: '323-225-1464',
                  },
                },
              ],
            }),
          }}
        />
      </Head>
      <Header title="Tenants">
        The University-Student Union mission is to provide a unique and friendly
        environment for the campus community to interact informally. Our
        services and facilities departments provide convenience and easy
        availability for on-the-go students.
      </Header>

      <FluidContainer flex flexWrap="wrap" justifyContent="space-between">
        {cards.map((props) => (
          <CardContainer
            key={props.title}
            onClick={() => {
              setModalData(props);
              setIsOpen(true);
            }}
          >
            <Card margin={`${Spaces.md}`} topBorder {...props} minHeight="100%">
              {`${
                props.children.length > 200
                  ? props.children.substring(0, 200) + '...'
                  : props.children
              }`}
            </Card>
          </CardContainer>
        ))}
      </FluidContainer>
      {modalData && (
        <GenericModal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <Typography variant="titleSmall" as="h2" margin="16px 0">
            {modalData.title}
          </Typography>
          <FluidContainer>
            <Image
              src={modalData.iconSrc}
              alt={modalData.iconAlt}
              maxHeight="150px"
              width="auto"
            />
          </FluidContainer>
          <Typography margin={`${Spaces.md} 0`}>
            {modalData.children}
          </Typography>
        </GenericModal>
      )}
    </Page>
  );
}
