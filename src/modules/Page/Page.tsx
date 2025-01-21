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
        text="We will reopen Thursday, January 16 from 7 AM to 5 PM. Please note that some departments will continue operating remotely."
        isVisible={false}
        linkText="Cal State LA Alerts"
        href="https://www.calstatela.edu/alerts"
      />
      <Nav />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </PageContainer>
  </>
);
