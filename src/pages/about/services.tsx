import Head from 'next/head';
import { Page, Header, ImageAndCard } from 'modules';
import { FluidContainer, Typography, Image } from 'components';
import styled from 'styled-components';
import { useBreakpoint } from 'hooks';
import { Spaces } from 'theme';
const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${Spaces.lg};
`;

const services = [
  {
    title: 'Nap Pods (Relaxation Station)',
    children:
      'In late 2019, the U-SU opened the Relaxation Station on the third floor Room 304 of the student union. The station is comprised of three state of the art sleep pods which provide a quiet, comfortable, and relaxing space for students to get some much needed rest. The pods are available for 20 minute intervals while the union is open. Prior reservations are required and only take a quick visit to the information desk in the U-SU lobby or by calling (323) 343-2465.',
    imgSrc:
      'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/services/nap-pod.png',
    imgAlt: 'sleeping pods at the student union',
  },
  {
    title: 'Reflection Room',
    children:
      'The U-SU provides a reflection room open to all community members for quiet reflection, meditation, or prayer. The Reflection Room (formerly named the Mediation Room) is located on the third floor in Room 302. After the 1997 renovation of the U-SU, a local artist created a meditation art installation in a vacant union storage space. The meditation space was very popular among students and soon became permanent. When the current U-SU opened in 2008, the Muslim Student Association and U-SU Board of Directors collaborated to recreate the installation as a permanent resource for students. The Reflection Room is utilized by students from all walks of life and tends to get heavier usage during times of student stress and holiday seasons. The space is open free of charge during all U-SU open hours, no reservations required.',
    imgSrc:
      'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/services/reflection-room.jpg',
    imgAlt: 'reflection room door and room',
  },
  {
    title: 'Lactation Room',
    children:
      'The lactation room is located in the Gender and Sexuality Center within the Cross Cultural Centers (CCC), Room 206. The space is open from 9:00 AM to 5:30 PM Monday through Friday. Reservations may be made at the front desk of the CCC at (323) 343-5001. Walk-ins are welcome based on availability.',
    imgSrc:
      'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/services/lactation-room.jpg',
    imgAlt: 'gsrc lactation room',
  },
  {
    title: 'Diaper Changing Station',
    children:
      'Each restroom on the first, second, and third floors of the U-SU are equipped with diaper changing stations open to all in the University community.',
    imgSrc:
      'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/services/diaper-station.jpg',
    imgAlt: 'bathroom diaper changing station',
  },
  {
    title: 'Gender-Inclusive Restrooms',
    children:
      'In 2016, the U-SU Board of Directors in consultation with the Associated Students, Inc. designated the restrooms on the second floor as gender inclusive. The rooms were retrofitted with stalls that created additional privacy and have provided supportive options for students across the gender identity spectrum.',
    imgSrc:
      'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/services/all-gender-restroom.jpg',
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

      <Header
        title="Services"
        backgroundImage="/backgrounds/subtle-background-1.jpg"
      >
        <Image
          src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/services/about.png"
          alt="student union"
          width="100%"
        />
        <Typography>
          The programs and services hosted by the University-Student Union are
          funded by the student union fee and are available to all students free
          of charge.
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
              imageWidth={isMobile ? '80%' : isTablet ? '60%' : '20%'}
              {...props}
            />
          ))}
        </ServicesContainer>
      </FluidContainer>
    </Page>
  );
}
