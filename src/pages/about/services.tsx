import Head from 'next/head';
import { Page, CircleImageAndTitle } from 'modules';
import { FluidContainer, Typography, Image } from 'components';
import styled from 'styled-components';
import { useBreakpoint } from 'hooks';
import { Colors, Spaces } from 'theme';

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${Spaces.lg};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
`;

const services = [
  {
    title: 'Nap Pods',
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
  {
    title: 'Sensory Room',
    children:
      'Feeling overwhelmed or overstimulated? Stop by the Sensory Room located in the Cross Cultural Centers in the University-Student Union! This new room is available to students to help you relax, decompress, and refocus if you are feeling stressed, overwhelmed, or overstimulated.',
    imgSrc:
      'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/services/Sensory-Room.webp',
    imgAlt: 'sensory room with calming lighting and seating',
    hoursOfOperation: 'Mon-Thu: 8AM-6PM\nFri: 8AM-5PM',
    phoneNumber: '323-343-5001',
    location: 'U-SU 2nd Floor Room 206',
    faq: [
      {
        question: 'What is a sensory room?',
        answer:
          'A sensory room is a controlled space with equipment and tools that stimulate or soothe the senses. The goal of this space is to help people self-regulate and manage sensory overload.',
      },
      {
        question: 'Where is the sensory room and when can I use it?',
        answer:
          'The sensory room is located in the Cross Cultural Centers (CCC) on the second floor of the University-Student Union. It is available during CCC operating hours: Monday through Thursday from 8 AM to 6 PM, and Friday from 8 AM to 5 PM.',
      },
      {
        question: 'What is available in the sensory room?',
        answer: {
          visual: ['Soft lighting'],
          touch: [
            'Textured wall panels',
            'Soft bean bags',
            'Weighted blankets',
            'Fidget toys',
            'Heating pad',
          ],
          sound: ['White noise machine', 'Noise cancelling headphones'],
          movement: ['Balance/Yoga ball', 'Exercise ball'],
          smell: ['Essential oil diffuser', 'Aromatherapy'],
          note: 'Additional sensory items may also be available.',
        },
      },
    ],
    guidelines: [
      {
        text: 'Be mindful of the time you spend in the room. We ask that you take no more than an hour to allow more students to use the space.',
      },
      {
        text: 'This is a small space, and only one person is allowed in the room at a time. If the room is being used, enjoy a hot cup of water or tea while you wait.',
      },
      {
        text: 'Respect the space. Handle items with care and put things back where you grabbed them.',
      },
      {
        text: 'This space is not meant to be used as a study room or nap pod. Use one of the many tables or desk areas around the U-SU and campus to study, or check in at the information desk to use the nap pods.',
      },
      {
        text: 'We cannot guarantee absolute silence in this space. Noise-cancelling headphones and earplugs are available.',
      },
    ],
    secondaryImgSrcs: [
      'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/services/03-Sensory-Room-Secondary-Image.webp',
      'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/services/01-Sensory-Room-Secondary-Image.webp',
      'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/services/02-Sensory-Room-Secondary-Image.webp',
    ],
    secondaryImgAlts: [
      'Corner of a wellness room with a balance ball chair, small storage unit, and calming wall decor.',
      'Wide view of a cozy wellness space with soft seating, storage cubes, rugs, and calming decorations.',
      'Relaxation corner with a large bean bag chair, plush pillows, blanket, and soothing wall art.',
    ],
  },
];

interface SquareImageContainerProps {
  src: string;
  alt: string;
  maxWidth?: string;
  objectFit?: 'cover' | 'contain';
  borderRadius?: string;
}

const Wrapper = styled.div<{ maxWidth?: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: 17 / 11;
  ${(p) => p.maxWidth && `max-width: ${p.maxWidth};`}
  overflow: hidden;
`;

const StyledImage = styled(Image)<{ objectFit: string; borderRadius?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: ${(p) => p.objectFit};
  ${(p) => p.borderRadius && `border-radius: ${p.borderRadius};`}
`;

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;

  align-items: flex-end;
  justify-content: center;

  padding-bottom: ${Spaces['2xl']};
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  top: -15px;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;

  filter: blur(0.5px);
  transform: scale(1.05);
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  max-width: 640px;
  margin: 0 auto;
  position: relative;
  padding: 8px;
  z-index: 2;

  & > * {
    position: relative;
    z-index: 2;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${Colors.white};
    opacity: 0.7;
    z-index: 1;
  }
`;

export const SquareImageContainer = ({
  src,
  alt,
  maxWidth,
  objectFit = 'cover',
  borderRadius = '12px',
}: SquareImageContainerProps) => (
  <Wrapper maxWidth={maxWidth}>
    <StyledImage
      src={src}
      alt={alt}
      objectFit={objectFit}
      style={{ borderRadius }}
    />
  </Wrapper>
);

export default function Services() {
  const { isMobile } = useBreakpoint();
  return (
    <Page>
      <Head>
        <title>Student Services & Amenities | Cal State LA U&ndash;SU</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="author"
          content="University-Student Union at Cal State LA"
          key="author"
        />
        <meta
          name="description"
          content="Explore free services at the Cal State LA Student Union, including Nap Pods, the Reflection Room, Lactation Room, and gender-inclusive restrooms."
          key="description"
        />
        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="Student Services & Amenities | University-Student Union"
          key="og-title"
        />
        <meta
          property="og:description"
          content="From high-tech Nap Pods to quiet Reflection Rooms, discover the amenities designed to support student health and wellness at Cal State LA."
          key="og-desc"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/about/services"
        />
        <meta
          property="og:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/services/about.png"
          key="og-image"
        />
        <meta
          property="og:image:alt"
          content="Nap Pods at the Cal State LA University-Student Union"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href="https://www.calstatelausu.org/about/services"
        />

        {/* Structured Data for Facilities */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'University-Student Union Services',
              description:
                'Physical amenities and wellness services provided by the U-SU for the Cal State LA community.',
              mainEntity: [
                {
                  '@type': ['Place', 'Service'],
                  name: 'Relaxation Station (Nap Pods)',
                  description:
                    'Three state-of-the-art sleep pods for 20-minute rest intervals.',
                  location: 'U-SU Room 304',
                },
                {
                  '@type': ['Place', 'Service'],
                  name: 'Reflection Room',
                  description:
                    'Space for quiet reflection, meditation, or prayer.',
                  location: 'U-SU Room 302',
                },
                {
                  '@type': ['Place', 'Service'],
                  name: 'Lactation Room',
                  description: 'Private space for nursing mothers.',
                  location: 'U-SU Room 206',
                },
              ],
            }),
          }}
        />
      </Head>

      {/* <Header
        title="Services"
        backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-1.webp"
      >
        <Image
          src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/services/about.png"
          alt="student union"
          width="100%"
          height="240px"
        />
        <Typography>
          The programs and services hosted by the University&ndash;Student Union
          are funded by the student union fee and are available to all students
          free of charge.
        </Typography>
      </Header> */}

      <HeroContainer>
        <BackgroundImage
          src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/services/Services-Hero.webp"
          alt="Cal State LA Fraternity and Sorority students"
        />
        <HeaderContainer>
          <Typography
            as="h1"
            variant="pageHeader"
            size={isMobile ? 'xl' : '4xl'}
            color="black"
          >
            Student Union Services
          </Typography>
        </HeaderContainer>
      </HeroContainer>
      <FluidContainer>
        <ServicesGrid>
          {services.map((props) => (
            <CircleImageAndTitle key={props.title} {...props} />
          ))}
        </ServicesGrid>
      </FluidContainer>
    </Page>
  );
}
