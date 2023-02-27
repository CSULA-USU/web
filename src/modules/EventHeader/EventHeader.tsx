import styled from 'styled-components';
import { FluidContainer, Typography } from 'components';
import { EventCard } from 'modules';
import { PresenceEvent } from 'types';
import { Spaces } from 'theme';
import { useState } from 'react';
import { EventModal } from 'modules/EventModal';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
      backgroundImage="/subtle-background-1.jpg"
    >
      <Typography
        variant="pageHeader"
        margin={`0 auto ${Spaces.lg}`}
        size="2xl"
        color="greyDarker"
      >
        {title}
      </Typography>
      <HeaderContainer onClick={() => selectEvent(featuredEvent)}>
        <EventCard featured event={featuredEvent} />
      </HeaderContainer>
      <EventModal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        onRequestClose={onRequestClose}
      />
    </FluidContainer>
  );
};
