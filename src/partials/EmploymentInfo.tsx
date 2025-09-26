import { useState } from 'react';
import { useBreakpoint } from 'hooks';
import { FluidContainer, Typography } from 'components';
import { TabClusterControlled, PositionsDescriptions } from '../modules';
import UKrewData from 'data/aboutUKrew.json';

export const EmploymentInfo = () => {
  const departmentTabs: { [key: string]: string } = {
    All: 'All',
    Admin: 'Administration',
    CCC: 'Cross Cultural Centers',
    CSI: 'Center for Student Involvement',
    Graffix: 'Graffix',
    Operations: 'Operations',
    Recreation: 'Recreation',
  };
  const { positions } = UKrewData;
  const { isMobile } = useBreakpoint();
  const [selectedTab, setSelectedTab] = useState('All');

  return (
    <FluidContainer>
      <span id="positions">
        <Typography variant="title" as="h2" size={isMobile ? 'lg' : '2xl'}>
          Job Descriptions
        </Typography>
      </span>
      <TabClusterControlled
        tabItems={Object.keys(departmentTabs)}
        selectedTabKey={selectedTab}
        onSelectTab={setSelectedTab}
      />
      <PositionsDescriptions
        data={positions}
        filterByDepartment={departmentTabs[selectedTab]}
      />
    </FluidContainer>
  );
};

export default EmploymentInfo;
