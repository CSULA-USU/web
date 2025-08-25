import { Typography, FluidContainer, Image } from 'components';
import { EventCard, EventSkeleton } from '../../modules/EventCard';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { eventListState, eventListStatusState } from 'atoms';
import { useEffect, useState } from 'react';
import { PresenceEvent } from 'types';
import { EventModal } from 'modules/EventModal';
import { Spaces } from 'theme';

interface DepartmentHeaderProps {
  title: string;
  backgroundImage?: string;
  children: React.ReactNode;
  infoSection: React.ReactNode;
  placeholderImageSrc?: string;
  placeholderImageAlt?: string;
}

const HeaderContent = styled.div`
  padding: 48px;

  @media (max-width: 768px) {
    padding: ${Spaces.sm};
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 550px;

  @media (max-width: 711px) {
    height: 850px;
  }

  > * {
    min-width: 320px;
    flex: 1;
  }
`;

const ImgBox = styled.div`
  display: grid;
  place-items: center;
  max-height: 550px; /* adjust if you want */
  max-width: 100%;
  overflow: hidden;
`;

const ImgReset = styled(Image)`
  width: auto !important;
  height: auto !important;
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: contain;
`;

export const DepartmentHeader = ({
  title,
  children,
  infoSection,
  placeholderImageSrc,
  placeholderImageAlt,
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
    if (eventsStatus !== 'undefined') {
      setLoading(false);
    }
  }, [events, eventsStatus]);

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
          ) : loading ? (
            <EventSkeleton />
          ) : placeholderImageSrc && placeholderImageAlt ? (
            <ImgBox>
              <ImgReset src={placeholderImageSrc} alt={placeholderImageAlt} />
            </ImgBox>
          ) : null}
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
