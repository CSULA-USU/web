import styled from 'styled-components';
import Head from 'next/head';
import {
  Button,
  Divider,
  FluidContainer,
  Image,
  Tabs,
  Typography,
  VerticalLine,
  Expandable,
} from 'components';
import { Page } from 'modules';
import { Spaces } from 'theme';
import honorees from 'data/distinguishedWomenAwardsHonorees.json';
import { BiChevronRight } from 'react-icons/bi';

const IconHeading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${Spaces.md};
`;

const SubHeaderSpan = styled.span`
  display: flex;
  align-items: center;
`;

const TabContent = styled(Typography)`
  &,
  * {
    line-height: 2;
  }
  ol {
    margin-top: 12px;
  }
`;

const Ninetys = () => {
  let ninetys = honorees[0][1999];
  return (
    <TabContent>
      {ninetys?.map((p) => (
        <Typography key={p.name}>
          {p.name} | {p.major}
        </Typography>
      ))}
    </TabContent>
  );
};

const Thousands = () => calculateYears(2000, 2010);

const Tens = () => calculateYears(2010, 2020);

const calculateYears = (startYear: Number, endYear: Number) => {
  const container: any[] = [];
  honorees.map(function (obj) {
    let k: keyof typeof obj;
    for (k in obj) {
      if (Number(k) >= startYear && Number(k) < endYear) {
        container.push(obj);
      }
    }
  });

  return (
    <TabContent>
      {container.map((obj) =>
        Object.keys(obj).map((item) => (
          <>
            <Expandable
              key={item}
              indicator={<BiChevronRight size={48} />}
              header={<Typography size="md">{item}</Typography>}
            >
              {obj[item].map((p: any) => (
                <div key={p.name}>
                  <Typography>
                    {p.name} | {p.major}
                  </Typography>
                </div>
              ))}
            </Expandable>
            <Divider color="greyLighter" />
          </>
        )),
      )}
    </TabContent>
  );
};
const tabItems = [
  { title: '2010-2019 ', children: <Tens /> },
  { title: '2000-2009', children: <Thousands /> },
  { title: '1999', children: <Ninetys /> },
];
export default function CulturalGrads() {
  return (
    <Page>
      <Head>
        <title>Distinguished Women Awards</title>
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
      <FluidContainer
        flex
        flexDirection="column"
        alignItems="center"
        backgroundImage="/subtle-background-1.jpg"
      >
        <a href="https://www.calstatela.edu/studentservices/nomination-form-%E2%80%93-distinguished-women-awards">
          {' '}
          <Image
            src="/departments/ccc/distinguished-women-awards-header.png"
            alt="distinguished women awards header"
            width={'100%'}
            height={'100%'}
            margin={`${Spaces.md} 0`}
          />
        </a>
        <VerticalLine />
        <Typography margin={`${Spaces.md} 0`}>
          The Division of Student Life, University-Student Union, and Cross
          Cultural Centers are seeking nominations for the 21st Distinguished
          Women Awards. This event honors women from Cal State LA for their many
          outstanding achievements and contributions to the community.The
          selection committee will look at achievements in the nominee’s field;
          significant contributions to Cal State LA; commitment to students,
          student success, and student development; commitment to women, women’s
          empowerment, and gender equity issues; and community involvement.{' '}
        </Typography>
      </FluidContainer>
      <FluidContainer backgroundColor="black">
        <Typography color="white" variant="title">
          Nominations
        </Typography>
        <Typography color="white" margin={`${Spaces.sm} 0`}>
          We welcome self-nominations as well as nominations from faculty,
          staff, students, and alums of outstanding women from Cal State LA,
          including:{' '}
        </Typography>
        <Typography color="white">
          <ul>
            <li>faculty</li>
            <li>staff</li>
            <li>administrator (including MPP/Dean)</li>
            <li>undergraduate student</li>
            <li>graduate student</li>
            <li>alumna</li>
          </ul>
        </Typography>
        <Typography color="white" margin={`${Spaces.sm} 0`}>
          Nominees who are employees must be full-time employees of Cal State LA
          or its auxiliaries. Emeriti faculty are eligible. However, past
          Distinguished Women Award recipients are not eligible.
        </Typography>
        <Typography color="white">
          The submission deadline is March 1, 2023.
        </Typography>
        <Typography color="white" margin={`0 0 ${Spaces.md}`}>
          Award recipients will be recognized during a reception on Monday,
          March 20, 2023, in the Golden Eagle Ballrooms. Check-in begins at 12
          p.m. and the program begins at 12:30 p.m.
        </Typography>
        <Button
          href="https://www.calstatela.edu/studentservices/nomination-form-%E2%80%93-distinguished-women-awards"
          variant="grey"
        >
          Apply Now
        </Button>
      </FluidContainer>
      <FluidContainer backgroundColor="greyLightest">
        <IconHeading>
          <SubHeaderSpan>
            <Typography margin="24px 8px 24px 0px" as="h2" variant="titleSmall">
              Distinguished Women Honorees
            </Typography>
          </SubHeaderSpan>
        </IconHeading>
        <Tabs items={tabItems} minHeight="320px" />
      </FluidContainer>
    </Page>
  );
}
