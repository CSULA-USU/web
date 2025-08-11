import { FluidContainer, Divider } from 'components';
import { UKrewStudent } from 'types';
import styled from 'styled-components';
import { Card } from './Card';

const CardContainerWrapper = styled.div`
  padding: 0;
`;

type Props = {
  tabKey: string;
  uKrewStudents?: UKrewStudent[];
  departmentTabData?: { [key: string]: UKrewStudent[] };
};

export const CardContainer = ({
  tabKey,
  uKrewStudents,
  departmentTabData,
}: Props) => {
  if (!uKrewStudents || !departmentTabData || tabKey === 'All') return null;

  return (
    <CardContainerWrapper>
      <Divider as="h2" label={tabKey} variant="title" />
      <FluidContainer flex flexWrap="wrap" padding="0">
        {departmentTabData[tabKey].map((student) => (
          <Card key={student.email} uKrewStudent={student} />
        ))}
      </FluidContainer>
    </CardContainerWrapper>
  );
};
