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
    <Announcement
      text="The University&ndash;Student Union will have adjusted operating hours
        during Winter Break:"
      isVisible={false}
      linkText="2025 U-SU Winter Break Hours"
      href="https://www.dropbox.com/scl/fi/z06v9bjuqv1s4ysmlmjcp/2025-U-SU-Winter-Hours.pdf?rlkey=p5zccrkg6ay0yzakwx6qdj1xg&st=8t79eyed&raw=1"
    />
    <Nav />
    <main role="main">{children}</main>
    <Footer />
    <BackToTop />
  </PageContainer>
);
