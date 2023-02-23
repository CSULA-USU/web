import Head from 'next/head';
import { Page } from 'modules';
import {
  Button,
  Divider,
  FluidContainer,
  Image,
  NonBreakingSpan,
  Typography,
} from 'components';
import styled from 'styled-components';
import { Spaces } from 'theme';
import { BsQuestionCircle } from 'react-icons/bs';

const LinkOuter = styled.div`
  display: flex;
  justify-content: center;
  margin-left: -100px;
`;

const LinkInner = styled.div`
  display: flex;
  align-items: center;
  padding: ${Spaces.sm};
  svg {
    margin-right: ${Spaces.sm};
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ElectionUpdatesCard = styled.div`
  margin: ${Spaces.xl} 0;
`;

const ElectionUpdates = (props: any) => {
  return (
    <ElectionUpdatesCard>
      <Typography variant="titleSmall" margin={`0 0 ${Spaces.md}`}>
        {props.title}
      </Typography>
      {props.children}
      <Divider color="grey" />
    </ElectionUpdatesCard>
  );
};

const electionUpdateItems = [
  {
    title: 'Application Deadline',
    children: <Typography>Friday, February 10</Typography>,
  },
  {
    title: 'ASI Candidate Briefing',
    children: <Typography>Monday, February 27</Typography>,
  },
  {
    title: 'Verifying Eligibilty',
    children: <Typography>Tuesday, March 7 - Friday, March 10</Typography>,
  },
  {
    title: 'U-SU Mandatory Candidate Briefing',
    children: (
      <Typography>Wednesday, March 15 or Wednesday March 22</Typography>
    ),
  },
  {
    title: 'Candidate Campaigning',
    children: <Typography>Monday, April 3 - Friday, April 7</Typography>,
  },
  {
    title: 'Voting For Elections',
    description:
      "Stop by to vote and receive a ticket for that day's food option. You choose the day to vote, but you can only vote once! Happy voting!",
    children: (
      <div>
        <Typography margin={`0 0 ${Spaces.md}`}>
          Stop by to vote and receive a ticket for that day&apos;s food option.
          You choose the day to vote, but you can only vote once! Happy voting!
        </Typography>

        <Typography>
          Monday, April 10 - Elections Voting Table: Dessert for Democracy
        </Typography>
        <Typography margin={`${Spaces.sm} 0 ${Spaces.sm}`}>
          Tuesday, April 11 - Elections Voting Table: In-N-Out Food Truck
        </Typography>
        <Typography>
          Thursday, April 13 - Elections Voting Table: Taco Truck
        </Typography>
      </div>
    ),
  },
  {
    title: 'Election Results Announced',
    children: <Typography>Thursday, April 20</Typography>,
  },
];

export default function StudentLeaderElections() {
  return (
    <Page>
      <Head>
        <title>University-Student Union</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Board of Directors, Board, Directors, student, leader, asi "
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FluidContainer
        backgroundColor="black"
        flex
        justifyContent="space-between"
      >
        <HeaderContainer>
          <Typography variant="pageHeader" color="white">
            <NonBreakingSpan>Student Leader Elections</NonBreakingSpan>
          </Typography>
          <Typography color="white" lineHeight="1.8">
            The University-Student Union&apos;s Board of Directors is the
            governing board of the Union. The purpose of the Board is to
            establish policy for the Union as a student body center for the
            benefit of students, faculty, staff and alumni at Cal State Los
            Angeles.
          </Typography>
          <div>
            <Button
              margin="24px 0"
              href="https://form.jotform.com/210416532268047"
            >
              U-SU Board of Directors
            </Button>
            <Button
              margin="24px 24px"
              href="https://asicalstatela.org/general-election"
            >
              ASI Student Government
            </Button>
          </div>
          <LinkOuter>
            <Button href="#" variant="outline">
              <LinkInner>
                <BsQuestionCircle size="24px" color="white" />
                <Typography color="white">
                  Frequently Asked Questions
                </Typography>
              </LinkInner>
            </Button>
          </LinkOuter>
        </HeaderContainer>
        <Image
          src="/student-leader-elections/student-leader-header.png"
          alt="student leader header"
          width={800}
        ></Image>
      </FluidContainer>
      <FluidContainer>
        <Typography as="h1" variant="titleLarge">
          Election Updates
        </Typography>
        {electionUpdateItems.map((props) => (
          <ElectionUpdates key={props.title} {...props} />
        ))}
      </FluidContainer>
      <FluidContainer backgroundColor="greyLightest">
        <Typography variant="title">Election Results</Typography>
        <Typography>Results pending...</Typography>
      </FluidContainer>
      <FluidContainer backgroundColor="black">
        <Typography color="gold">Frequently Asked Questions</Typography>
      </FluidContainer>
    </Page>
  );
}
