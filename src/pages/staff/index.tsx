import Head from 'next/head';
import { TabPanel } from 'react-tabs';
import {
  FluidContainer,
  Image,
  Typography,
  StaffCardWithModal,
  TabCluster,
} from 'components';
import staff from 'data/staff.json';
import { Spaces } from 'theme';
import { Page, Header } from 'modules';

const staffTabsData = {
  tabItems: [
    'All',
    'Directors',
    'Administration',
    'CSI',
    'CCC',
    'Graffix',
    'Operations',
    'Recreation',
  ],
};

export default function Staff() {
  return (
    <Page>
      <Head>
        <title>U&ndash;SU Staff</title>
        <meta
          name="author"
          content="University-Student Union, Cal State LA"
          key="author"
        />
        <meta
          name="keywords"
          content="Cal State LA, CSULA, U-SU, University-Student Union, Staff, Directors, Administration, Center for Student Involvement, CSI, Cross Cultural Centers, CCC, Graffix, Operations, Recreation, Coordinator, Dean, Technician, Assistant, Web Designer, Executive, Employee"
          key="keywords"
        />
      </Head>
      <Header
        title="Meet the Staff"
        backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-1.webp"
      >
        Union: An act or instance of uniting or joining two or more things into
        one. Something that is made one : something formed by a combination or
        coalition of parts or members. A confederation of independent
        individuals for some common purpose.
      </Header>
      <TabCluster tabItems={staffTabsData.tabItems}>
        {staffTabsData.tabItems.map((tags) => (
          <TabPanel key={tags}>
            <FluidContainer flex flexWrap="wrap" justifyContent="center">
              {staff.map(
                (s) =>
                  (tags === 'All' || s.tags.includes(tags)) && (
                    <StaffCardWithModal
                      key={s.name}
                      name={s.name}
                      title={s.title}
                      src={s.src}
                      alt={s.alt}
                      tags={s.tags}
                      margin={`${Spaces.sm}`}
                      pronouns={s.pronouns}
                      email={s.email}
                      phone={s.phone}
                      bio={s.bio}
                      rounded
                    >
                      <Typography size="xs" as="p">
                        {s.department}
                      </Typography>
                      <Typography size="xs" as="p">
                        {s.email}
                      </Typography>
                    </StaffCardWithModal>
                  ),
              )}
            </FluidContainer>
          </TabPanel>
        ))}
      </TabCluster>
      <FluidContainer flex justifyContent="center">
        <Image
          alt="group photo of full time u-su staff"
          src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/staff/u-su-group.webp"
          width="100%"
          borderRadius="12px"
        />
      </FluidContainer>
    </Page>
  );
}
