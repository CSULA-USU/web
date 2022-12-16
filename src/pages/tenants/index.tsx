import Head from 'next/head';
import { Page } from 'modules';
import { Spaces } from 'theme';
import styled from 'styled-components';
import { Typography, Card, FluidContainer } from 'components';

const TenantsTopContainer = styled.div`
  background-image: url('subtle-background-1.jpg');
  background-position: center;
  background-size: cover;
  padding: 72px 72px;
`;

const TenantsText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
`;

const cards = [
  {
    title: 'Alumni Association',
    children:
      'Cal State LA Alumni Association is dedicated to past and present students desiring to stay involved in the Cal State LA community. ',
    linkText: 'Learn More',
    href: '#',
    iconSrc: '/calstatela-badge.svg',
    iconAlt: 'Cal State LA Logo',
  },
  {
    title: 'Associated Students, Incorporated',
    children:
      'Associated Students, Incorporated (ASI) is a non-profit student-run auxiliary governed by a Board of Directors elected by the student body of Cal State LA. Assisting in the protection of student rights and interests, ASI provides the means for effective input into the governance of the campus and is the official avenue through which student opinion is expressed. ASI offers students experience in responsible political participation, as they advocate for the protection of higher education at the state and federal level. With the support of professional staff, the Board sets strategic goals and policy priorities, while members represent student interests on ASI-internal and University-wide committees. The Board and Professional Staff manage the day-to-day operations of the corporation providing students, faculty and staff dynamic programming, support and services.',
    linkText: 'Learn More',
    href: '#',
    iconSrc: '/asi-logo.png',
    iconAlt: 'Cal State LA Logo',
  },
  {
    title: 'College of Professional and Global Education',
    children:
      'The College of Professional and Global Education delivers innovative classes, certificates and degree programs to meet the educational needs of the citizens of Los Angeles and beyond. The college also provides services for international students and scholars and serves as the lead campus entity on all matters pertaining to global education.',
    linkText: 'Learn More',
    href: '#',
    iconSrc: '/calstatela-badge.svg',
    iconAlt: 'Cal State LA Logo',
  },
  {
    title: 'Information Technology Services',
    children:
      'Information Technology Services is one of five Open Access Labs (OALs) spread out on campus. These labs are made available to assist Cal State LA students to accomplish their academic goal for instruction and research, students must have a current student ID and a Network Information Services (NIS) account. Though all of the OALs provides identical services to the campus community, they offer slightly different equipments, hardware and software depending on various needs in each geographical area on campus.',
    linkText: 'Learn More',
    href: '#',
    iconSrc: '/calstatela-badge.svg',
    iconAlt: 'Cal State LA Logo',
  },
  {
    title: 'Wells Fargo',
    children:
      'You can open a Wells Fargo College Checking account at any Wells Fargo Banking location or visit the Wells Fargo Banking Branch on Campus! Located in the new University Student Union Building Room 103.',
    linkText: 'Learn More',
    href: '#',
    iconSrc: '/wells-fargo.png',
    iconAlt: 'Wells Fargo Logo',
  },
  {
    title: 'Sbarro',
    children:
      'Extraordinary food and atmosphere, time-honored family recipes and the finest quality ingredients are the hallmarks of the Sbarro brand. From the moment our customers walk through the door, they know that dining at Sbarro will be a distinctive Italian experience.',
    linkText: 'Learn More',
    href: '#',
    iconSrc: '/sbarro-logo.png',
    iconAlt: 'Sbarro logo',
  },
  {
    title: 'Starbucks',
    children:
      'It takes many hands to craft the perfect cup of coffee – from the farmers who tend to the red-ripe coffee cherries, to the master roasters who coax the best from every bean, and to the barista who serves it with care. We are committed to the highest standards of quality and service, embracing our heritage while innovating to create new experiences to savor.',
    linkText: 'Learn More',
    href: '#',
    iconSrc: '/starbucks-logo.png',
    iconAlt: 'Starbucks Logo',
  },
];

export default function Tenants() {
  return (
    <Page>
      <Head>
        <title>Tenants</title>
        <meta name="author" content="Tenants" />
        <meta
          name="keywords"
          content="The University-Student Union mission is to provide a unique and friendly environment for the campus community to interact informally. Our services and facilities departments provide convenience and easy availability for on-the-go students."
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TenantsTopContainer>
        <FluidContainer>
          <TenantsText>
            <Typography as="h2" variant="pageHeader">
              Tenants
            </Typography>
            <Typography margin="0 0 24px">
              The University-Student Union mission is to provide a unique and
              friendly environment for the campus community to interact
              informally. Our services and facilities departments provide
              convenience and easy availability for on-the-go students.
            </Typography>
          </TenantsText>
        </FluidContainer>
      </TenantsTopContainer>
      <FluidContainer flex flexWrap="wrap">
        {cards.map((props) => (
          <Card
            margin={`${Spaces.md}`}
            topBorder
            key={`${props.title}`}
            {...props}
            width="calc(30.33% - 8px)"
            minHeight="280px"
          >
            {`${
              props.children.length > 200
                ? props.children.substring(0, 200) + '...'
                : props.children
            }`}
          </Card>
        ))}
      </FluidContainer>
    </Page>
  );
}
