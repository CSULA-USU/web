import Head from 'next/head';
import { Page } from 'modules';
import {
  Button,
  Divider,
  Expandable,
  FluidContainer,
  Image,
  Typography,
} from 'components';
import styled from 'styled-components';
import { Spaces } from 'theme';
import { BsQuestionCircle } from 'react-icons/bs';
import { useBreakpoint } from 'hooks';
import { BiChevronRight } from 'react-icons/bi';

const LinkOuter = styled.div`
  display: flex;
  justify-content: center;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${Spaces.sm};
`;

const TextCenter = styled.div`
  text-align: center;
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
    children: <Typography as="p">Friday, February 10</Typography>,
  },
  {
    title: 'ASI Candidate Briefing',
    children: <Typography as="p">Monday, February 27</Typography>,
  },
  {
    title: 'Verifying Eligibilty',
    children: (
      <Typography as="p">Tuesday, March 7 - Friday, March 10</Typography>
    ),
  },
  {
    title: 'U-SU Mandatory Candidate Briefing',
    children: (
      <Typography as="p">Wednesday, March 15 or Wednesday March 22</Typography>
    ),
  },
  {
    title: 'Candidate Campaigning',
    children: <Typography as="p">Monday, April 3 - Friday, April 7</Typography>,
  },
  {
    title: 'Voting For Elections',
    description:
      "Stop by to vote and receive a ticket for that day's food option. You choose the day to vote, but you can only vote once! Happy voting!",
    children: (
      <div>
        <Typography as="p" margin={`0 0 ${Spaces.md}`}>
          Stop by to vote and receive a ticket for that day&apos;s food option.
          You choose the day to vote, but you can only vote once! Happy voting!
        </Typography>

        <Typography as="p">
          Monday, April 10 - Elections Voting Table: Dessert for Democracy
        </Typography>
        <Typography as="p" margin={`${Spaces.sm} 0 ${Spaces.sm}`}>
          Tuesday, April 11 - Elections Voting Table: In-N-Out Food Truck
        </Typography>
        <Typography as="p">
          Thursday, April 13 - Elections Voting Table: Taco Truck
        </Typography>
      </div>
    ),
  },
  {
    title: 'Election Results Announced',
    children: <Typography as="p">Thursday, April 20</Typography>,
  },
];

export default function StudentLeaderElections() {
  const { isTablet } = useBreakpoint();

  return (
    <Page>
      <Head>
        <title>U-SU Student Elections</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Board of Directors, Board, Directors, Student, Leader, ASI, Elections, Student Government, Application, Candidate"
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
        flexWrap={!isTablet ? 'nowrap' : 'wrap'}
      >
        <HeaderContainer>
          <Typography variant="pageHeader" color="white" as="h1">
            <TextCenter>Student Leader Elections</TextCenter>
          </Typography>

          <Typography color="white" lineHeight="1.8" as="p">
            <TextCenter>
              The University-Student Union&apos;s Board of Directors is the
              governing board of the Union. The purpose of the Board is to
              establish policy for the Union as a student body center for the
              benefit of students, faculty, staff and alumni at Cal State Los
              Angeles.
            </TextCenter>
          </Typography>
          <ButtonContainer>
            <Button href="https://form.jotform.com/210416532268047">
              U-SU Board of Directors
            </Button>
            <Button href="https://asicalstatela.org/general-election">
              ASI Student Government
            </Button>
          </ButtonContainer>
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
          width={isTablet ? '100%' : '40%'}
        ></Image>
      </FluidContainer>
      <FluidContainer>
        <Typography as="h2" variant="titleLarge">
          Election Updates
        </Typography>
        {electionUpdateItems.map((props) => (
          <ElectionUpdates key={props.title} {...props} />
        ))}
      </FluidContainer>
      <FluidContainer backgroundColor="greyLightest">
        <Typography variant="title" as="h2">
          Election Results
        </Typography>
        <Typography as="p">Results pending...</Typography>
      </FluidContainer>
      <FluidContainer backgroundColor="black">
        <Typography color="gold" variant="title" as="h2">
          Frequently Asked Questions
        </Typography>
        <Expandable
          indicator={<BiChevronRight color="white" size={48} />}
          header={
            <Typography
              variant="label"
              color="white"
              as="h3"
              margin={`${Spaces.sm} 0`}
            >
              What is the role of the U-SU Board of Directors Member{' '}
            </Typography>
          }
        >
          <Typography color="white" as="p">
            <ul>
              <li>
                Attend U-SU Board of Directors meetings. Meetings are held on
                the second Friday of each month at 2 PM
              </li>
              <li>
                Represent other students by actively seeking out their opinions
                on U-SU programs, services, and building use.
              </li>
              <li>
                Chair and/or serve on at least one U-SU standing committee.
              </li>
              <li>
                Participate in U-SU programs and events as your schedule allows.
              </li>
              <li>Ask questions!</li>
              <li>
                Interact with Board members, U-SU staff members, student
                assistants, and guests to the building so together, we can
                enhance the services currently offered.
              </li>
            </ul>
          </Typography>
        </Expandable>
        <Divider color="gold" />
        <Expandable
          indicator={<BiChevronRight color="white" size={48} />}
          header={
            <Typography
              variant="label"
              color="white"
              as="h3"
              margin={`${Spaces.sm} 0`}
            >
              What is the difference between the U-SU Board of Directors and
              A.S.I?
            </Typography>
          }
        >
          <Typography color="white" as="p">
            The University-Student Union Board of Directors is charged with
            managing, supporting, and advocating for the University-Student
            Union on campus. The Board of Directors is comprised of 16 member, 8
            Student Directors, who are tasked with overseeing the Student Union,
            which includes the Cross Cultural Centers, Center for Student
            Involvement, Xtreme Fitness, and other departments that support
            student development on campus. A.S.I. , or the Associated Students,
            Inc. is the student government for the University. A.S.I. serves as
            an entity for student input in governance on campus, oversees club
            and organization funding, and provides discounted tickets to local
            attractions, among other responsibilities. Both the
            University-Student Union and A.S.I. are non-profit auxiliaries on
            campus. They differ in structure and purpose. For more information
            about each, please visit University-Student Union and A.S.I.
          </Typography>
        </Expandable>
        <Divider color="gold" />
        <Expandable
          indicator={<BiChevronRight color="white" size={48} />}
          header={
            <Typography
              variant="label"
              color="white"
              as="h3"
              margin={`${Spaces.sm} 0`}
            >
              Do you have what it takes to serve the U-SU Board of Directors?
            </Typography>
          }
        >
          <Typography color="white" as="p">
            Undergraduate Candidates must:
            <ul>
              <li>
                Have been enrolled at Cal State LA and completed two quarters
                prior to applying.
              </li>
              <li>
                Have earned no fewer than 9 quarter units of academic credit
                during that year prior to consideration.
              </li>
              <li>
                Have earned a 2.0 or better grade point average during the 12
                months immediately preceding the quarter in which the
                appointment occurs.
              </li>
            </ul>
          </Typography>
        </Expandable>
        <Divider color="gold" />
        <Expandable
          indicator={<BiChevronRight color="white" size={48} />}
          header={
            <Typography
              variant="label"
              color="white"
              as="h3"
              margin={`${Spaces.sm} 0`}
            >
              What can you gain from serving on the U-SU Board of Directors?
            </Typography>
          }
        >
          <Typography color="white" as="p">
            <ul>
              <li>Develop your leadership &amp; communication skills.</li>
              <li>Build your academic and professional resume.</li>
              <li>
                HNetwork with campus administrators, staff and other students
                who serve on the BOD.
              </li>
              <li>
                Inﬂuence the future of the University-Student Union as you
                provide opinions on existing programs, services, and policies.
              </li>
              <li>
                Meet new people and develop long lasting relationships with a
                diverse group of people from across the campus.
              </li>
            </ul>
          </Typography>
        </Expandable>
        <Divider color="gold" />
        <Expandable
          indicator={<BiChevronRight color="white" size={48} />}
          header={
            <Typography
              variant="label"
              color="white"
              as="h3"
              margin={`${Spaces.sm} 0`}
            >
              I have more questions about applying. Who do I contact?
            </Typography>
          }
        >
          <Typography color="white" as="p">
            For more information on the application process, please visit the
            University-Student Union administration office in room 306 or call
            Joe Sedlacek, Assistant to the Executive Director, at 323.343.2461.
          </Typography>
        </Expandable>
        <Divider color="gold" />
      </FluidContainer>
    </Page>
  );
}
