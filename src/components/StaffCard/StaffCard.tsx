import styled from 'styled-components';
import { Typography } from '../Typography';
import { Image, Panel } from 'components';
import { Spaces } from 'theme';

interface CardStyles {
  margin?: string;
  width?: string;
  hoverable?: boolean;
  rounded?: boolean;
}

interface CardProps extends CardStyles {
  name: string;
  title: string;
  children?: React.ReactNode;
  src: string;
  alt: string;
  tags?: string[];
}
const CenterWord = styled.div`
  text-align: center;
  word-wrap: break-word;
`;

const Container = styled.div`
  height: 80px;
`;

export const StaffCard = ({
  name,
  title,
  children,
  src,
  alt,
  ...props
}: CardProps) => {
  return (
    <Panel {...props} width={'350px'}>
      <CenterWord>
        <Container>
          <Typography color="gold" margin={`${Spaces.sm}`} weight="700">
            {title}
          </Typography>
        </Container>

        <Image round src={src} alt={alt} width="100%" marginTop={25} />
        <Typography margin="auto" size="md" weight="700">
          {name}
        </Typography>
        {children}
      </CenterWord>
    </Panel>
  );
};
