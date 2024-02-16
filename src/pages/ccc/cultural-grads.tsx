// import { FaRegQuestionCircle } from 'react-icons/fa';
import styled from 'styled-components';
import Head from 'next/head';
import {
  Divider,
  Expandable,
  FluidContainer,
  Image,
  ImageAndCard,
  Typography,
} from 'components';
// import { useBreakpoint } from 'hooks';
import { Page } from 'modules';
import { Spaces } from 'theme';
import { BiChevronRight } from 'react-icons/bi';

// const SubHeaderSpan = styled.span`
//   display: flex;
//   align-items: center;
// `;

const TeaserContainer = styled.div`
  width: 500px;
  height: 520px;
  background: center / contain no-repeat
    url('/departments/ccc/nuestra-teaser.jpeg');
  border-radius: 12px;
`;

const cards = [
  {
    title: 'APIDA Grad',
    subheader: 'Asian, Pacific Islander, South Asian, Desi-American',
    copy: [
      ['Friday, May 3, 2024', '6:00 p.m. to 8:00 p.m.'],
      'Los Angeles Convention Center',
      'Madi Garcia, Assistant Coordinator, Native American Student Center',
      'ccc@calstatela.edu | (555) 555 - 5555',
    ],
    applicationLink: '',
    iconSrc: '/departments/ccc/apisrc/apisrc-textless.svg',
    iconAlt: 'APIDA Grad Logo',
    imgSrc: '/departments/ccc/apisrc/apida-grad.jpeg',
    imgAlt: 'APIDA Graduates',
  },
  {
    title: 'Black Grad',
    subheader: 'Black, African-American, Pan-African Diaspora',
    copy: [
      ['Friday, May 3, 2024', '6:00 p.m. to 8:00 p.m.'],
      'Los Angeles Convention Center',
      'Madi Garcia, Assistant Coordinator, Native American Student Center',
      'ccc@calstatela.edu | (555) 555 - 5555',
    ],
    applicationLink: '',
    iconSrc: '/departments/logos/pasrc-icon.svg',
    iconAlt: 'PASRC Logo',
    imgSrc: '/departments/ccc/pasrc/black-grad/2022/grad-smile.jpg',
    imgAlt: 'PASRC Graduates',
  },
  {
    title: 'Native Grad',
    subheader: 'Native American, Indigenous',
    copy: [
      ['Friday, May 3, 2024', '6:00 p.m. to 8:00 p.m.'],
      'Los Angeles Convention Center',
      'Madi Garcia, Assistant Coordinator, Native American Student Center',
      'ccc@calstatela.edu | (555) 555 - 5555',
    ],
    applicationLink: '',
    iconSrc: '/departments/ccc/native-logo.png',
    iconAlt: 'Native Logo',
    imgSrc: '/departments/ccc/generic-grad.webp',
    imgAlt: 'CSULA Graduates',
  },
  {
    title: 'Nuestra Grad',
    subheader: 'Chicana/o, Latina/o, Central American, South American',
    copy: [
      ['Friday, May 3, 2024', '6:00 p.m. to 8:00 p.m.'],
      'Los Angeles Convention Center',
      'Madi Garcia, Assistant Coordinator, Native American Student Center',
      'ccc@calstatela.edu | (555) 555 - 5555',
    ],
    applicationLink: '',
    iconSrc: '/departments/logos/clsrc-logo.svg',
    iconAlt: 'Nuestra Logo',
    imgSrc: '/departments/ccc/clsrc/nuestra-grad-family-dancing.jpeg',
    imgAlt: 'Nuestra Graduates',
  },
  {
    title: 'Pride Grad',
    subheader:
      'Lesbian, Gay, Bisexual, Trans, Queer, Intersex, Asexual + Community',
    copy: [
      ['Friday, May 3, 2024', '6:00 p.m. to 8:00 p.m.'],
      'Los Angeles Convention Center',
      'Madi Garcia, Assistant Coordinator, Native American Student Center',
      'ccc@calstatela.edu | (555) 555 - 5555',
    ],
    applicationLink: '',
    iconSrc: '/departments/logos/gsrc-icon.svg',
    iconAlt: 'GSRC Logo',
    imgSrc: '/departments/ccc/gsrc/carousel/pride-grad.jpg',
    imgAlt: 'GSRC Graduates',
  },
];

// const IconHeading = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: ${Spaces.md};
// `;

export default function CulturalGrads() {
  // const { isDesktop } = useBreakpoint();

  return (
    <Page>
      <Head>
        <title>Cultural Graduate Celebrations</title>
        <meta
          name="author"
          content="The University Student Union Center for Student Involvement"
        />
        <meta
          name="keywords"
          content="CSULA, Cal State LA Student Union, Center for Student Involvement, CSI, Cross Cultural Center, CCC, U-SU, University Student, Cultural Graduation, Black Graduation, APIDA Graduation, Pride Graduation, Nuestra Graduation"
        />
        <meta
          name="description"
          content="The Center for Student Involvement in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=yes"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* {isDesktop ? (
        <>
          <FluidContainer
            flex
            flexDirection="column"
            backgroundImage="/backgrounds/subtle-background-4.jpg"
          >
            <SubHeaderSpan>
              <Typography margin="0px" as="h2" variant="titleSmall">
                Cultural Graduate Celebrations
              </Typography>
            </SubHeaderSpan>
            <FluidContainer flex flexDirection="column" alignItems="center">
              <Typography margin="0" as="h3">
                <strong>Dear Cal State LA Prospective Graduate,</strong>
                <br />
                These ceremonies and celebrations are great opportunities to
                acknowledge your academic achievements, honor your families,
                communities, and other significant people in your lives, and to
                celebrate the cultural influences that have contributed to your
                academic success. The ceremonies are open to all students who
                would like to sign up and participate.
              </Typography>
            </FluidContainer>
          </FluidContainer>
          <FluidContainer flex flexDirection="column">
            <SubHeaderSpan>
              <Typography margin="0px" as="h2" variant="titleSmall">
                Graduations
              </Typography>
            </SubHeaderSpan>
          </FluidContainer>
          <FluidContainer backgroundColor="greyLightest">
            <IconHeading>
              <SubHeaderSpan>
                <Typography
                  margin="0px 8px 0px 0px"
                  as="h2"
                  variant="titleSmall"
                >
                  FAQs
                </Typography>
                <FaRegQuestionCircle fontSize={'24px'} />
              </SubHeaderSpan>
            </IconHeading>
            <FluidContainer
              backgroundColor="primary"
              flex
              justifyContent="center"
              alignItems="center"
              innerMaxWidth="560px"
            >
              <Image
                src="/departments/ccc/ccc-grad-banner.jpg"
                alt="cultural grad banner"
                width="100%"
                height="fit-content"
              />
            </FluidContainer>
          </FluidContainer>
        </>
      ) : (
        <> */}
      <FluidContainer
        flex
        flexDirection="row"
        backgroundImage="/backgrounds/subtle-background-4.jpg"
        justifyContent="space-evenly"
      >
        <FluidContainer
          flex
          flexDirection="column"
          padding="16px"
          innerMaxWidth="500px"
        >
          <TeaserContainer />
          <br />
          <Typography variant="cta">Nuestra Grad &apos;22</Typography>
        </FluidContainer>
        <FluidContainer
          padding="16px"
          flex
          flexDirection="column"
          innerMaxWidth="500px"
        >
          <Typography variant="title">
            Cultural Graduate Celebrations
          </Typography>
          <Typography margin="24px 0">
            <strong>Dear Cal State LA Prospective Graduate,</strong>
            <br />
            These ceremonies and celebrations are great opportunities to
            acknowledge your academic achievements, honor your families,
            communities, and other significant people in your lives, and to
            celebrate the cultural influences that have contributed to your
            academic success. The ceremonies are open to all students who would
            like to sign up and participate.
          </Typography>
        </FluidContainer>
      </FluidContainer>
      <FluidContainer>
        <Typography margin={`${Spaces.md} 0`} as="h2" variant="title">
          Graduations
        </Typography>
        {cards.map((card, i) => (
          <ImageAndCard
            key={i}
            index={i}
            title={card.title}
            subheader={card.subheader}
            copy={card.copy}
            iconAlt={card.iconAlt}
            iconSrc={card.iconSrc}
            buttonLink={card.applicationLink}
            imgSrc={card.imgSrc}
            imgAlt={card.imgAlt}
          ></ImageAndCard>
        ))}
      </FluidContainer>

      <FluidContainer backgroundColor="black">
        <div id="faqs">
          <Typography color="gold" variant="title" as="h2">
            Graduate Participation Information
          </Typography>
        </div>
        <Expandable
          indicator={<BiChevronRight color="white" size={48} />}
          header={
            <Typography
              variant="label"
              color="white"
              as="h3"
              margin={`${Spaces.sm} 0`}
            >
              What is the role of a U-SU Board of Directors Member{' '}
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
                Network with campus administrators, staff and other students who
                serve on the BOD.
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
      <FluidContainer
        backgroundColor="primary"
        flex
        justifyContent="center"
        alignItems="center"
        innerMaxWidth="560px"
      >
        <Image
          src="/departments/ccc/ccc-grad-banner.jpg"
          alt="cultural grad banner"
          width="100%"
          height="fit-content"
        />
      </FluidContainer>
      {/* </>
      )} */}
    </Page>
  );
}
