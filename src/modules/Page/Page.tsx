import styled from 'styled-components';
import { Nav, Footer } from 'modules';
import { Colors } from 'theme';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  background-color: ${Colors.white};
`;

interface PageProps {
  children: React.ReactNode;
}

export const Page = ({ children }: PageProps) => (
  <PageContainer>
    <Nav />
    <div>{children}</div>
    <Footer />
  </PageContainer>
);
