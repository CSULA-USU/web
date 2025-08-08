import styled from 'styled-components';
import Video from 'next-video';
import { useBreakpoint } from 'hooks/useBreakpoint';

interface HeaderWithVideoProps {
  children?: React.ReactNode;
  desktopSrc: any;
  mobileSrc?: any;
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
}: HeaderWithVideoProps) => {
  const { isTablet } = useBreakpoint();
  const videoSrc = isTablet ? mobileSrc : desktopSrc;
  return (
    <VideoContainer>
      <Video
        aria-hidden="true"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        poster="https://image.mux.com/5006jkrbON0102GtWswHvULvNts6fBCS1HngiHL011spHuQ/thumbnail.png?time=23&fit_mode=preserve"
        preload="metadata"
        onError={(e) => console.error('Video error:', e)}
      />
      <ContentOverlay>{children}</ContentOverlay>
    </VideoContainer>
  );
};
