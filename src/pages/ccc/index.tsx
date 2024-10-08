import styled from 'styled-components';
import Head from 'next/head';
import {
  Page,
  DepartmentHeader,
  // CallToAction,
  OfficeHours,
  ImageAndCard,
} from 'modules';
import {
  Typography,
  FluidContainer,
  Image,
  DescriptionCard,
  Button,
} from 'components';
import { Spaces } from 'theme';
import { useBreakpoint } from 'hooks';
import { Component as InstagramFeed } from 'sections/InstagramFeed/InstagramFeed';

const StudentOrgsCatergoriesContentContainer = styled.div`
  margin-top: ${Spaces['2xl']};
`;

const OrgsCategoriesCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const orgsCards = [
  {
    title: 'Asian Pacific Islander Student Resource Center',
    children:
      'The APISRC was established in 1993 to address the growing needs and concerns of the Asian, Pacific Islander, and Desi-American student population while enriching and raising social awareness for the entire campus community.',
    imgSrc: '/departments/ccc/apisrc/apisrcHeader.png',
    imgAlt: '',
    href: 'ccc/apisrc',
    linkText: 'Learn More',
  },
  {
    title: 'Chicana/o Latina/o Student Resource Center',
    children:
      'The CLSRC provides services and support for students who identify as, or are interested in, Chicana/o and/or Latina/o community and cultural issues.',
    imgSrc: 'departments/ccc/clsrc/clsrcHeader.png',
    imgAlt: '',
    href: 'ccc/clsrc',
    linkText: 'Learn More',
  },
  {
    title: 'Gender and Sexuality Resource Center',
    children:
      'The Gender and Sexuality Resource Center at Cal State LA is dedicated to creating safe and respectful learning spaces, catering specifically to the empowerment of all individuals across the gender and sexuality spectrum.',
    imgSrc: 'departments/ccc/gsrc/gsrc.png',
    imgAlt: '',
    href: 'ccc/gsrc',
    linkText: 'Learn More',
  },
  {
    title: 'Pan African Student Resource Center',
    children:
      'The PASRC provides services and support for students who identify as, or are interested in, Pan African community and cultural issues.',
    imgSrc: '/departments/ccc/pasrc/pasrc.png',
    imgAlt: '',
    href: 'ccc/pasrc',
    linkText: 'Learn More',
  },
];

const descriptionCards = [
  {
    imgSrc: 'icons/giving-hand-icon.png',
    imgAlt: '',
    children: 'Support groups and workshops',
  },
  {
    imgSrc: 'icons/book-icon.png',
    imgAlt: '',
    children:
      'Library including books, journals, magazines, and website listings',
  },
  {
    imgSrc: 'icons/computer-icon.png',
    imgAlt: '',
    children:
      'Cross-cultural video, audio library, and media center for educational purposes',
  },

  {
    imgSrc: 'icons/open-door-icon.png',
    imgAlt: '',
    children: 'Study spaces',
  },
  {
    imgSrc: 'icons/fridge-icon.png',
    imgAlt: '',
    children: 'Microwaves and refrigerators',
  },
  {
    imgSrc: 'icons/calendar-icon.png',
    imgAlt: '',
    children: 'Culturally relevant programming events throughout the year',
  },
  {
    imgSrc: 'icons/resume-icon.png',
    imgAlt: '',
    children:
      'Information on community organizations, job opportunities, and scholarships',
  },
  {
    imgSrc: 'icons/connecting-people-icon.png',
    imgAlt: '',
    children:
      'Friendly staff and volunteers to answer questions and discuss ideas',
  },
];

const hours = [
  {
    title: 'Office Hours',
    times: [
      'Monday - Thursday: 8:00 AM - 6:00 PM',
      'Friday: 8:00 AM - 5:00 PM',
      'Saturday - Sunday: CLOSED',
    ],
  },
];

export default function CCC() {
  const { returnByBreakpoint, isTablet, isMobile } = useBreakpoint();
  const descriptionCardWidth = returnByBreakpoint({
    tablet: '100%',
    desktop: 'calc(50% - 16px)',
    widescreen: 'calc(25% - 16px)',
  });

  return (
    <Page>
      <Head>
        <title>U-SU CCC</title>
        <meta
          name="author"
          content="The University Student Union Center for Student Involvement"
        />
        <meta
          name="keywords"
          content="CSULA, Cal State LA Student Union, U-SU, Center for Student Involvement, CSI, University Student, CCC, Cross Cultural Center, APISRC, Asian Pacific Islander Student Resource Center, Asian, Pacific Islander, Desi-American, APIDA, Chicana/o Latina/o Student Resrouce Center, Chicana, Chicano, Latina, Latino, Latinx, Gender and Sexuality Resource Center, Pan African Student Resource Center, Cultural Graduations, Black Graduation, APIDA Graduation, Pride Graduation, Nuestra Graduation, Distinguished Women Award"
        />
        <meta
          name="description"
          content="The Center for Student Involvement in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DepartmentHeader
        title="Cross Cultural Centers"
        infoSection={
          <OfficeHours
            address="5154 State University Drive Los Angeles, CA 90032
          Room 206, 2nd Floor"
            phoneNumber="323-343-5001"
            hours={hours}
          />
        }
      >
        Established in 1997, the mission of the Cross Cultural Centers at
        California State University, Los Angeles is to encourage student
        learning as well as foster an inclusive campus environment that
        challenges racism, sexism, heterosexism, and other forms of oppression.
        With a commitment to increasing cross-cultural awareness, we offer a
        wide variety of programs and services that explore both the shared and
        unique experiences, histories, and heritages of our diverse community.
      </DepartmentHeader>
      {/* <CallToAction
        backgroundColorProp="black"
        buttonVariantColor="primary"
        textColorProp="white"
        buttonText="Sign Up"
        text=""
        href="https://nam10.safelinks.protection.outlook.com/?url=http%3A%2F%2Feepurl.com%2Fh-h7Tv&data=05%7C01%7Cjyasis%40calstatela.edu%7Cd17cdb6e9e4847dda24d08db34932fdd%7Cce8a2002448f4f5882b1d86f73e3afdd%7C0%7C0%7C638161578991018136%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=tuEa0AkrHnm7dPb%2Brd4faRBfikG%2F10KUM21YykfoFEs%3D&reserved=0"
      >
        <Typography
          color="white"
          as="h2"
          variant="title"
          weight="400"
          lineHeight="1"
        >
          Keep up with the latest CCC events with our newsletter:
        </Typography>
      </CallToAction> */}
      <FluidContainer
        flex
        justifyContent="flex-start"
        backgroundColor="greyLightest"
      >
        <StudentOrgsCatergoriesContentContainer>
          <Typography margin="auto" variant="title" as="h2">
            Resource Centers
          </Typography>
          <Typography margin="auto" as="p">
            The Cross Cultural Centers provide an inclusive and friendly space
            that allows students to be themselves. The Centers are open to
            individuals from all ethnic and gender backgrounds. Please stop by
            to find out more information or to relax and meet with friends.
          </Typography>
          <OrgsCategoriesCardsContainer>
            {orgsCards.map((props) => (
              <ImageAndCard
                key={props.title}
                imageWidth={!isTablet ? '300px' : '225px'}
                {...props}
              />
            ))}
          </OrgsCategoriesCardsContainer>
        </StudentOrgsCatergoriesContentContainer>
      </FluidContainer>
      <FluidContainer backgroundImage="/backgrounds/subtle-background-4.jpg">
        <Typography variant="title" as="h2">
          We Provide:
        </Typography>
        <FluidContainer flex flexWrap="wrap" justifyContent="space-between">
          {descriptionCards.map((props) => (
            <DescriptionCard
              rounded
              hoverable
              width={descriptionCardWidth}
              margin="0 0 24px"
              key={`${props.children}`}
              minHeight="280px"
              {...props}
            />
          ))}
        </FluidContainer>
      </FluidContainer>

      <FluidContainer
        flex
        flexDirection="column"
        alignItems="center"
        backgroundColor="primary"
      >
        <FluidContainer flex flexWrap={isTablet ? 'wrap' : 'nowrap'}>
          <Image
            margin="auto"
            borderRadius="12px"
            src="/departments/ccc/nuestra-teaser.jpeg"
            alt="Nuestra Grad smiling while giving a hug"
            width={isMobile ? '100%' : '45%'}
            height={isMobile ? '100%' : '45%'}
          />
          <FluidContainer>
            <Typography variant="title" as="h2">
              Cultural Graduate Celebrations
            </Typography>
            <Typography margin="24px 0" as="p">
              These ceremonies and celebrations are great opportunities to
              acknowledge your academic achievements, honor your families,
              communities, and other significant people in your lives, and to
              celebrate the cultural influences that have contributed to your
              academic success. The ceremonies are open to all students who
              would like to sign up and participate.
            </Typography>
            <Button variant="black" href={'/ccc/cultural-grads'}>
              Learn More
            </Button>
          </FluidContainer>
        </FluidContainer>
      </FluidContainer>
      <InstagramFeed department="ccc" />
      {/* <CallToAction
        backgroundColorProp="black"
        buttonVariantColor="primary"
        textColorProp="white"
        buttonText="View Form"
        text="Interested in increasing cross-cultural awareness through presentations/training or tabling?"
        href="https://forms.office.com/pages/responsepage.aspx?id=AiCKzo9EWE-Csdhvc-Ov3XmCNpTA3T5AiUt4YCUxHc1URDlZVFZXTTdWQ1A0N0UzTDFQQlBFRDBBRCQlQCN0PWcu"
      >
        <Typography
          color="white"
          as="h2"
          variant="title"
          weight="400"
          lineHeight="1"
        >
          Request for
          <br />
          <strong>
            CCC Presentation <br />
            or Trainings
          </strong>
        </Typography>
      </CallToAction> */}
    </Page>
  );
}
