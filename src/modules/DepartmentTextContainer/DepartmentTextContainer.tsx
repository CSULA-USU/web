import styled from 'styled-components';
import { Typography } from 'components';

const IntroContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin: 5em 0;
`;
const InnerIntroContainer = styled.div`
  width: 80vw;
`;
type DescriptionTextContainerProps = {
  title: string;
  description: string;
};

export const DepartmentTextContainer = ({
  title,
  description,
}: DescriptionTextContainerProps) => {
  return (
    <IntroContainer>
      <InnerIntroContainer>
        <Typography margin="0 0 .5em 0" as="h1" variant="heading">
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </InnerIntroContainer>
    </IntroContainer>
  );
};
