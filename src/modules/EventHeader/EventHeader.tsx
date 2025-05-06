import styled from 'styled-components';
import { FluidContainer, Typography } from 'components';
import { ModEventCard, ModEventCardSkeleton } from 'modules';
import { Colors, Spaces } from 'theme';
import { PresenceEvent } from 'types';
import { useState } from 'react';
import { EventModal } from 'modules/EventModal';
import { useBreakpoint } from 'hooks';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const HeroBackgroundSpecial = styled.div<{
  isDesktop: boolean;
  gifURL?: string;
}>`
  height: ${(p) => (!p.gifURL ? 'auto' : p.isDesktop ? '60vh' : '80vh')};
  position: relative;
  background-color: ${Colors.black};
  background-image: url(${(p) => (p.gifURL ? p.gifURL : '')});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 1;

  display: flex;
  flex-direction: column;

  // Dark filter over the event background.
  /* &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
  } */
`;

export const EventHeader = ({
  loading,
  featuredEvent,
  title,
  subheaderText,
  specialEventGif,
}: {
  loading: boolean;
  featuredEvent: PresenceEvent;
  title?: React.ReactNode;
  subheaderText?: string;
  specialEventGif?: string | undefined;
}) => {
  const { isMobile, isDesktop } = useBreakpoint();
  const [selectedEvent, selectEvent] = useState<undefined | PresenceEvent>(
    undefined,
  );
  const onRequestClose = () => selectEvent(undefined);
  return (
    <HeroBackgroundSpecial isDesktop={isDesktop} gifURL={specialEventGif}>
      <FluidContainer
        flex
        flexDirection="column"
        backgroundImage={
          !specialEventGif ? '/backgrounds/subtle-background-4.jpg' : ''
        }
        padding={isMobile ? `0 ${Spaces.sm} ${Spaces['xl']}` : `0 0 48px`}
      >
        <Typography
          variant="labelTitle"
          color="greyDarker"
          margin={isMobile ? '36px auto 0' : '48px auto 24px'}
          size={isMobile ? 'md' : 'lg'}
        >
          {subheaderText}
        </Typography>
        <Typography
          variant="pageHeader"
          color="greyDarker"
          size={isMobile ? '2xl' : '4xl'}
          weight={isMobile ? '700' : '600'}
          as="h1"
          margin={isMobile ? '0 auto' : '0 auto 48px'}
        >
          {title}
        </Typography>
        {!specialEventGif && (
          <>
            <HeaderContainer>
              {loading ? (
                <ModEventCardSkeleton />
              ) : (
                <ModEventCard
                  featured
                  event={featuredEvent}
                  onClick={() => selectEvent(featuredEvent)}
                />
              )}
            </HeaderContainer>
            <EventModal
              isOpen={!!selectedEvent}
              event={selectedEvent}
              onRequestClose={onRequestClose}
            />
          </>
        )}
      </FluidContainer>
    </HeroBackgroundSpecial>
  );
};
