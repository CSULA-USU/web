import { Button, ButtonProps, Divider, Typography } from 'components';
import styled from 'styled-components';
import { Spaces, media } from 'theme';

export interface DownloadSectionProps {
  title?: string;
  children?: React.ReactNode;
  button?: ButtonProps;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  ${media('tablet')(`flex-direction: column;`)}
`;

const Title = styled.div`
  width: 20%;
  ${media('tablet')(`width: 100%;`)}
`;

const Content = styled.div`
  width: 60%;
  ${media('tablet')('width: 100%;')}
  margin: 0 ${Spaces['3xl']};
  ${media('tablet')('margin: 24px auto;')}
`;

export const DownloadSection = ({
  title,
  children,
  button,
}: DownloadSectionProps) => (
  <>
    <Container>
      <Title>
        <Typography variant="labelTitle" as="h3">
          {title}
        </Typography>
      </Title>
      <Content>{children}</Content>
      <div>
        <Button {...button} isExternalLink />
      </div>
    </Container>
    <Divider color="greyLighter" margin={`${Spaces.lg} 0`} />
  </>
);
