import styled from 'styled-components';
import { FluidContainer, Typography } from 'components';
import { ModEventCard } from 'modules';
import { Colors, FontSizes, Spaces } from 'theme';
import { CampusGroupsEvent } from 'types';
import { useEffect, useRef, useState } from 'react';
import { EventModal } from 'modules/EventModal';
import { useBreakpoint } from 'hooks';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

/*
 * Three sizes, three roles. On a phone the eyebrow, the h1 and the event title
 * all rendered at 24px, which left nothing saying which to read first — the
 * eyebrow was exactly as loud as the heading it introduces. The eyebrow drops
 * to the smallest step on the scale and the h1 climbs, so the order is legible
 * before a word is read.
 */
const ResponsiveTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  /* Left on a phone so the heading shares a left edge with the card details
     below it. Centered, the eye had to find a new starting point twice on the
     way down the hero.
     
     The auto side margins below have to go with it. These lines are flex
     items, and an auto margin on a flex item beats the default stretch — the
     box shrinks to its text and centers on the cross axis, so text-align
     alone left-aligns the text inside a box that is still centered. */
  @media (max-width: 768px) {
    text-align: left;
  }

  .header-subheader {
    margin: 48px auto 24px;
    /* No bottom margin: the h1's own leading is the whole gap, which is what
       binds the eyebrow to the name instead of leaving them as two lines that
       happen to be near each other. */
    @media (max-width: 768px) {
      margin: 36px 0 0;
      font-size: ${FontSizes.xs};
    }
  }

  .header-title {
    margin: 0 auto 48px;
    font-weight: 600;
    /*
     * Display type sets tighter than body copy. Typography's 1.6 default puts
     * 18px between "University-Student" and "Union" — more air than sits
     * between the eyebrow and the name above, so the heading reads as two
     * separate lines rather than one wrapped one.
     *
     * The bottom margin is the other half: it makes the gap down to the event
     * card the largest one in the hero, so the eyebrow and the name group
     * together and the card reads as the next thing rather than part of them.
     */
    @media (max-width: 768px) {
      font-size: ${FontSizes.xl};
      font-weight: 700;
      line-height: 1.15;
      margin: 0 0 ${Spaces.md};
    }
  }
`;

const LiveTabList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* Follows the heading and the card details onto the left edge, so the hero
     does not read left, center, left on the way down. */
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
  gap: ${Spaces.sm};
  max-width: 800px;
  margin: 0 auto ${Spaces.md};
`;

/*
 * Fills on hover and while selected rather than recoloring its text, so the
 * open tab stays visibly attached to the card beneath it.
 */
const LiveTab = styled.button<{ $active: boolean }>`
  max-width: 260px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid ${Colors.black};
  cursor: pointer;
  font: inherit;
  /* The full title stays in the accessible name; only the glyphs are cut. */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: background-color 0.2s ease, color 0.2s ease;
  background-color: ${({ $active }) =>
    $active ? Colors.primary : Colors.transparent};
  color: ${Colors.black};

  &:hover,
  &:focus-visible {
    background-color: ${Colors.primary};
    color: ${Colors.black};
  }
`;

const LiveTabPanel = styled.div<{ $active: boolean }>`
  display: ${({ $active }) => ($active ? 'block' : 'none')};
`;

export const EventHeader = ({
  loading,
  featuredEvent,
  liveEvents = [],
  title,
  subheaderText,
}: {
  loading: boolean;
  /** Shown when nothing is live. */
  featuredEvent?: CampusGroupsEvent;
  /** In-progress events, earliest first. Takes the hero over `featuredEvent`. */
  liveEvents?: CampusGroupsEvent[];
  title?: React.ReactNode;
  subheaderText?: string;
}) => {
  const { isMobile } = useBreakpoint();
  const [selectedEvent, selectEvent] = useState<undefined | CampusGroupsEvent>(
    undefined,
  );
  const [activeLiveIndex, setActiveLiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const onRequestClose = () => selectEvent(undefined);

  /* An event ending mid-visit shortens the strip under us, so the open tab can
     point past the end of it. */
  useEffect(() => {
    if (activeLiveIndex >= liveEvents.length) setActiveLiveIndex(0);
  }, [activeLiveIndex, liveEvents.length]);

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    const lastIndex = liveEvents.length - 1;
    const nextIndex =
      event.key === 'ArrowRight'
        ? (index + 1) % liveEvents.length
        : event.key === 'ArrowLeft'
        ? (index + lastIndex) % liveEvents.length
        : event.key === 'Home'
        ? 0
        : event.key === 'End'
        ? lastIndex
        : index;
    if (nextIndex === index) return;
    event.preventDefault();
    setActiveLiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const hasLiveEvents = liveEvents.length > 0;
  const activeIndex = Math.min(activeLiveIndex, liveEvents.length - 1);

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
          as="p"
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

      {/* A single live event needs no switcher — the card's own badge says it. */}
      {hasLiveEvents && liveEvents.length > 1 && (
        <LiveTabList role="tablist" aria-label="Events happening now">
          {liveEvents.map((event, index) => (
            <LiveTab
              key={event.eventId}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              role="tab"
              type="button"
              id={`live-event-tab-${event.eventId}`}
              aria-controls={`live-event-panel-${event.eventId}`}
              aria-selected={index === activeIndex}
              tabIndex={index === activeIndex ? 0 : -1}
              $active={index === activeIndex}
              onClick={() => setActiveLiveIndex(index)}
              onKeyDown={(keyEvent) => onTabKeyDown(keyEvent, index)}
            >
              {event.title}
            </LiveTab>
          ))}
        </LiveTabList>
      )}

      <HeaderContainer>
        {hasLiveEvents ? (
          <div>
            {liveEvents.map((event, index) => (
              <LiveTabPanel
                key={event.eventId}
                role="tabpanel"
                id={`live-event-panel-${event.eventId}`}
                aria-labelledby={`live-event-tab-${event.eventId}`}
                $active={index === activeIndex}
              >
                <ModEventCard
                  featured
                  isLive
                  /* One shape across the strip: switching tabs must not
                     resize the page under whoever is reading it. */
                  lockFrameAspect={liveEvents.length > 1}
                  loading={loading}
                  event={event}
                  onClick={() => selectEvent(event)}
                />
              </LiveTabPanel>
            ))}
          </div>
        ) : (
          <ModEventCard
            featured
            loading={loading}
            event={featuredEvent as CampusGroupsEvent}
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
