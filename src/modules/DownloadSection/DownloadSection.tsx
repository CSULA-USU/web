import { Button, ButtonProps, Divider, Typography } from 'components';
import styled from 'styled-components';
import { Spaces } from 'theme';
import { useBreakpoint } from 'hooks';

export interface DownloadSectionProps {
  title?: string;
  children?: React.ReactNode;
  button?: ButtonProps;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TabletContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.div`
  width: 20%;
`;

const Content = styled.div`
  width: 60%;
  margin: 0 ${Spaces['3xl']};
`;

const Center = styled.div`
  text-align: center;

  Button {
    display: flex;
    justify-content: center;
  }
`;
export const DownloadSection = ({
  title,
  children,
  button,
}: DownloadSectionProps) => {
  const { isTablet } = useBreakpoint();
  return (
    <>
      {isTablet ? (
        <TabletContainer>
          <Center>
            <Typography variant="labelTitle" margin={`${Spaces.sm} auto`}>
              {title}
            </Typography>
            <Typography margin={`0 0 ${Spaces.sm}`}>{children}</Typography>
            <Button {...button} />
          </Center>
        </TabletContainer>
      ) : (
        <Container>
          <Title>
            <Typography variant="labelTitle">{title}</Typography>
          </Title>
          <Content>{children}</Content>
          <div>
            <Button {...button} />
          </div>
        </Container>
      )}

      <Divider color="greyLighter" margin={`${Spaces.lg} 0`} />
    </>
  );
};
