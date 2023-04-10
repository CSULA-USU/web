import Head from 'next/head';
import { Page, Header, ImageAndCard } from 'modules';
import { FluidContainer, Typography, Image } from 'components';
import styled from 'styled-components';
import { useBreakpoint } from 'hooks';

const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const services = [
  {
    title: 'Nap Pods (Relaxation Station)',
    children:
      'In late 2019, the U-SU opened the Relaxation Station on the third floor room 304 of the student union. The station is comprised of three state of the art sleep pods which provide quiet, comfortable, and relaxing space for student to get some much needed rest.  The pods are available for 20 minute intervals while the union is open. Prior reservations are required and only take a quick visit to the information desk in the U-SU lobby or by calling (323) 343-2465',
    imgSrc: '/about/nap-pod.png',
    imgAlt: 'sleeping pods at the student union',
  },
  {
    title: 'Reflection Room',
    children:
      'The U-SU provides a Reflection room open to all community members for quiet reflection, meditation, or prayer. The Reflection room (formerly named the Mediation room.) is located on the third floor in room 302. After the 1997 renovation of the previous U-SU a local artist created a meditation art instillation in a vacant union storage space. The meditation space was very popular among students and became permanent. When the current U-SU was opened in 2008. The Muslim Student Association and the U-SU Board of Directors collaborated to create the current space. The current space is utilized by students from all walks of life and tends to get heavier usage during times of student stress and holiday seasons. The space is open free of charge during all U-SU open hours. The room needs no reservations and is used by many community members.',
    imgSrc: '/about/reflection-room.jpg',
    imgAlt: 'reflection room door and room',
  },
  {
    title: 'Lactation Room',
    children:
      'The lactation room is located in the Gender and Sexuality Center within the Cross Cultural Centers (CCC), room 206. The space is open from 9:00 am – 5:30 pm Monday- Friday. Reservations may be made at the front desk of the CCC at (323) 343-5001. Walk-ins are welcome based on availability',
    imgSrc: '/about/lactation-room.jpg',
    imgAlt: 'gsrc lactation room',
  },
  {
    title: 'Diaper Changing Station',
    children:
      'Each restroom on the first, second, and third floors of the USU are equipped with diaper changing stations open to all in the University community parents and caregivers',
    imgSrc: '/about/diaper-station.jpg',
    imgAlt: 'bathroom diaper changing station',
  },
  {
    title: 'Gender-Inclusive Restrooms',
    children:
      'In 2016, the U-SU Board of Directors in consultation with the Associated Students, Inc. designated the restrooms on the second floor as gender inclusive. The rooms were retrofitted with stalls that created additional privacy and have provided supportive options for students across the gender identity spectrum',
    imgSrc: '/about/all-gender-restroom.jpg',
    imgAlt: 'gender inclusive bathroom sign',
  },
];

export default function Services() {
  const { isMobile, isTablet } = useBreakpoint();
  return (
    <Page>
      <Head>
        <title>University-Student Union Services</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, student, organizations, MORE, Cross Cultural Centers, Center For Student Involvement, Fitness Center, The Pit, The Gameroom, Student orgnizations, Calendar, Events, Gender and sexuality resource center, Pan African resource center, Asian Pacific islander, Chicana Latina, Information and Event Services, Distinguished Women, awards, Cultural Graduate Celebrations, LOUDmouth Zine, S.T.A.R.S. Program, Employment Opportunities, Board of Directors, Jobs"
        />
        <meta
          name="description"
          content="The University-Student Union inc.(U-SU) at California State University, Los Angeles was established in 1975 and provides a unique setting for the encouragement of broad social, cultural, recreational, and informal educational programming for the university and its surroundings."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title="Services" backgroundImage="subtle-background-1.jpg">
        <Image src="/about.png" alt="student union" width="100%" />
        <Typography>
          The programs and services hosted by the University-Student Union are
          funded by the student union fee and are available to all students free
          of charge
        </Typography>
      </Header>
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          The following services are provided by the U-SU:
        </Typography>
        <ServicesContainer>
          {services.map((props) => (
            <ImageAndCard
              key={props.title}
              imageWidth={isTablet ? '128px' : '184px'}
              {...props}
            />
          ))}
        </ServicesContainer>
      </FluidContainer>
    </Page>
  );
}
