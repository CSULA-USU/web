import styled from 'styled-components';
import Head from 'next/head';
import { Spaces } from 'theme';
import { Page } from 'modules';
import { useBreakpoint } from 'hooks';

import {
  FluidContainer,
  Typography,
  Image,
  VerticalLine,
  DescriptionCard,
  Expandable,
  Divider,
} from 'components';
import { BiChevronRight } from 'react-icons/bi';

const TextCenter = styled.div`
  text-align: center;
`;

const descriptionCards = [
  {
    imgSrc: '/icons/open-door-icon.png',
    imgAlt: '',
    children: 'Confident Communication Skills',
  },
  {
    imgSrc: '/icons/connecting-people-icon.png',
    imgAlt: '',
    children: 'Building Relationships',
  },
  {
    imgSrc: '/icons/calendar-icon.png',
    imgAlt: '',
    children: 'Navigating large social settings',
  },
  {
    imgSrc: '/icons/giving-hand-icon.png',
    imgAlt: '',
    children: 'Sense of belonging to the Cal State LA commmunity',
  },
];
export default function Geek() {
  const { isTablet, isDesktop } = useBreakpoint();
  return (
    <Page>
      <Head>
        <title>U-SU GEEK</title>
        <meta
          name="author"
          content="The University Student Union Center for Student Involvement"
          key="author"
        />
        <meta
          name="keywords"
          content="CSULA, Cal State LA Student Union, U-SU, Center for Student Involvement, CSI, University Studen, GEEK, Golden Eagle Event Krew"
          key="keywords"
        />
        <meta
          name="description"
          content="The Center for Student Involvement in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA"
          key="description"
        />
      </Head>
      <FluidContainer
        flex
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        backgroundImage="/subtle-background-1.jpg"
      >
        <TextCenter>
          <h1>
            <Image
              src="/departments/csi/geek/geek-header.jpg"
              alt="Golden Eagle Event Krew Geek California State University Los Angeles"
              width={isDesktop ? '100%' : '80%'}
            />
          </h1>
        </TextCenter>
        <VerticalLine />
        <TextCenter>
          <Typography as="p" margin={`${Spaces.md} 0`}>
            Golden Eagle Event Krew (GEEK) is an opportunity for Cal State LA
            students to get involved behind the scenes, helping with event
            programming and/or marketing for Center for Student Involvement
            events. The volunteer program offers many opportunities to develop
            professional and leadership skills in a fun, fast-paced environment
            by working with vendors, campus administrators and CSI staff to make
            events come to life!
          </Typography>
        </TextCenter>
        <TextCenter>
          <Typography as="p">
            CSI welcomes volunteers in the fall and spring semester of each
            school year, helping with wellness and engagement programming. GEEK
            volunteers are an essential component of a program’s success.
            Volunteers will help promote events, assist with event setup and
            breakdown, take pictures, interact with guests at events and help
            table throughout the semester. As a thank you for your service,
            GEEKS will be recognized with incentives throughout the semester!
          </Typography>
        </TextCenter>
      </FluidContainer>
      <FluidContainer>
        <TextCenter>
          <Typography variant="title" as="p">
            The GEEK Program strives to grow students in the following areas:
          </Typography>
        </TextCenter>
        <FluidContainer flex flexWrap="wrap" justifyContent="center">
          {descriptionCards.map((props) => (
            <DescriptionCard
              rounded
              hoverable
              margin="16px 8px"
              key={`${props.children}`}
              width={isTablet ? '100%' : 'calc(25% - 24px)'}
              minHeight="280px"
              {...props}
            />
          ))}
        </FluidContainer>
      </FluidContainer>

      <FluidContainer backgroundColor="black">
        <Typography
          variant="title"
          color="gold"
          as="h2"
          margin={`0 0 ${Spaces.md}`}
        >
          GEEK FAQ
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
              What are the requirements that GEEKs must fulfill?
            </Typography>
          }
        >
          <Typography color="white" as="p">
            <ul>
              <li>Maintain 2.0 GPA</li>
              <li>Complete a total of 5 events and/or 20 hours</li>
              <li>Attend orientation within the first few weeks of school</li>
              <li>Attend volunteer monthly meetings</li>
              <li>
                Represent the Center for Student Involvement and the
                University-Student Union in a professional manner. Treat all
                guests attending the events with courtesy and respect at all
                times.
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
              What is the GEEK dress code?
            </Typography>
          }
        >
          <Typography color="white" as="p">
            We ask GEEK members to dress comfortably as there may be times where
            you might be moving around frequently during an event. Please wear
            clothes that you will be able to be active in. Closed-toed shoes
            should be worn during all shifts for safety reasons.
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
              What is the GEEK code of conduct?
            </Typography>
          }
        >
          <Typography color="white" as="p">
            As a GEEK member, you are representing the Center for Student
            Involvement and the University-Student Union. We expect you to
            conduct yourself accordingly at all times. All members of the Cal
            State LA community and guests visiting campus are to be treated with
            courtesy and respect at all times. Members are expected to refrain
            from excessive profanity or language that could be considered rude
            or offensive during volunteer shifts. Conduct violations will result
            in immediate dismissal. Members are also expected to refrain from
            personal cell phone usage and eating during their shifts. Cell phone
            usage and eating/snacking may take place once members are on their
            break.
          </Typography>
        </Expandable>
        <Divider color="gold" />
      </FluidContainer>
    </Page>
  );
}
