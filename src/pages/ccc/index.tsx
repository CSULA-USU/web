import styled from 'styled-components';
import Head from 'next/head';
import { Page, DepartmentHeader, CallToAction } from 'modules';
import { useEffect, useState } from 'react';
import { fetchEvents } from 'api';
import { PresenceEvent } from 'types';
import {
  Typography,
  Card,
  FluidContainer,
  Image,
  DescriptionCard,
  Button,
} from 'components';
import { Spaces } from 'theme';

const StudentOrgsCatergoriesContentContainer = styled.div`
  margin-top: ${Spaces['2xl']};
`;

const OrgsCategoriesCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export default function CCC() {
  const orgsCards = [
    {
      title: 'Asian Pacific Islander Student Resource Center',
      children:
        'The APISRC was established in 1993 to address the growing needs and concerns of the Asian, Pacific Islander, and Desi American student population while enriching and raising social awareness for the entire campus community.',
      iconSrc: '/ccc/apisrcHeader.png',
      iconAlt: 'apisrc',
      href: '#',
      linkText: 'Learn More',
    },
    {
      title: 'Chicana/o Latina/o Student Resource Center',
      children:
        'The CLSRC provides services and support for students who identify as, or are interested in, Chicana/o and/or Latina/o community and cultural issues.',
      imgSrc: 'departments/ccc/clsrcHeader.png',
      imgAlt: 'CLSRC',
      href: '#',
      linkText: 'Learn More',
    },
    {
      title: 'Gender & Sexuality Resource Center',
      children:
        'The Gender & Sexuality Resource Center at Cal State LA is dedicated to creating safe and respectful learning spaces, catering specifically to the empowerment of Womyn, Men, and the Lesbian, Gay, Bisexual, Transgender, and Questioning/Queer (LGBTQ) community.',
      imgSrc: '/ccc/gsrc.png',
      imgAlt: 'Cal State LA Logo',
      href: '#',
      linkText: 'Learn More',
    },
    {
      title: 'Pan African Student Resource Center',
      children:
        'The PASRC provides services and support for students who identify as, or are interested in, Pan African community and cultural issues',
      imgSrc: '/ccc/pasrc.png',
      imgAlt: 'PASRC',
      href: '#',
      linkText: 'Learn More',
    },
  ];

  const descriptionCards = [
    {
      imgSrc: 'icons/giving-hand-icon.png',
      imgAlt: 'giving hand image',
      children: 'Support groups and workshops',
    },
    {
      imgSrc: 'icons/book-icon.png',
      imgAlt: 'book image',
      children:
        'Library including books, journals, magazines, and website listings',
    },
    {
      imgSrc: 'icons/computer-icon.png',
      imgAlt: 'icons/computer-icon.png',
      children:
        'Cross-cultural video, audio library, and media center for educational purposes',
    },

    {
      imgSrc: 'icons/open-door-icon.png',
      imgAlt: 'Open door image',
      children: 'Study spaces',
    },
    {
      imgSrc: 'icons/fridge-icon.png',
      imgAlt: 'Fridge image',
      children: 'Microwaves and refrigerators',
    },
    {
      imgSrc: 'icons/calendar-icon.png',
      imgAlt: 'calendar',
      children: 'Culturally relevant programming events throughout the year',
    },
    {
      imgSrc: 'icons/resume-icon.png',
      imgAlt: 'resume icon',
      children:
        'Information on community organizations, job opportunities, and scholarships',
    },
    {
      imgSrc: 'icons/connecting-people-icon.png',
      imgAlt: 'connecting people image',
      children:
        'Friendly staff and volunteers to answer questions and discuss ideas',
    },
  ];

  const hours = [
    {
      title: 'Office Hours',
      times: [
        'Monday - Friday: 9:00 AM - 5:00 PM',
        'Saturday - Sunday: CLOSED',
      ],
    },
  ];
  const [events, setEvents] = useState<PresenceEvent[]>([]);
  const getEvents = async () => {
    const data: PresenceEvent[] = await fetchEvents();
    const sortedData = data
      .filter(
        (event) =>
          new Date().getTime() < new Date(event.endDateTimeUtc).getTime() &&
          ['Cross Cultural Centers'].includes(event.organizationName),
      )
      .sort((a, b) => {
        return (
          new Date(a.startDateTimeUtc).getTime() -
          new Date(b.startDateTimeUtc).getTime()
        );
      });
    setEvents(sortedData);
  };

  useEffect(() => {
    getEvents();
  }, []);
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
          content="csula cal state la student union center for student involvement csi u-su university-student"
        />
        <meta
          name="description"
          content="The Center for Student Involvement in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DepartmentHeader
        title="Cross Cultural Centers"
        address="5154 State University Drive Los Angeles, CA 90032 Room 204, 2nd Floor, U-SU"
        phoneNumber="323-343-5110"
        hours={hours}
        featuredEvent={events[0]}
      >
        Established 1997, the mission of the Cross Cultural Centers at
        California State University, Los Angeles is to encourage student
        learning as well as foster an inclusive campus environment that
        challenges racism, sexism, heterosexism, and other forms of oppression.
        With a commitment to increasing cross-cultural awareness, we offer a
        wide variety of programs and services that explore both the shared and
        unique experiences, histories, and heritages of our diverse community.
      </DepartmentHeader>

      <FluidContainer
        flex
        justifyContent="flex-start"
        backgroundColor="greyLightest"
      >
        <StudentOrgsCatergoriesContentContainer>
          <Typography margin="auto" variant="title">
            Resource Centers
          </Typography>
          <Typography margin="auto">
            The Cross Cultural Centers provide an inclusive and friendly space
            that allows students to be themselves. The Centers are open to
            individuals from all ethnic and gender backgrounds. Please stop by
            to find out more information or to relax and meet with friends.
          </Typography>
          <OrgsCategoriesCardsContainer>
            {orgsCards.map((props) => (
              <FluidContainer
                flex
                alignItems="center"
                justifyContent="space-between"
                key={`${props.title}`}
              >
                <Image
                  src={`${props.imgSrc}`}
                  alt={`${props.imgAlt}`}
                  width="400px"
                  height="150px"
                  marginBottom="24px"
                  marginRight="48px"
                />
                <Card margin={`${Spaces.md} 0`} {...props}></Card>
              </FluidContainer>
            ))}
          </OrgsCategoriesCardsContainer>
        </StudentOrgsCatergoriesContentContainer>
      </FluidContainer>
      <FluidContainer backgroundImage="/bod-cta-background.jpg">
        <Typography variant="title">We Provide:</Typography>
        <FluidContainer flex flexWrap="wrap" justifyContent="center">
          {descriptionCards.map((props) => (
            <DescriptionCard
              rounded
              hoverable
              margin="16px 8px"
              key={`${props.children}`}
              width="calc(25% - 24px)"
              minHeight="280px"
              {...props}
            ></DescriptionCard>
          ))}
        </FluidContainer>
      </FluidContainer>

      <FluidContainer
        flex
        flexDirection="column"
        alignItems="center"
        backgroundColor="primary"
      >
        <FluidContainer flex>
          <Image
            src="/ccc/nuestra-teaser.jpeg"
            alt="graduation image"
            width="500px"
          ></Image>
          <FluidContainer>
            <Typography variant="title">
              Cultural Graduate Celebrations
            </Typography>
            <Typography margin="24px 0">
              These ceremonies and celebrations are great opportunities to
              acknowledge your academic achievements, honor your families,
              communities, and other significant people in your lives, and to
              celebrate the cultural influences that have contributed to your
              academic success. The ceremonies are open to all students who
              would like to sign up and participate.
            </Typography>
            <Button variant="black">Learn More</Button>
          </FluidContainer>
        </FluidContainer>
      </FluidContainer>

      <CallToAction
        backgroundColorProp="black"
        textColor="white"
        buttonVariantColor="primary"
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
      </CallToAction>
    </Page>
  );
}
