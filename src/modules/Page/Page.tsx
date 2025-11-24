import styled from 'styled-components';
import { Nav, Footer } from 'modules';
import { Colors } from 'theme';
import { Announcement, BackToTop, Typography } from 'components';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  overflow-x: hidden
  overflow-x: clip;
  background-color: ${Colors.white};
  abbr {
    text-decoration: none;
  }
`;

interface PageProps {
  children: React.ReactNode;
}

export const Page = ({ children }: PageProps) => (
  <PageContainer>
    <Announcement text="" isVisible={true} linkText="" href="">
      <Typography as="p">
        The University&ndash;Student Union will have adjusted operating hours
        during Fall Break:
      </Typography>
      <ul>
        <li>
          <Typography as="p">
            November 24&ndash;25: Open from 7 AM to 7 PM
          </Typography>
        </li>
        <li>
          <Typography as="p">November 26: Open from 7 AM to 5 PM</Typography>
        </li>
        <li>
          <Typography as="p">November 27&ndash;30: Closed</Typography>
        </li>
      </ul>
    </Announcement>
    <Nav />
    <main role="main">{children}</main>
    <Footer />
    <BackToTop />
  </PageContainer>
);
