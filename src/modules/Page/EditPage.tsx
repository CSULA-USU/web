import { FluidContainer, Typography } from 'components';
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
  height: 120px;
  background-color: ${Colors.greyDarkest};
`;

const Content = styled.div`
  min-height: calc(100vh - 120px);
`;

interface PageProps {
  children: React.ReactNode;
  title: string;
}

export const EditPage = ({ children, title }: PageProps) => (
  <PageContainer>
    <Nav>
      <FluidContainer>
        <Typography color="white" as="h1" variant="title">
          {title}
        </Typography>
      </FluidContainer>
    </Nav>
    <Content>{children}</Content>
  </PageContainer>
);
