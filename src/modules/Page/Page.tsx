import styled from 'styled-components';
import { Nav, Footer } from 'modules';
import { Colors } from 'theme';
import { Announcement, BackToTop } from 'components';

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
    <Announcement
      text="Out of an abundance of caution the U-SU is closed on Monday, Feb 5"
      isVisible={false}
    />
    <Nav />
    <div>{children}</div>
    <BackToTop></BackToTop>
    <Footer />
  </PageContainer>
);
