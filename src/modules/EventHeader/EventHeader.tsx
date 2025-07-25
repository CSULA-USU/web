import styled from 'styled-components';
import { FluidContainer, Typography } from 'components';
import { ModEventCard, ModEventCardSkeleton } from 'modules';
import { Spaces } from 'theme';
import { PresenceEvent } from 'types';
import { useState } from 'react';
import { EventModal } from 'modules/EventModal';
import { useBreakpoint } from 'hooks';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const EventHeader = ({
  loading,
  featuredEvent,
  title,
  subheaderText,
}: {
  loading: boolean;
  featuredEvent: PresenceEvent;
  title?: React.ReactNode;
  subheaderText?: string;
}) => {
  const { isMobile } = useBreakpoint();
  const [selectedEvent, selectEvent] = useState<undefined | PresenceEvent>(
    undefined,
  );
  const onRequestClose = () => selectEvent(undefined);
  return (
    <FluidContainer
      flex
      flexDirection="column"
      backgroundImage="/backgrounds/subtle-background-4.jpg"
      padding={isMobile ? `0 ${Spaces.sm} ${Spaces['xl']}` : `0 0 48px`}
    >
      <Typography
        variant="labelTitle"
        color="greyDarker"
        as="h1"
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
    </FluidContainer>
  );
};
