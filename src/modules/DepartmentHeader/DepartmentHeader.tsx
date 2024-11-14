import { Typography, FluidContainer } from 'components';
import { EventCard, EventSkeleton } from '../../modules/EventCard';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { eventListState, eventListStatusState } from 'atoms';
import { useEffect, useState } from 'react';
import { PresenceEvent } from 'types';
import { EventModal } from 'modules/EventModal';

interface DepartmentHeaderProps {
  title: string;
  backgroundImage?: string;
  children: React.ReactNode;
  infoSection: React.ReactNode;
}
const HeaderContent = styled.div`
  padding: 48px;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  > * {
    min-width: 320px;
    flex: 1;
  }
`;
export const DepartmentHeader = ({
  title,
  children,
  infoSection,
}: DepartmentHeaderProps) => {
  const [loading, setLoading] = useState(true);
  const events = useRecoilValue(eventListState);
  const eventsStatus = useRecoilValue(eventListStatusState);
  const departmentEvent = events.find(
    (event) => event.organizationName === title,
  );
  const [selectedEvent, selectEvent] = useState<undefined | PresenceEvent>(
    undefined,
  );
  const onRequestClose = () => selectEvent(undefined);

  useEffect(() => {
    if (eventsStatus != 'undefined') {
      setLoading(false);
    }
  }, [events]);

  return (
    <>
      <FluidContainer backgroundImage="/backgrounds/subtle-background-3.jpg">
        <HeaderContainer>
          <HeaderContent>
            <Typography variant="labelTitle" as="h1">
              Welcome to the
            </Typography>
            <Typography
              margin="0 0 24px"
              variant="titleLarge"
              weight="400"
              as="h1"
            >
              {title}
            </Typography>
            <Typography>{children}</Typography>
          </HeaderContent>
          {departmentEvent ? (
            <EventCard
              onClick={() => selectEvent(departmentEvent)}
              featured
              event={departmentEvent}
            />
          ) : (
            loading && <EventSkeleton />
          )}
        </HeaderContainer>
        {infoSection}
      </FluidContainer>
      <EventModal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        onRequestClose={onRequestClose}
      />
    </>
  );
};
