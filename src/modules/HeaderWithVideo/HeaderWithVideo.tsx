import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { useEffect, useRef } from 'react';

// Dynamic import - only loads on client
const Video = dynamic(() => import('next-video'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'black' }} />
  ),
});

interface HeaderWithVideoProps {
  children?: React.ReactNode;
  desktopSrc: any;
  mobileSrc?: any;
  thumbnail?: string;
}

const VideoContainer = styled.div`
  height: auto;
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: black;
`;

const ContentOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderWithVideo = ({
  children,
  desktopSrc,
  mobileSrc,
  thumbnail,
}: HeaderWithVideoProps) => {
  const { isTablet } = useBreakpoint();
  const videoSrc = isTablet ? mobileSrc : desktopSrc;
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Programmatically trigger autoplay after the mux-video element mounts.
  // React 18 doesn't reliably set attributes on custom elements (web components)
  // during initial mount via dynamic import, so autoplay may not trigger
  // until a re-render. This effect detects the element and plays it.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const attemptPlay = (el: HTMLMediaElement) => {
      if (!el.paused) return;
      el.muted = true;
      const p = el.play();
      if (p) p.catch(() => {});
    };

    const setup = (el: HTMLMediaElement) => {
      if (el.readyState >= 3) {
        attemptPlay(el);
      } else {
        el.addEventListener('canplay', () => attemptPlay(el), { once: true });
      }
    };

    const media = container.querySelector(
      'mux-video, video',
    ) as HTMLMediaElement | null;
    if (media) {
      setup(media);
      return;
    }

    // Video element may not exist yet due to dynamic import
    const observer = new MutationObserver(() => {
      const media = container.querySelector(
        'mux-video, video',
      ) as HTMLMediaElement | null;
      if (media) {
        observer.disconnect();
        setup(media);
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [videoSrc]);

  return (
    <VideoContainer ref={containerRef}>
      <Video
        aria-hidden="true"
        src={videoSrc}
        autoPlay
        muted
        loop
        poster={thumbnail}
        playsInline
        preload="auto"
      />
      <ContentOverlay>{children}</ContentOverlay>
    </VideoContainer>
  );
};
