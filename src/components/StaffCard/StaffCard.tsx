import styled from 'styled-components';
import { Typography } from '../Typography';
import { Image, Panel } from 'components';

interface CardStyles {
  margin?: string;
  width?: string;
  hoverable?: boolean;
  rounded?: boolean;
}

interface CardProps extends CardStyles {
  name: string;
  staffTitle: string;
  children?: React.ReactNode;
  src: string;
  alt: string;
  departmentTags: string[];
}
const CenterWord = styled.div`
  text-align: center;
  margin: auto;
`;

export const StaffCard = ({
  name,
  staffTitle,
  children,
  src,
  alt,
  ...props
}: CardProps) => (
  <Panel {...props}>
    <CenterWord>
      <Typography color="gold" margin="auto">
        {staffTitle}
      </Typography>
    </CenterWord>
    <Image round src={src} alt={alt} />
    <Typography margin="auto" size="md" weight="700">
      {name}
    </Typography>
    <CenterWord>{children}</CenterWord>
  </Panel>
);
