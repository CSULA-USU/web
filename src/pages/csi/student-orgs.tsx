import styled from 'styled-components';
import Head from 'next/head';
import { Colors, Spaces } from 'theme';
import { Page, Header } from 'modules';
import { FluidContainer, Typography, Button, Card, Image } from 'components';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
`;
const MoreInformationContainer = styled.div`
  background-color: ${Colors.primary};
  height: 705px;
  margin: 0 auto;
`;
const MoreInformationTextContainer = styled.div`
  text-align: center;
  width: 762px;
  margin: auto;
`;
const StudentOrgsCatergoriesContentContainer = styled.div`
  margin-top: ${Spaces['2xl']};
`;

const OrgsCategoriesCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const cards = [
  {
    title: 'Some title',
    children:
      'Be on the lookout for flyers, banners, or postcards that advertise student group meetings and events. Attending these activities is a great and easy way to start your on-campus involvement.',
    iconSrc: '/calstatela-badge.svg',
    iconAlt: 'Cal State LA Logo',
  },
  {
    title: 'Some title',
    children:
      'Be on the lookout for flyers, banners, or postcards that advertise student group meetings and events. Attending these activities is a great and easy way to start your on-campus involvement.',
    iconSrc: '/calstatela-badge.svg',
    iconAlt: 'Cal State LA Logo',
  },
  {
    title: 'Some title',
    children:
      'Be on the lookout for flyers, banners, or postcards that advertise student group meetings and events. Attending these activities is a great and easy way to start your on-campus involvement.',
    iconSrc: '/calstatela-badge.svg',
    iconAlt: 'Cal State LA Logo',
  },
];
const orgsCards = [
  {
    title: 'Complete The Following Forms Online',
    href: '#',
    linkText: 'View Forms',
  },
  {
    title: "Submit Your Organization's Constitution and Bylaws",
    href: '#',
    linkText: 'View Forms',
  },
  {
    title: 'Attend The Sexual Violence Prevention and Resources Training',
    href: '#',
    linkText: 'View Forms',
  },
];
const orgsCategoriesCards = [
  {
    title: 'Academic',
    children:
      'Be on the lookout for flyers, banners, or postcards that advertise student group meetings and events. Attending these activities is a great and easy way to start your on-campus involvement.',
    iconSrc: '/calstatela-badge.svg',
    iconAlt: 'Cal State LA Logo',
  },
  {
    title: 'Academic',
  },
  {
    title: 'Academic',
  },
  {
    title: 'Academic',
  },
  {
    title: 'Academic',
  },
  {
    title: 'Academic',
  },
  {
    title: 'Academic',
  },
  {
    title: 'Academic',
  },
];

export default function StudentOrgs() {
  const buttons = [
    { text: 'Get Involved', href: '#' },
    { text: 'Start Your Own', href: '#' },
  ];
  return (
    <Page>
      <Head>
        <title>U-SU Student Organizations</title>
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
      <FluidContainer>
        <HeaderContainer>
          <Typography variant="titleSmall">University-Student Union</Typography>
          <Header title="Join a Student Organization" buttons={buttons}>
            Cal State LA is home to over 150+ student organizations that
            represent a variety of student interests and plan hundreds of events
            each year.
          </Header>
        </HeaderContainer>
      </FluidContainer>
      <FluidContainer flex justifyContent="flex-start">
        <Image margin="auto" size="80%" src="/cards-icon.svg" alt="cards" />
        <StudentOrgsCatergoriesContentContainer>
          <Typography margin="auto" variant="title">
            Student Organization Categories
          </Typography>
          <Typography margin="auto">
            Student groups are categorized under the following themes: academic,
            cultural, political, professional, religious, spiritual, service,
            social, and recreational.
          </Typography>
          <OrgsCategoriesCardsContainer>
            {orgsCategoriesCards.map((props) => (
              <Card
                margin={`${Spaces.md} 0`}
                key={`${props.title}`}
                {...props}
              ></Card>
            ))}
          </OrgsCategoriesCardsContainer>
        </StudentOrgsCatergoriesContentContainer>
      </FluidContainer>
      <MoreInformationContainer>
        <FluidContainer flex flexDirection="column" alignItems="center">
          <Typography margin="auto" variant="title">
            More Information
          </Typography>
          <FluidContainer flex justifyContent="space-between">
            {cards.map((props) => (
              <Card
                rounded
                hoverable
                key={`${props.title}`}
                {...props}
                width="calc(33.33% - 24px)"
                minHeight="280px"
              ></Card>
            ))}
          </FluidContainer>
          <MoreInformationTextContainer>
            <Typography>
              These organizations provide limitless opportunities to achieve an
              active role on campus and to pursue individual interests. Learn
              more about our recognized student organizations and their events.
            </Typography>
          </MoreInformationTextContainer>
          <Button margin="24px" variant="black">
            Learn More
          </Button>
        </FluidContainer>
      </MoreInformationContainer>
      <FluidContainer flex flexDirection="column">
        <Typography margin="auto" variant="title">
          Start Your Own Organization
        </Typography>
        <FluidContainer flex justifyContent="space-between">
          {orgsCards.map((props) => (
            <Card
              topBorder
              key={`${props.title}`}
              {...props}
              width="calc(33.33% - 24px)"
              minHeight="240px"
            ></Card>
          ))}
        </FluidContainer>
      </FluidContainer>
    </Page>
  );
}
