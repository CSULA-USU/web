import { useState } from 'react';
import Head from 'next/head';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {
  FluidContainer,
  Image,
  Typography,
  Button,
  StaffCardWithModal,
} from 'components';
import staff from 'data/staff.json';
import { Spaces } from 'theme';
import { Page, Header } from 'modules';

const TabItems = [
  'All',
  'Directors',
  'Administration',
  'CSI',
  'CCC',
  'Graffix',
  'Operations',
  'Recreation',
];

export default function Staff() {
  const StaffTabs = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
      <FluidContainer flex justifyContent="space-evenly" flexWrap="wrap">
        <Tabs defaultIndex={0} onSelect={(index) => setSelectedIndex(index)}>
          <TabList
            style={{
              listStyleType: 'none',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {TabItems.map((item, index) => (
              <Tab key={item}>
                <Button margin="5px" variant="black">
                  <Typography
                    lineHeight="1"
                    variant="cta"
                    color={selectedIndex === index ? 'primary' : 'white'}
                    size="xs"
                  >
                    {item}
                  </Typography>
                </Button>
              </Tab>
            ))}
          </TabList>
          {TabItems.map((item) => (
            <TabPanel key={item}>
              <FluidContainer flex flexWrap="wrap" justifyContent="center">
                {staff.map(
                  (s) =>
                    (item === 'All' || s.tags.includes(item)) && (
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
        </Tabs>
      </FluidContainer>
    );
  };

  return (
    <Page>
      <Head>
        <title>U-SU Staff</title>
        <meta name="author" content="Graffix" />
        <meta
          name="keywords"
          content="Cal State LA, CSULA, U-SU, University-Student Union, Staff, Directors, Administration, Center for Student Involvement, CSI, Cross Cultural Centers, CCC, Graffix, Operations, Recreation, Coordinator, Dean, Technician, Assistant, Web Designer, Executive, Employee"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        title="Meet the Staff"
        backgroundImage="/backgrounds/subtle-background-1.jpg"
      >
        Union: An act or instance of uniting or joining two or more things into
        one. Something that is made one : something formed by a combination or
        coalition of parts or members. A confederation of independent
        individuals for some common purpose.
      </Header>
      <StaffTabs />
      <FluidContainer flex justifyContent="center">
        <Image
          alt="group photo of full time u-su staff"
          src="https://www.dropbox.com/scl/fi/vkk3wycsbj2n2yzz86ej5/u-su-group.jpg?rlkey=caamb37ujdbjul4ovg4l4qfwj&raw=1"
          width="100%"
          margin={`0px 500px ${Spaces.xl}`}
          borderRadius="12px"
        />
      </FluidContainer>
    </Page>
  );
}
