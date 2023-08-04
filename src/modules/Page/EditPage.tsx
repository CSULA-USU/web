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
  position: relative;
`;

const Nav = styled.div`
  position: fixed;
  display: flex;
  padding: 8px;
  width: 100%;
  height: 80px;
  background-color: ${Colors.greyDarkest};
`;

const Content = styled.div`
  margin-top: 80px;
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
