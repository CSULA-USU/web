import axios from 'axios';
import {
  TabCluster,
  FluidContainer,
  StaffCardWithModal,
  Typography,
} from 'components';
import { Page } from 'modules';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { TabPanel } from 'react-tabs';
import { Spaces } from 'theme';
import { UKrewStudent } from 'types';
import { toTitleCase } from 'utils/stringhelpers';
// import { Image } from 'components';

const departmentTabData = [
  'All',
  'Directors',
  'Administration',
  'CSI',
  'CCC',
  'Graffix',
  'Operations',
  'Recreation',
];

export default function Directory() {
  const [uKrewStudents, setUKrewStudents] = useState<
    UKrewStudent[] | undefined
  >(undefined);

  useEffect(() => {
    const fetchUKrewStudents = async () => {
      await axios.get('/api/jotformUKrew').then((res) => {
        setUKrewStudents(res.data);
      });
    };
    fetchUKrewStudents();
  }, []);

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
      <TabCluster tabItems={departmentTabData}>
        {departmentTabData.map((tab) => (
          <TabPanel key={tab}>
            <FluidContainer flex flexWrap="wrap" justifyContent="center">
              {uKrewStudents?.map(
                (uKrewStudent, idx) =>
                  (tab === 'All' || uKrewStudent.department.includes(tab)) && (
                    <StaffCardWithModal
                      key={idx}
                      name={`${toTitleCase(
                        uKrewStudent.firstName,
                      )} ${toTitleCase(uKrewStudent.lastName)}`}
                      title={
                        uKrewStudent.role
                          ? uKrewStudent.role
                          : uKrewStudent.department.includes('Directors')
                          ? 'Board Of Directors'
                          : ''
                      }
                      // src={uKrewStudent.photoUpload || ''}
                      src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
                      alt={''}
                      // tags={uKrewStudent.tags}
                      margin={`${Spaces.sm}`}
                      // pronouns={uKrewStudent.pronouns}
                      email={uKrewStudent.email}
                      phone={uKrewStudent.phoneNumber}
                      // bio={uKrewStudent.bio}
                      rounded
                    >
                      <Typography size="xs" as="p">
                        {uKrewStudent.department}
                      </Typography>
                      <Typography size="xs" as="p">
                        {uKrewStudent.email}
                      </Typography>
                    </StaffCardWithModal>
                  ),
              )}
            </FluidContainer>
          </TabPanel>
        ))}
      </TabCluster>
    </Page>
  );
}
