import styled from 'styled-components';
import Head from 'next/head';
import { Page, DepartmentHeader } from 'modules';
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
        ' The APISRC was established in 1993 to address the growing needs and concerns of the Asian, Pacific Islander, and Desi American student population while enriching and raising social awareness for the entire campus community.',
      imgSrc: '/ccc/apisrcHeader.png',
      imgAlt: 'apisrc',
      href: '#',
      linkText: 'Learn More',
    },
    {
      title: 'Chicana/o Latina/o Student Resource Center',
      children:
        'The CLSRC provides services and support for students who identify as, or are interested in, Chicana/o and/or Latina/o community and cultural issues.',
      imgSrc: '/ccc/clsrcHeader.png',
      imgAlt: 'CLSRC',
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
    {
      title: 'Gender & Sexuality Resource Center',
      children:
        'The Gender & Sexuality Resource Center at Cal State LA is dedicated to creating safe and respectful learning spaces, catering specifically to the empowerment of Womyn, Men, and the Lesbian, Gay, Bisexual, Transgender, and Questioning/Queer (LGBTQ) community.',
      imgSrc: '/ccc/gsrc.png',
      imgAlt: 'Cal State LA Logo',
      href: '#',
      linkText: 'Learn More',
    },
  ];

  const descriptionCards = [
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
      imgSrc: 'icons/giving-hand-icon.png',
      imgAlt: 'giving hand image',
      children: 'Support groups and workshops',
    },
    {
      imgSrc: 'icons/open-door-icon.png',
      imgAlt: 'Open door image',
      children: 'Study & Meeting spaces',
    },
    {
      imgSrc: 'icons/fridge-icon.png',
      imgAlt: 'Fridge image',
      children: 'Microwaves and refrigerators',
    },
    {
      imgSrc: 'icons/calendar-icon.png',
      imgAlt: 'calendar',
      children: 'Message boxes for affiliated clubs and organizations',
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
      <DepartmentHeader title="Cross Cultural Centers">
        Established 1997, the mission of the Cross Cultural Centers at
        California State University, Los Angeles is to encourage student
        learning as well as foster an inclusive campus environment that
        challenges racism, sexism, heterosexism, and other forms of oppression.
        With a commitment to increasing cross-cultural awareness, we offer a
        wide variety of programs and services that explore both the shared and
        unique experiences, histories, and heritages of our diverse community.
      </DepartmentHeader>

      <FluidContainer flex flexWrap="wrap" justifyContent="center">
        {descriptionCards.map((props) => (
          <DescriptionCard
            rounded
            hoverable
            margin="24px 8px"
            key={`${props.children}`}
            width="calc(25% - 24px)"
            minHeight="280px"
            {...props}
          ></DescriptionCard>
        ))}
      </FluidContainer>
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
      <FluidContainer
        flex
        flexDirection="column"
        alignItems="center"
        backgroundColor="primary"
      >
        <Typography variant="title">Cultural Graduate Celebrations</Typography>
        <Typography margin="24px 0">
          These ceremonies and celebrations are great opportunities to
          acknowledge your academic achievements, honor your families,
          communities, and other significant people in your lives, and to
          celebrate the cultural influences that have contributed to your
          academic success. The ceremonies are open to all students who would
          like to sign up and participate.
        </Typography>
        <Button variant="black">Learn More</Button>
      </FluidContainer>
    </Page>
  );
}
