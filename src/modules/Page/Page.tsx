import styled from 'styled-components';
import { Nav, Footer } from 'modules';
import { Colors } from 'theme';
import { Announcement, BackToTop } from 'components';
import Head from 'next/head';

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
        text="Out of an abundance of caution the U-SU is closed on Monday, Feb 5"
        isVisible={false}
      />
      <Nav />
      <main>
        <Head>
          <meta
            name="image"
            property="og:image"
            content="/departments/ccc/ccc-grad-banner.jpg"
          />
        </Head>
        {children}
      </main>
      <BackToTop />
      <Footer />
    </PageContainer>
  </>
);
