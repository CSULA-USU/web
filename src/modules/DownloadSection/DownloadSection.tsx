import { Button, ButtonProps, Divider, Typography } from 'components';
import styled from 'styled-components';
import { Spaces } from 'theme';

export interface DownloadSectionProps {
  title?: string;
  children?: React.ReactNode;
  button?: ButtonProps;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  width: 20%;
`;

const Content = styled.div`
  width: 60%;
  margin: 0 ${Spaces['3xl']};
`;

export const DownloadSection = ({
  title,
  children,
  button,
}: DownloadSectionProps) => (
  <>
    <Container>
      <Title>
        <Typography variant="labelTitle">{title}</Typography>
      </Title>
      <Content>{children}</Content>
      <div>
        <Button {...button} />
      </div>
    </Container>
    <Divider color="greyLighter" margin={`${Spaces.lg} 0`} />
  </>
);
