import styled from 'styled-components';
import { FluidContainer, Typography } from 'components';
import { ModEventCard } from 'modules';
import { Spaces } from 'theme';
import { PresenceEvent } from 'types';
import { useState } from 'react';
import { EventModal } from 'modules/EventModal';
import { useBreakpoint } from 'hooks';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ResponsiveTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  .header-subheader {
    margin: 48px auto 24px;
    @media (max-width: 768px) {
      margin: 36px auto 0;
    }
  }

  .header-title {
    margin: 0 auto 48px;
    font-weight: 600;
    @media (max-width: 768px) {
      font-size: 1.5rem; /* Matches 2xl */
      font-weight: 700;
      margin: 0 auto;
    }
  }

  .mobile-only {
    display: none;
  }

  .desktop-only {
    display: inline;
  }

  @media (max-width: 768px) {
    .mobile-only {
      display: inline;
    }
    .desktop-only {
      display: none;
    }
  }
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
      backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-4.webp"
      padding={isMobile ? `0 ${Spaces.sm} 48px` : `0 0 48px`}
    >
      <ResponsiveTextWrapper>
        <Typography
          className="header-subheader"
          variant="labelTitle"
          color="greyDarker"
          as="h1"
          size="lg"
        >
          {subheaderText}
        </Typography>

        <Typography
          className="header-title"
          variant="pageHeader"
          color="greyDarker"
          as="h1"
          size="4xl"
        >
          {title}
        </Typography>
      </ResponsiveTextWrapper>

      <HeaderContainer>
        <ModEventCard
          featured
          loading={loading}
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
