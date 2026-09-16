import { Typography } from 'components';
import styled from 'styled-components';
import { Colors, Shadows, Spaces } from 'theme';
import { CampusGroupsEvent } from 'types';
import { Image } from 'components';
import { ABBREVIATED_ORGS } from 'utils/constants';
import { formatEventLocation, getEventFlyerUrl } from 'utils/eventUtils';
import { getDay, getMonth, getTime, getYear } from 'utils/timehelpers';

export interface SplitEventCardProps {
  event: CampusGroupsEvent;
  featured?: boolean;
  onClick?: () => void;
}

const Card = styled.div`
  border: ${Colors.greyLighter} solid 1px;
  background-color: ${Colors.white};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between;
  /*
   * No fixed height. The grid stretches every card in a row to the tallest, so
   * the row is uniform without a magic number that has to hold at four
   * different column counts — at four columns a 550px card left the graphic
   * box more than twice as tall as the flyer inside it.
   */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover,
  &:focus {
    transform: translateY(-4px);
    box-shadow: ${Shadows.lifted};
  }
`;

/*
 * The flyer is contained and a blurred copy of it fills whatever is left over.
 * Coordinators upload any shape they like, so without the backdrop a flyer that
 * does not match the well is a strip marooned in white.
 *
 * Contained, never cropped — this is a rule, not a default. Cropping wide
 * flyers to fill was tried here and reverted: these are layouts with type
 * running edge to edge rather than photographs, so filling the well cut a
 * banner's title down to its middle few letters, and Wingspan rendered as
 * "ngsp". A flyer too wide for the well now renders whole but small, which is
 * the lesser failure and reaches only the handful of banner-shaped outliers.
 *
 * Unlike the homepage hero, the well does not follow the image's proportions.
 * These cards sit in a grid, and a per-image height would leave every row
 * ragged; uniform cards are worth more here than a perfect fit.
 */
const GraphicContainer = styled.div`
  position: relative;
  width: 100%;
  /*
   * 3:2, matching ModEventCard's well, because both now draw from
   * getEventFlyerUrl — the coordinator's own upload, which is square, rather
   * than the 2:1 cover CampusGroups crops from it. A 2:1 well showed a square
   * at 400x400 inside 800px, a stamp between 200px bands of blur; at 3:2 the
   * same flyer comes out 533x533 and the bands are 133px.
   *
   * The cost is a taller card and so fewer events on screen. That is paid
   * deliberately: square is the common shape in this feed, and the covers that
   * still arrive 2:1 lose only a shallow band at top and bottom.
   */
  aspect-ratio: 3 / 2;
  flex-shrink: 0;
  overflow: hidden;

  /* Image renders a bare img here, so the box is set from out here rather than
     through props — styled-system would turn a width prop into an attribute on
     the element as well as CSS. */
  img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
`;

const BlurBackdrop = styled.div<{ $image?: string }>`
  position: absolute;
  background: ${({ $image }) => $image && `url(${$image})`};
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

const Details = styled.div`
  flex: 1;
  padding: ${Spaces.lg};
  display: flex;
  flex-direction: column;
  text-overflow: ellipsis;
  justify-content: space-between;
`;

const EventHeader = styled.div`
  /* Two lines' worth whether the title fills them or not, so the date, time and
     location rows below line up from card to card. Two lines because that is
     where the clamp cuts, and 24px is labelTitle's line box. */
  min-height: 48px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FinerDetails = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
`;

const LearnMoreButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  text-decoration: underline;
  color: ${Colors.gold};
`;

export const SplitEventCard = ({ event, onClick }: SplitEventCardProps) => {
  if (!event) return null;
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const { group, title, eventLocation, eventStartDateTime, eventEndDateTime } =
    event;
  /* The coordinator's upload where there is one, so a square flyer arrives
     whole. The 2:1 cover this used to read is cropped to fill by CampusGroups
     before we ever see it, which is why no amount of object-fit could stop
     Recreation's square schedule losing its footer. */
  const flyerUrl = getEventFlyerUrl(event);
  const startTime = getTime(eventStartDateTime);
  const endTime = getTime(eventEndDateTime);
  const month = getMonth(eventStartDateTime);
  const day = getDay(eventStartDateTime);
  const year = getYear(eventStartDateTime);
  const dayOfTheWeek = daysOfWeek[new Date(eventStartDateTime).getDay()];

  return (
    <Card onClick={onClick}>
      <GraphicContainer>
        <BlurBackdrop aria-hidden="true" $image={flyerUrl} />
        <Image alt="" src={flyerUrl} sizes="100vw" lazy aria-hidden="true" />
      </GraphicContainer>
      <Details>
        <EventHeader>
          <Typography as="h3" variant="labelTitle" color="black">
            {title}
          </Typography>
        </EventHeader>
        <Typography variant="copy" color="black">
          {dayOfTheWeek}, {month} {day}, {year}
        </Typography>
        <Typography variant="copy" color="black">
          {startTime} to {endTime}
        </Typography>
        <Typography variant="copy" color="black">
          {formatEventLocation(eventLocation)}
        </Typography>
        <FinerDetails>
          <Typography variant="cta">
            <abbr title={group}>{ABBREVIATED_ORGS[group]}</abbr>
          </Typography>
          <LearnMoreButton onClick={onClick}>
            <Typography color="gold">Learn More</Typography>
          </LearnMoreButton>
        </FinerDetails>
      </Details>
    </Card>
  );
};
