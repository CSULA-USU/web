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
  abbr {
    text-decoration: none;
  }
`;

interface PageProps {
  children: React.ReactNode;
}

export const Page = ({ children }: PageProps) => (
  <>
    <PageContainer>
      <Announcement
        text="Notice: All operations at the U-SU to return in person on Monday, June 24."
        isVisible={false}
        linkText="Message from President Eanes: Return to In-Person Classes and Operations"
        href="https://www.calstatela.edu/president/messages/eanes#june18-return"
      />
      <Nav />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </PageContainer>
  </>
);
