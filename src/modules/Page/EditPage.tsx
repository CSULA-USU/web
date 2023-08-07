import { Typography } from 'components';
import styled from 'styled-components';
import { Colors } from 'theme';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  background-color: ${Colors.white};
  overflow: hidden;
`;

const Nav = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  padding: 16px;
  width: 100%;
  height: 80px;
  background-color: ${Colors.greyDarkest};
`;

const Content = styled.div`
  margin-top: 80px;
  height: calc(100vh - 80px);
`;

interface PageProps {
  children: React.ReactNode;
  title: string;
}

export const EditPage = ({ children, title }: PageProps) => (
  <PageContainer>
    <Nav>
      <Typography color="white" as="h1" variant="label">
        {title}
      </Typography>
    </Nav>
    <Content>{children}</Content>
  </PageContainer>
);
