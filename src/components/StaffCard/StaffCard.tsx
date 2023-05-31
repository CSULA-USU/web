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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
    <Panel {...props} width={'304px'} height="512px">
      <CenterWord>
        <Typography
          color="gold"
          margin={`${Spaces.sm}`}
          variant="copy"
          weight="700"
        >
          {title}
        </Typography>
        <div>
          <Image src={src} alt={alt} width="220px" height="245px" />
          <Typography size="md" weight="700" margin="8px 0px 0px">
            {name}
          </Typography>
          {children}
        </div>
      </CenterWord>
    </Panel>
  );
};
