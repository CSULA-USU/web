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
`;

const cards = [
  {
    title: 'Alumni Association',
    children:
      'Cal State LA Alumni Association is dedicated to past and present students desiring to stay involved in the Cal State LA community. ',
    iconSrc: '/calstatela-badge.svg',
    iconAlt: 'Cal State LA Logo',
    number: '323-343-2586',
  },
  {
    title: 'Associated Students, Incorporated',
    children:
      'Associated Students, Incorporated (ASI) is a non-profit student-run auxiliary governed by a Board of Directors elected by the student body of Cal State LA. Assisting in the protection of student rights and interests, ASI provides the means for effective input into the governance of the campus and is the official avenue through which student opinion is expressed. ASI offers students experience in responsible political participation, as they advocate for the protection of higher education at the state and federal level. With the support of professional staff, the Board sets strategic goals and policy priorities, while members represent student interests on ASI-internal and University-wide committees. The Board and Professional Staff manage the day-to-day operations of the corporation providing students, faculty and staff dynamic programming, support and services.',
    iconSrc: '/asi-logo.png',
    iconAlt: 'Cal State LA Logo',
    number: '323-343-4780',
  },
  {
    title: 'College of Professional and Global Education',
    children:
      'The College of Professional and Global Education delivers innovative classes, certificates and degree programs to meet the educational needs of the citizens of Los Angeles and beyond. The college also provides services for international students and scholars and serves as the lead campus entity on all matters pertaining to global education.',
    iconSrc: '/calstatela-badge.svg',
    iconAlt: 'Cal State LA Logo',
    number: '323-343-4900',
  },
  {
    title: 'Information Technology Services',
    children:
      'Information Technology Services is one of five Open Access Labs (OALs) spread out on campus. These labs are made available to assist Cal State LA students to accomplish their academic goal for instruction and research, students must have a current student ID and a Network Information Services (NIS) account. Though all of the OALs provides identical services to the campus community, they offer slightly different equipments, hardware and software depending on various needs in each geographical area on campus.',

    iconSrc: '/calstatela-badge.svg',
    iconAlt: 'Cal State LA Logo',
    number: '',
  },
  {
    title: 'Wells Fargo',
    children:
      'You can open a Wells Fargo College Checking account at any Wells Fargo Banking location or visit the Wells Fargo Banking Branch on Campus! Located in the new University Student Union Building Room 103.',

    iconSrc: '/wells-fargo.png',
    iconAlt: 'Wells Fargo Logo',
    number: '323-224-3972',
  },
  {
    title: 'Sbarro',
    children:
      'Extraordinary food and atmosphere, time-honored family recipes and the finest quality ingredients are the hallmarks of the Sbarro brand. From the moment our customers walk through the door, they know that dining at Sbarro will be a distinctive Italian experience.',

    iconSrc: '/sbarro-logo.png',
    iconAlt: 'Sbarro logo',
    number: '323-225-1464',
  },
  {
    title: 'Starbucks',
    children:
      'It takes many hands to craft the perfect cup of coffee – from the farmers who tend to the red-ripe coffee cherries, to the master roasters who coax the best from every bean, and to the barista who serves it with care. We are committed to the highest standards of quality and service, embracing our heritage while innovating to create new experiences to savor.',
    iconSrc: '/starbucks-logo.png',
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
        <title>U-SU Tenants</title>
        <meta name="author" content="Tenants" />
        <meta
          name="keywords"
          content="Alumni Association, Associated Students Incorporated, ASI, College of Professional and Global Education, PAGE, Information Technology Services, Open Access Labs, OAL, Wells Fargo, Sbarro, Starbucks"
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
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
            <Card
              hoverable
              margin={`${Spaces.md}`}
              topBorder
              key={`${props.title}`}
              {...props}
              minHeight="100%"
            >
              {`${
                props.children.length > 200
                  ? props.children.substring(0, 200) + '...'
                  : props.children
              }`}
            </Card>
          </CardContainer>
        ))}
        <CardContainer />
        <CardContainer />
      </FluidContainer>
      {modalData && (
        <GenericModal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <Typography variant="titleSmall" margin="16px 0">
            {modalData.title}
          </Typography>
          <div>
            <Image
              src={modalData.iconSrc}
              alt={modalData.iconAlt}
              width="100px"
            />
          </div>
          <Typography margin={`${Spaces.md} 0`}>
            {modalData.children}
          </Typography>
        </GenericModal>
      )}
    </Page>
  );
}
