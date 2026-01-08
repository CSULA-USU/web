import styled from 'styled-components';
import { Nav, Footer } from 'modules';
import { useEffect, useState } from 'react';
import { Colors } from 'theme';
import { Announcement, BackToTop } from 'components';
import { getVisibleAnnouncementBanner } from 'api/announcementBanner';
import type { AnnouncementBannerType } from 'types/AnnouncementBanner';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-x: clip;
  background-color: ${Colors.white};

  abbr {
    text-decoration: none;
  }
`;

interface PageProps {
  children: React.ReactNode;
}

export const Page = ({ children }: PageProps) => {
  const [banner, setBanner] = useState<AnnouncementBannerType | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await getVisibleAnnouncementBanner();
        if (mounted) setBanner(data);
      } catch {
        // no banner is fine; fail silently
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <PageContainer>
      <Announcement
        text={banner?.text}
        isVisible={!!banner?.is_visible}
        linkText={banner?.link_text}
        href={banner?.href}
      />

      <Nav />
      <main role="main">{children}</main>
      <Footer />
      <BackToTop />
    </PageContainer>
  );
};
