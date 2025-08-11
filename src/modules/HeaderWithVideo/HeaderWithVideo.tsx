import styled from 'styled-components';
import Video from 'next-video';
import { useBreakpoint } from 'hooks/useBreakpoint';

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

  return (
    <VideoContainer>
      <Video
        aria-hidden="true"
        src={videoSrc}
        autoPlay
        muted
        loop
        poster={thumbnail}
        playsInline
        preload="metadata"
        onError={(e) => console.error('Video error:', e)}
      />
      <ContentOverlay>{children}</ContentOverlay>
    </VideoContainer>
  );
};
