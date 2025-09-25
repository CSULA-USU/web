import axios from 'axios';
import { TabCluster, FluidContainer, Typography, Divider } from 'components';
import { Header, Page } from 'modules';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { TabPanel } from 'react-tabs';
import styled from 'styled-components';
import { Spaces, Colors } from 'theme';
import { UKrewStudent } from 'types';
import { toTitleCase } from 'utils/stringhelpers';
import { BiSolidPhone } from 'react-icons/bi';
import { GlobeIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { MdMail } from 'react-icons/md';

// type TabProps =
//   | 'All'
//   | 'Administration'
//   | 'Cross Cultural Centers'
//   | 'Center for Student Involvement'
//   | 'Board of Directors'
//   | 'Graffix'
//   | 'Operations and Reservations'
//   | 'Recreation';

type UKrewStudentsTabHashMap = {
  [key: string]: UKrewStudent[];
};

const departmentTabs: { [key: string]: string } = {
  All: 'All',
  Administration: 'Administration',
  CCC: 'Cross Cultural Centers',
  CSI: 'Center for Student Involvement',
  Directors: 'Board of Directors',
  Graffix: 'Graffix',
  Operations: 'Operations and Reservations',
  Recreation: 'Recreation',
};

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${Spaces.xs};
`;

const CardContainerWrapper = styled.div`
  /* width: 1440px; */
`;
const CardContainer = ({
  tabKey,
  uKrewStudents,
  departmentTabData,
}: {
  tabKey: string;
  uKrewStudents: UKrewStudent[] | undefined;
  departmentTabData: any;
}) => {
  if (!uKrewStudents || !departmentTabData || tabKey == 'All') return <></>;

  return (
    <CardContainerWrapper>
      <Divider as="h2" label={tabKey} variant="title" />
      <FluidContainer flex flexWrap="wrap" gap="1rem">
        {departmentTabData[tabKey].map((uKrewStudent: UKrewStudent) => {
          return <Card key={uKrewStudent.email} uKrewStudent={uKrewStudent} />;
        })}
      </FluidContainer>
    </CardContainerWrapper>
  );
};

const CardWrapper = styled.div`
  border-top: 8px solid ${Colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* background-color: ${Colors.greyDark}; */
  background-color: ${Colors.white};
  padding: ${Spaces.md};
  border-radius: ${Spaces.md};
  transition: transform 200ms ease;
  gap: ${Spaces.xs};

  box-shadow: rgb(38, 57, 77) 0px 18px 30px -10px;
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px; */

  :hover {
    transform: translateY(-4px);
  }
`;
const Card = ({ uKrewStudent }: { uKrewStudent: UKrewStudent }) => {
  return (
    <Link href={`/u-krew/${uKrewStudent.email.split('@')[0]}`}>
      <CardWrapper>
        <Typography as="h2" variant="titleSmall">
          {toTitleCase(uKrewStudent.firstName)}{' '}
          {toTitleCase(uKrewStudent.lastName)}
        </Typography>
        <Typography>
          <strong>{uKrewStudent.role}</strong>
        </Typography>
        <Typography>{uKrewStudent.major}</Typography>
        <HorizontalContainer>
          {uKrewStudent?.email && (
            <MdMail
              style={{
                height: '24px',
                width: '24px',
              }}
            />
          )}
          {uKrewStudent?.phoneNumber && (
            <BiSolidPhone
              style={{
                height: '24px',
                width: '24px',
              }}
            />
          )}
          {uKrewStudent?.linkedIn && (
            <LinkedInLogoIcon
              style={{
                height: '24px',
                width: '24px',
              }}
            />
          )}
          {uKrewStudent?.portfolioLink && (
            <GlobeIcon
              style={{
                height: '24px',
                width: '24px',
              }}
            />
          )}
        </HorizontalContainer>
      </CardWrapper>
    </Link>
  );
};

export default function Directory() {
  const [uKrewStudents, setUKrewStudents] = useState<
    UKrewStudent[] | undefined
  >(undefined);
  const [departmentTabData, setDepartmentTabData] = useState<
    UKrewStudentsTabHashMap | undefined
  >(undefined);

  useEffect(() => {
    const fetchUKrewStudents = async () => {
      await axios.get('/api/jotformUKrew').then((res) => {
        setUKrewStudents(res.data);
      });
    };
    fetchUKrewStudents();
  }, []);

  useEffect(() => {
    if (!uKrewStudents) return;
    let departmentTabDataTemp: UKrewStudentsTabHashMap = {};

    Object.keys(departmentTabs).map((tabKey: string) => {
      let filteredUKrewTabs: UKrewStudent[] = uKrewStudents.filter(
        (uKrewStudent: UKrewStudent) => {
          return uKrewStudent.department == departmentTabs[tabKey];
        },
      );
      departmentTabDataTemp[tabKey] = filteredUKrewTabs;
    }, {});
    setDepartmentTabData(departmentTabDataTemp);
  }, [uKrewStudents]);

  return (
    <Page>
      <Head>
        <title>U-SU U-Krew Directory</title>
        <meta name="author" content="University-Student Union, Cal State LA" />
        <meta
          name="keywords"
          content="Cal State LA, CSULA, U-SU, University-Student Union, Staff, Directors, Administration, Center for Student Involvement, CSI, Cross Cultural Centers, CCC, Graffix, Operations, Recreation, Coordinator, Dean, Technician, Assistant, Web Designer, Executive, Employee"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        title="Meet the U-Krew"
        backgroundImage="/backgrounds/subtle-background-1.jpg"
      >
        A team of dedicated students who work for our University&#39;s Student
        Union, helping to enhance campus life through their efforts. Each card
        provides a snapshot of their contact information, making it easy to
        connect with the students who help keep the Union running smoothly.
      </Header>

      <TabCluster tabItems={Object.keys(departmentTabs)}>
        {Object.entries(departmentTabs).map(([tabKey, _tabValue]) => (
          <TabPanel key={tabKey}>
            <FluidContainer>
              {tabKey == 'All' ? (
                Object.keys(departmentTabs).map((tabKey) => {
                  return (
                    <CardContainer
                      key={tabKey}
                      tabKey={tabKey}
                      uKrewStudents={uKrewStudents}
                      departmentTabData={departmentTabData}
                    />
                  );
                })
              ) : (
                <CardContainer
                  tabKey={tabKey}
                  uKrewStudents={uKrewStudents}
                  departmentTabData={departmentTabData}
                />
              )}
            </FluidContainer>
          </TabPanel>
        ))}
      </TabCluster>
    </Page>
  );
}
