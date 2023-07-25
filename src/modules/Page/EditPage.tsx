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

interface PageProps {
  children: React.ReactNode;
}

export const EditPage = ({ children }: PageProps) => (
  <PageContainer>
    <div>{children}</div>
  </PageContainer>
);
