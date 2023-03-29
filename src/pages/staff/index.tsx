import { Page, Header } from 'modules';
import { FluidContainer, Typography } from 'components';
import styled from 'styled-components';
import { StaffCard } from 'components/StaffCard';
import { useEffect, useState } from 'react';
import staff from 'data/staff.json';
import { Colors, Spaces } from 'theme';

const NavItemContainer = styled.div`
  *:hover {
    color: ${Colors.gold};
  }
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
      <FluidContainer
        backgroundColor="greyDarkest"
        flex
        justifyContent="space-evenly"
        flexWrap="wrap"
      >
        {NavItems.map((item) => (
          <NavItemContainer
            key={item}
            onClick={() => {
              setButtonType(item);
            }}
          >
            <Typography
              color="white"
              variant="labelTitleSmall"
              margin={`0 ${Spaces.sm} 0 0`}
            >
              {item}
            </Typography>
          </NavItemContainer>
        ))}
      </FluidContainer>
    );
  };

  return (
    <Page>
      <Header title="Meet the Staff" backgroundImage="/subtle-background-1.jpg">
        Union: An act or instance of uniting or joining two or more things into
        one. Something that is made one : something formed bby a combining or
        coalition of parts or members. A confederation of independent
        individuals for some common purpose.
      </Header>
      <StaffNav></StaffNav>
      <FluidContainer flex flexWrap="wrap" justifyContent="center">
        {staffCards.map((s) => (
          <StaffCard
            key={s.name}
            name={s.name}
            title={s.title}
            src={s.src}
            alt={s.alt}
            tags={s.tags}
            margin={`${Spaces.sm}`}
            rounded
          >
            <Typography size="xs">{s.department}</Typography>
            <Typography size="xs">{s.email}</Typography>
          </StaffCard>
        ))}
      </FluidContainer>
    </Page>
  );
}
