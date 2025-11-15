import { Button, ButtonProps, Divider, Typography } from 'components';
import styled from 'styled-components';
import { Spaces, media } from 'theme';

export interface DownloadSectionProps {
  title?: string;
  children?: React.ReactNode;
  button?: ButtonProps;
}

const Container = styled.div<{ hasTitle?: boolean }>`
  display: flex;
  justify-content: ${({ hasTitle }) =>
    hasTitle ? 'space-between' : 'flex-start'};
  ${media('tablet')(`flex-direction: column;`)}
`;

// ✅ Use a function that reads props inside styled-components
const Title = styled.div<{ hasTitle?: boolean }>`
  width: ${({ hasTitle }) => (hasTitle ? '20%' : '0')};
  ${media('tablet')(`width: 100%;`)}
`;

const Content = styled.div<{ hasTitle?: boolean }>`
  width: ${({ hasTitle }) => (hasTitle ? '60%' : '100%')};
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
      <Title hasTitle={!!title}>
        {title && (
          <Typography variant="labelTitle" as="h3">
            {title}
          </Typography>
        )}
      </Title>
      <Content>{children}</Content>
      <div>{button ? <Button {...button} isExternalLink /> : null}</div>
    </Container>
    <Divider color="greyLighter" margin={`${Spaces.lg} 0`} />
  </>
);
