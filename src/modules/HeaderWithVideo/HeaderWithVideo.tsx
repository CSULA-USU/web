import styled from 'styled-components';

interface HeaderWithVideoProps {
  playbackID: string;
  children?: React.ReactNode;
}

const VideoContainer = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: black; /* Fallback color */
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* Behind other content */
`;

const ContentOverlay = styled.div`
  position: relative;
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
  playbackID,
  children,
}: HeaderWithVideoProps) => {
  return (
    <VideoContainer>
      <BackgroundVideo
        aria-hidden="true"
        src={`https://stream.new/v/${playbackID}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={(e) => console.error('Video error:', e)}
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video can play')}
      >
        Your browser does not support the video tag.
      </BackgroundVideo>
      <ContentOverlay>{children}</ContentOverlay>
    </VideoContainer>
  );
};
