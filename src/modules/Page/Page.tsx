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
        text="Due to the fires and current campus conditions, the U-SU is closed until further notice to ensure everyone's safety."
        isVisible={true}
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
