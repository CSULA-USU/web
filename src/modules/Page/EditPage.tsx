import { FluidContainer, Typography } from 'components';
import { EditDrawer } from 'modules/EditDrawer';
import styled from 'styled-components';
import { Colors } from 'theme';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  background-color: ${Colors.white};
`;

const Nav = styled.div`
  display: flex;
  padding: 8px;
  height: 80px;
  background-color: ${Colors.greyDarkest};
`;

const Content = styled.div`
  overflow: scroll;
  height: calc(100vh - 80px);
`;

interface PageProps {
  children: React.ReactNode;
  title: string;
}

export const EditPage = ({ children, title }: PageProps) => (
  <PageContainer>
    <Nav>
      <EditDrawer />
      <FluidContainer>
        <Typography color="white" as="h1" variant="label">
          {title}
        </Typography>
      </FluidContainer>
    </Nav>
    <Content>{children}</Content>
  </PageContainer>
);
