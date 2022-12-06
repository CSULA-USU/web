import styled, { css } from 'styled-components';
import { Colors } from 'theme';
import { Typography } from 'components';

type CardProps = {
  title: string;
  description: string;
};

const CardContainer = styled.div`
  background-color: ${Colors.white};
  width: 350px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: solid black thin;
  border-radius: 5%;
  padding: 0 1.2em;
`;

export const DescriptionCard = ({ title, description }: CardProps) => {
  return (
    <CardContainer>
      <Typography variant="smallHeading" margin="0 0 .5em 0">{title}</Typography>
      <Typography variant="bodySerif">{description}</Typography>
    </CardContainer>
  );
};
