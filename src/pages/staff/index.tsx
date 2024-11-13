import { Page, Header } from 'modules';
import Head from 'next/head';
import { FluidContainer, Image, Typography, Button } from 'components';
import styled from 'styled-components';
import { StaffCardWithModal } from 'components/StaffCard';
import { useEffect, useState } from 'react';
import staff from 'data/staff.json';
import { Colors, Spaces } from 'theme';

const NavItemContainer = styled.div`
  *:hover {
    color: ${Colors.primary};
  }
  display: flex;
  flex-wrap: wrap;
`;

const NavItems = [
  'All',
  'Directors',
  'Administration',
  'Center for Student Involvement',
  'Cross Cultural Centers',
  'Graffix',
  'Operations',
  'Recreation',
];

export default function Staff() {
  const [buttonType, setButtonType] = useState('');
  const [staffCards, setStaffCards] = useState(staff);
  useEffect(() => {
    switch (buttonType) {
      case 'All':
        setStaffCards(staff);
        break;
      case 'Directors':
        const directors = staff.filter((s) => s.tags.includes('Director'));
        setStaffCards(directors);
        break;
      case 'Administration':
        const administration = staff.filter((s) =>
          s.tags.includes('Administration'),
        );
        setStaffCards(administration);
        break;
      case 'Center for Student Involvement':
        const csi = staff.filter((s) => s.tags.includes('CSI'));
        setStaffCards(csi);
        break;
      case 'Cross Cultural Centers':
        const ccc = staff.filter((s) => s.tags.includes('CCC'));
        setStaffCards(ccc);
        break;
      case 'Graffix':
        const graffix = staff.filter((s) => s.tags.includes('Graffix'));
        setStaffCards(graffix);
        break;
      case 'Operations':
        const operations = staff.filter((s) => s.tags.includes('Operations'));
        setStaffCards(operations);
        break;
      case 'Recreation':
        const recreations = staff.filter((s) => s.tags.includes('Recreation'));
        setStaffCards(recreations);
        break;
    }
  }, [buttonType]);

  const StaffNav = () => {
    return (
      <FluidContainer flex justifyContent="space-evenly" flexWrap="wrap">
        {NavItems.map((item) => (
          <NavItemContainer
            key={item}
            onClick={() => {
              setButtonType(item);
            }}
          >
            <Button margin="5px" variant="black">
              <Typography lineHeight="1" variant="cta" color="white" size="xs">
                {item}
              </Typography>
            </Button>
          </NavItemContainer>
        ))}
      </FluidContainer>
    );
  };

  return (
    <Page>
      <Head>
        <title>U-SU Staff</title>
        <meta name="author" content="Recreation" />
        <meta
          name="keywords"
          content="Cal State LA, CSULA, U-SU, University Student Union, Staff, Directors, Administration, Center for Student Involvement, CSI, Cross Cultural Centers, CCC, Graffix, Operations, Recreation, Coordinator, Dean, Technician, Assistant, Web Designer, Executive"
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
      <StaffNav></StaffNav>
      <FluidContainer flex flexWrap="wrap" justifyContent="center">
        {staffCards.map((s) => (
          <StaffCardWithModal
            key={s.name}
            name={s.name}
            title={s.title}
            src={s.src}
            alt={s.alt}
            tags={s.tags}
            margin={`${Spaces.sm}`}
            rounded
          >
            <Typography size="xs" as="p">
              {s.department}
            </Typography>
            <Typography size="xs" as="p">
              {s.email}
            </Typography>
          </StaffCardWithModal>
        ))}
      </FluidContainer>
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
