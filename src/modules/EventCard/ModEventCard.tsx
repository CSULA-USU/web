import {
  Button,
  LiveBadge,
  Skeleton,
  SkeletonWrapper,
  Typography,
} from 'components';
import { useBreakpoint } from 'hooks';
import { EventModal } from 'modules/EventModal';
import { useEffect, useState } from 'react';
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
 * The frame follows the flyer's own proportions between these two stops rather
 * than sorting uploads into shapes. Buckets need thresholds and thresholds have
 * edges — something at 2.6:1 has to fall on one side of a line, and eventually
 * a flyer lands exactly on it. A clamp has no categories, so nothing can fall
 * between them.
 *
 * The floor stops a portrait flyer turning the hero into a column; the ceiling
 * stops a 6:1 banner leaving a ribbon in a sea of blur. At the 800px cap the
 * frame runs 533px tall at its tallest and 267px at its shortest, and a 2:1
 * cover — which is what all but a couple of the feed's images are — lands
 * between them and fills the frame exactly, with no blur showing at all.
 */
const MIN_FRAME_ASPECT = 1.5;
const MAX_FRAME_ASPECT = 3;

/*
 * What the frame falls back to: while the image is still measuring, and for
 * every card in a live tab strip. Tabs share one shape on purpose — a switcher
 * that resizes the page under the reader is worse than an imperfect fit on one
 * of two cards. 2:1 because that is what the overwhelming majority of covers
 * arrive as.
 */
const FIXED_FRAME_ASPECT = 2;

/**
 * The shape the image frame takes: the flyer's own proportions, held between
 * the two stops above, or the fallback while it is still measuring and
 * whenever `locked` says a tab strip needs every card the same size.
 */
export const clampFrameAspect = (
  imageAspect: number | null,
  locked?: boolean,
) =>
  locked || imageAspect === null
    ? FIXED_FRAME_ASPECT
    : Math.min(Math.max(imageAspect, MIN_FRAME_ASPECT), MAX_FRAME_ASPECT);

export interface ModEventCardProps {
  event: CampusGroupsEvent;
  featured?: boolean;
  onClick?: () => void;
  loading?: boolean;
  /** Marks the card as under way. Gated on ending today — see `isEventLiveToday`. */
  isLive?: boolean;
  /**
   * Holds the frame at its fallback shape instead of following the image.
   * Set it wherever cards are swapped in place — a tab strip — so switching
   * does not resize the page.
   */
  lockFrameAspect?: boolean;
}

/* Holds the frame's fallback shape, so a 2:1 cover — nearly all of them — goes
   from skeleton to card without the page moving. */
const EventCardSkeletonContainer = styled(SkeletonWrapper)`
  display: flex;
  z-index: 1;
  flex-direction: column;
  margin: 0px auto ${Spaces.lg};
  max-width: 800px;
  aspect-ratio: ${FIXED_FRAME_ASPECT};
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
const EventImageFrame = styled.div<{ $aspect: number }>`
  position: relative;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  max-width: 800px;
  margin: 0px auto ${Spaces.lg};
  overflow: hidden;
  aspect-ratio: ${({ $aspect }) => $aspect};
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

const EventImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  lockFrameAspect,
}: ModEventCardProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imageAspect, setImageAspect] = useState<number | null>(null);
  const { isTablet } = useBreakpoint();
  const [selectedEvent, selectEvent] = useState<undefined | CampusGroupsEvent>(
    undefined,
  );

  // PRELOADER: This ensures we know when the background image is ready
  useEffect(() => {
    if (event?.eventOriginalPhotoFullUrl) {
      const img = new Image();
      img.src = event.eventOriginalPhotoFullUrl;
      img.onload = () => {
        /* The card holds a skeleton until this fires, so the frame knows the
           flyer's proportions before it paints — no measure-then-resize. */
        if (img.naturalHeight > 0) {
          setImageAspect(img.naturalWidth / img.naturalHeight);
        }
        setImgLoaded(true);
      };
      img.onerror = () => setImgLoaded(true); // Still show card if image fails
    } else if (event) {
      // If there's an event but NO image, we are "loaded"
      setImgLoaded(true);
    }
    /* Clear on the way out, or the next event's flyer paints into the previous
       one's frame until its own measurement lands. */
    return () => setImageAspect(null);
  }, [event]);

  // If we are waiting for data OR waiting for the image, show Skeleton
  if (parentLoading || !event || !imgLoaded) {
    return (
      <EventContainer>
        <EventCardSkeletonContainer />
        <HeroEventDetailsSkeleton />
        {/* HIDDEN PRELOADER: Triggers the download while the skeleton is active */}
        {event?.eventOriginalPhotoFullUrl && (
          <img
            src={event.eventOriginalPhotoFullUrl}
            style={{ display: 'none' }}
            alt=""
          />
        )}
      </EventContainer>
    );
  }

  // --- At this point, we GUARANTEE event exists and image is ready ---
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

  const frameAspect = clampFrameAspect(imageAspect, lockFrameAspect);

  return (
    <EventContainer>
      <EventImageFrame onClick={onClick} $aspect={frameAspect}>
        <BlurBackdrop aria-hidden="true" image={eventOriginalPhotoFullUrl} />
        {/* Decorative: title, date, time, location and org all render as text
            directly beneath, so the flyer repeats them rather than adding
            anything. The keyboard path into the event is the Learn More
            control in those details, not this image. */}
        <EventImage src={eventOriginalPhotoFullUrl} alt="" />
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
