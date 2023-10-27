import styled from 'styled-components';
import { FluidContainer, Typography } from 'components';
import { ModEventCard } from 'modules';
import { Spaces } from 'theme';
import { PresenceEvent } from 'types';
import { useState } from 'react';
import { EventModal } from 'modules/EventModal';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${Spaces.md};
`;

export const EventHeader = ({
  featuredEvent,
  title,
}: {
  featuredEvent: PresenceEvent;
  title?: React.ReactNode;
}) => {
  const [selectedEvent, selectEvent] = useState<undefined | PresenceEvent>(
    undefined,
  );
  const onRequestClose = () => selectEvent(undefined);
  return (
    <FluidContainer
      flex
      flexDirection="column"
      backgroundImage="/backgrounds/yellow-paint-short.jpg"
    >
      <Typography
        variant="pageHeader"
        margin={`0 auto`}
        size="2xl"
        color="greyDarker"
      >
        {title}
      </Typography>
      <HeaderContainer>
        <ModEventCard
          featured
          event={featuredEvent}
          onClick={() => selectEvent(featuredEvent)}
        />
      </HeaderContainer>
      <EventModal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        onRequestClose={onRequestClose}
      />
    </FluidContainer>
  );
};
