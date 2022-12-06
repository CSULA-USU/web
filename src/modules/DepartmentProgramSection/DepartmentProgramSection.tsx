import styled from 'styled-components';
import { Colors } from 'theme';
import { Typography, DescriptionCard } from 'components';

const ProgramSection = styled.div`
  height: 50vh;
`;
// const ProgramSection = styled.div<DepartmentProgramSectionProps>`
//   height: 50vh;
//   background-color?: ${(props) =>
//     props.backgroundColor ? props.backgroundColor : 'transparent'};
// `;
const ProgramSectionText = styled.div`
  text-align: center;
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2em;
`;
type CardProps = {
  title: string;
  description: string;
};

interface DepartmentProgramSectionProps {
  backgroundColor: any;
  cardList: CardProps[];
  title: string;
};


export const DepartmentProgramSection = ({
  cardList,
  title,
  backgroundColor
}: DepartmentProgramSectionProps) => {
  let list = cardList.map((obj) => {
    return (
      <DescriptionCard
        key={obj.title}
        title={obj.title}
        description={obj.description}
      />
    );
  });
  return (
    <ProgramSection>
         {/* <ProgramSection backgroundColor={backgroundColor}> */}
      <ProgramSectionText>
        <Typography margin="1em" as="h2" variant="heading">
          {title}
        </Typography>
      </ProgramSectionText>
      <CardContainer>{list}</CardContainer>
    </ProgramSection>
  );
};
