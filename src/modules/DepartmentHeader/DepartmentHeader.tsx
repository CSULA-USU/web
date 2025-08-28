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
  display: grid;
  grid-template-columns: 1fr minmax(320px, 1fr);
  align-items: start;
  gap: ${Spaces.lg};
  /* Reserve initial space to avoid CLS without capping height */
  min-height: 550px;

  @media (max-width: 711px) {
    grid-template-columns: 1fr;
    min-height: 0;
  }
`;

/* A wrapper that reserves predictable space while content loads,
   but allows the column to grow if the card is taller. */
const FeatureSlot = styled.div`
  /* Reserve space to prevent layout shift when swapping Skeleton -> Card */
  min-height: 360px; /* match your EventSkeleton's height */
  /* Remove hard caps so the container grows instead of overlapping */
  /* If you *must* cap, use max-height: 550px; overflow: auto; */
`;

/* If you're showing a placeholder image, give it a stable box */
const ImgBox = styled.div`
  width: 100%;
  /* Stable aspect ratio prevents CLS */
  aspect-ratio: 16 / 9;
  overflow: hidden;
  display: grid;
  place-items: center;
`;

const ImgReset = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover; /* cover = fills box nicely */
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

          <FeatureSlot>
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
          </FeatureSlot>
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
