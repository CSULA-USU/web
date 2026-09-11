import {
  Button,
  Image,
  LiveBadge,
  Skeleton,
  SkeletonWrapper,
  Typography,
} from 'components';
import { useBreakpoint } from 'hooks';
import { EventModal } from 'modules/EventModal';
import { useState } from 'react';
import { BiCalendar, BiTimeFive } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { MdLocationPin } from 'react-icons/md';
import { VscOrganization } from 'react-icons/vsc';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { CampusGroupsEvent } from 'types';
import { ABBREVIATED_ORGS } from 'utils/constants';
import { formatEventLocation } from 'utils/eventUtils';
import { getDay, getMonth, getTime } from 'utils/timehelpers';

/*
 * The image well's shape, fixed rather than measured.
 *
 * A frame that takes its ratio from the flyer cannot be drawn until the flyer
 * has downloaded, so the hero sat as a 2:1 skeleton and then resized to
 * whatever the image turned out to be — a portrait cover grew the well by a
 * third of its height and shoved the upcoming events below it down the page on
 * arrival. Committing to one ratio up front is what removes the shift: the
 * space is reserved in the first paint, and nothing measured later can move it.
 *
 * 2:1 because that is the shape CampusGroups actually serves — it normalizes
 * cover art, and all but a couple of the live feed's flyers arrive exactly 2:1
 * and fill the well with nothing left over. The stragglers sit inside it
 * rather than resizing it: `contain` keeps a portrait flyer whole, and the
 * blurred copy behind fills whatever containing leaves over. Same well, and
 * the same reasoning, as `MediaFrame` in the event modal.
 */
const FRAME_ASPECT = 2;

export interface ModEventCardProps {
  event: CampusGroupsEvent;
  featured?: boolean;
  onClick?: () => void;
  loading?: boolean;
  /** Marks the card as under way. Gated on ending today — see `isEventLiveToday`. */
  isLive?: boolean;
}

/* The same box the image well occupies, so the swap from skeleton to card
   leaves everything below it exactly where it was. */
const EventCardSkeletonContainer = styled(SkeletonWrapper)`
  display: flex;
  z-index: 1;
  flex-direction: column;
  margin: 0px auto ${Spaces.lg};
  max-width: 800px;
  aspect-ratio: ${FRAME_ASPECT};
  border-radius: 16px;
  border: 2px solid transparent;
  @media (max-width: 540px) {
    margin: 0px auto ${Spaces.md};
  }
`;

const SkeletonResponsiveContainer = styled.div`
  width: 100%;
  /* Default Desktop Height */
  height: 100px;

  @media (max-width: 768px) {
    /* Tablet/Mobile Height */
    height: 163px;
  }

  @media (max-width: 480px) {
    /* Smaller Mobile Height */
    height: 190px;
  }

  /* This targets the SkeletonWrapper specifically */
  & > div {
    height: 100%;
  }
`;

const HeroEventDetailsSkeleton = () => {
  return (
    <SkeletonResponsiveContainer>
      <Skeleton width="100%" />
    </SkeletonResponsiveContainer>
  );
};

/*
 * Coordinators upload whatever shape they have. Most covers arrive 2:1, but
 * square and portrait flyers land here too, so the flyer is contained rather
 * than cropped — losing the bottom of a portrait would take the date and
 * location off it. The blurred copy behind fills what containing leaves over,
 * which is what keeps a wide flyer from floating in empty bands. Both layers
 * point at the same URL, so the backdrop costs a paint and not a download.
 */
const EventImageFrame = styled.div`
  position: relative;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  max-width: 800px;
  margin: 0px auto ${Spaces.lg};
  overflow: hidden;
  aspect-ratio: ${FRAME_ASPECT};
  @media (max-width: 540px) {
    margin: 0px auto ${Spaces.md};
  }
  /* No transparent border here. aspect-ratio sizes the border box, so a border
     leaves the content box at a different ratio than the frame — with 2px each
     side, a perfect 2:1 cover fits by height instead and exposes 2px of the
     blurred backdrop down both edges. Nothing ever made the border visible. */
  border-radius: 16px;
  cursor: pointer;
`;

const BlurBackdrop = styled.div<{ image?: string }>`
  position: absolute;
  background: ${({ image }) => image && `url(${image})`};
  background-size: cover;
  background-position: center;
  /*
   * Overhangs the box by more than the blur radius, so the fade at the
   * backdrop's own edge is always clipped away rather than showing as a dark
   * seam. The overhang has to be absolute: a proportional scale() buys
   * plenty on an 800px hero and less than the 24px radius on a ~300px grid
   * card, and its subpixel rounding lands inside the clip on one edge and
   * outside on the other, which is what put a sliver down one side only.
   */
  inset: -32px;
  filter: blur(24px) brightness(0.9);
`;

/*
 * Lifts the flyer and its shimmer above the backdrop. The backdrop is
 * positioned, so an in-flow layer would paint underneath it and the flyer
 * would sit behind its own blur.
 */
const FlyerLayer = styled.div`
  position: absolute;
  inset: 0;

  /* The skeleton frame Image wraps itself in sits between this and the img, so
     the flyer has to be sized from here rather than on the element itself. */
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const LiveBadgeSlot = styled.div`
  position: absolute;
  top: ${Spaces.sm};
  left: ${Spaces.sm};
  z-index: 1;
`;

const EventContainer = styled.div`
  display: flex;
  width: 1080px;
  flex-direction: column;
  @media (max-width: 1100px) and (min-width: 600px) {
    width: 100%;
    padding: 0 18px;
  }
`;

const EventDetails = styled.div`
  margin: 0px ${Spaces.md};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EventDateSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  min-width: 50px;
  width: 80px;
  height: 80px;
  border-radius: 16px;
  margin: auto;
  @media (max-width: 768px) {
    height: 60px;
    width: 60px;
  }
`;

const HeroEventDetails = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  height: 100px;
  width: 100%;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  min-width: 184px;
`;

const DetailsSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const MobileDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 10px;
`;

const MobileRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

/*
 * Line box of a row's text, which is what the icon has to center against.
 * Both come out of Typography: no variant here sets its own line-height, so
 * they inherit the 1.6 default — 16px text for the detail rows, 18px for the
 * time.
 */
const DETAIL_ROW_LINE_HEIGHT = '25.6px';
const TIME_ROW_LINE_HEIGHT = '28.8px';

/*
 * Pushes the glyph a hair below the arithmetic center. Icon glyphs do not fill
 * their own 20px box evenly and text sits low in its line box, so the centers
 * matching on paper reads as the icon riding high. Tuned by eye — if the rows
 * still look off, this is the one number to move.
 */
const ICON_OPTICAL_NUDGE = '1px';

/*
 * Nominal icon sizes are not comparable across families, so the info glyph
 * asks for less to arrive the same size as the rest of the rows.
 *
 * The calendar, clock, pin and org icons are Boxicons, Material and Codicons,
 * drawn inside their grid with a margin, so a nominal 20px renders roughly
 * 17px of ink. BsInfoCircle is a Bootstrap icon on a 16-unit grid drawn edge
 * to edge, so the same 20 renders a full 20px and reads about a fifth larger
 * sitting next to them.
 */
const INFO_ICON_SIZE = '17';

const InfoContainer = styled.div<{ $lineHeight?: string }>`
  display: flex;
  /* Pinned to the first line rather than the middle of the block. A location
     long enough to wrap — most of them, on a phone — would otherwise leave its
     icon floating between the two lines with neither. */
  align-items: flex-start;

  /* Locations wrap (some are full Zoom URLs); the icon keeps its 20px. */
  svg {
    flex-shrink: 0;
    /* Half the gap between the line box and the icon puts the two centers
       together; the nudge covers what the glyph's own bearings add. Padding
       and not margin, because these icons carry inline margin shorthands and
       an inline style would win. */
    padding-top: calc(
      (${({ $lineHeight }) => $lineHeight || DETAIL_ROW_LINE_HEIGHT} - 20px) / 2 +
        ${ICON_OPTICAL_NUDGE}
    );
  }
`;

const MobileBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 5px;
`;

export const ModEventCard = ({
  event,
  featured,
  onClick,
  loading: parentLoading,
  isLive,
}: ModEventCardProps) => {
  const { isTablet } = useBreakpoint();
  const [selectedEvent, selectEvent] = useState<undefined | CampusGroupsEvent>(
    undefined,
  );

  /* Only the data holds the card back now. The flyer does not: the well below
     is already its final size without it, and the skeleton shimmers inside
     that well while it downloads, so waiting on the image would keep the
     title, date, time and location off the page for nothing. */
  if (parentLoading || !event) {
    return (
      <EventContainer>
        <EventCardSkeletonContainer />
        <HeroEventDetailsSkeleton />
      </EventContainer>
    );
  }

  const {
    group,
    title,
    eventLocation,
    eventStartDateTime,
    eventEndDateTime,
    eventOriginalPhotoFullUrl,
  } = event;
  const onRequestClose = () => selectEvent(undefined);
  const startTime = getTime(eventStartDateTime);
  const endTime = getTime(eventEndDateTime);
  const monthAbbr = getMonth(eventStartDateTime, 'short').toUpperCase();
  const month = getMonth(eventStartDateTime);
  const day = getDay(eventStartDateTime);

  return (
    <EventContainer>
      <EventImageFrame onClick={onClick}>
        <BlurBackdrop aria-hidden="true" image={eventOriginalPhotoFullUrl} />
        {/* Decorative: title, date, time, location and org all render as text
            directly beneath, so the flyer repeats them rather than adding
            anything. The keyboard path into the event is the Learn More
            control in those details, not this image. */}
        {eventOriginalPhotoFullUrl && (
          <FlyerLayer>
            <Image
              src={eventOriginalPhotoFullUrl}
              alt=""
              skeletonWhileLoading
            />
          </FlyerLayer>
        )}
        {isLive && (
          <LiveBadgeSlot>
            <LiveBadge />
          </LiveBadgeSlot>
        )}
      </EventImageFrame>
      {featured && !isTablet ? (
        <HeroEventDetails>
          <EventDateSection>
            <Typography
              as="span"
              variant="eventDetail"
              size="md"
              lineHeight="1"
            >
              <abbr title={month}>{monthAbbr}</abbr> <br />
            </Typography>
            <Typography
              as="span"
              variant="pageHeader"
              size="2xl"
              color="white"
              lineHeight="1"
            >
              {day}
            </Typography>
          </EventDateSection>
          <DetailsSection>
            <EventDetails>
              <Typography
                as="h2"
                variant="eventTitle"
                lineHeight="1.2"
                color="black"
              >
                {title}
              </Typography>
              <InfoContainer $lineHeight={TIME_ROW_LINE_HEIGHT}>
                <BiTimeFive
                  aria-hidden="true"
                  size="20px"
                  style={{ margin: '0px 3px 0px 4px' }}
                />
                <Typography as="h3" variant="eventTime" color="black">
                  {startTime} - {endTime}
                </Typography>
              </InfoContainer>
              <InfoContainer>
                <MdLocationPin
                  size="20px"
                  style={{ margin: '0px 3px 0px 3px' }}
                  aria-hidden="true"
                />
                <Typography
                  as="h4"
                  variant="eventDetail"
                  style={{ overflowWrap: 'anywhere' }}
                  color="black"
                >
                  {eventLocation.indexOf('.zoom.us') > -1 ? (
                    <a href={eventLocation}>Zoom Meeting</a>
                  ) : (
                    formatEventLocation(eventLocation)
                  )}
                </Typography>
              </InfoContainer>
            </EventDetails>
            <ButtonSection>
              <Typography as="h3" variant="eventDetail" color="black">
                {ABBREVIATED_ORGS[group] || group}
              </Typography>
              {featured ? (
                <Button
                  margin="12px 0 0"
                  onClick={() => selectEvent(event)}
                  variant="black"
                >
                  Learn More
                </Button>
              ) : (
                <Typography color="primary" size="sm">
                  Learn More
                </Typography>
              )}
            </ButtonSection>
          </DetailsSection>
        </HeroEventDetails>
      ) : (
        <MobileDetails>
          <MobileRight>
            {/* One step below the page h1 (24px on mobile). At lg they were
                the same size, which left the hero with no hierarchy to read. */}
            <Typography
              as="h2"
              variant="eventDetail"
              lineHeight="1.2"
              color="black"
              size="md"
            >
              {title}
            </Typography>
            <InfoContainer>
              <BiCalendar size="20px" style={{ margin: '0px 8px 2px 0px' }} />
              <Typography as="h3" variant="eventDetail" color="black">
                <abbr title={month}>{monthAbbr}</abbr> {day}
              </Typography>
            </InfoContainer>
            <InfoContainer $lineHeight={TIME_ROW_LINE_HEIGHT}>
              <BiTimeFive
                aria-hidden="true"
                size="20px"
                style={{ margin: '0px 8px 2px 0px' }}
              />
              <Typography as="h3" variant="eventTime" color="black">
                {startTime} - {endTime}
              </Typography>
            </InfoContainer>
            <InfoContainer>
              <MdLocationPin
                size="20px"
                style={{ margin: '0px 8px 0px 0px' }}
              />
              <Typography
                as="h4"
                variant="eventDetail"
                style={{ overflowWrap: 'anywhere' }}
                color="black"
              >
                {eventLocation.indexOf('.zoom.us') > -1 ? (
                  <a href={eventLocation}>Zoom Meeting</a>
                ) : (
                  formatEventLocation(eventLocation)
                )}
              </Typography>
            </InfoContainer>
            <MobileBottom>
              <InfoContainer>
                <VscOrganization
                  size="20px"
                  style={{ margin: '0px 8px 2px 0px' }}
                />
                <Typography as="span" variant="eventDetail" color="black">
                  {ABBREVIATED_ORGS[group] || group}
                </Typography>
              </InfoContainer>
              {featured ? (
                <Button
                  onClick={() => selectEvent(event)}
                  variant="transparent"
                  padding="0"
                >
                  <BsInfoCircle
                    aria-label="Learn More"
                    size={INFO_ICON_SIZE}
                    color={`${Colors.gold}`}
                  />
                </Button>
              ) : (
                <Typography color="primary" size="sm">
                  Learn More
                </Typography>
              )}
            </MobileBottom>
          </MobileRight>
        </MobileDetails>
      )}
      <EventModal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        onRequestClose={onRequestClose}
      />
    </EventContainer>
  );
};
