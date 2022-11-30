import styled from 'styled-components';
import { Header, Footer } from 'modules';
import { Colors } from 'theme';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1920px;
  margin: 0 auto;
  background-color: ${Colors.white};
`;

interface PageProps {
  children: React.ReactNode;
}

export const Page = ({ children }: PageProps) => (
  <PageContainer>
    <div>
      <Header />
      {children}
    </div>
    <Footer />
  </PageContainer>
);
