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
        text="Protest Action Alert: All operations at the U-SU are suspended until further notice."
        isVisible={false}
        linkText="Message from President Eanes: Student Services Building Incident, Encampment"
        href="https://www.calstatela.edu/president/messages/eanes#june13-ssbincident"
      />
      <Nav />
      <main>{children}</main>
      <BackToTop />
      <Footer />
    </PageContainer>
  </>
);
