import { useId } from 'react';
import styled from 'styled-components';
import { BiGroup } from 'react-icons/bi';
import { MdLocationPin } from 'react-icons/md';
import { Colors, FontSizes, Radii, Shadows, Spaces } from 'theme';
import {
  WEEKDAY_ABBREVIATIONS,
  WEEKDAY_ORDER,
  type Weekday,
} from 'utils/openingHours';
import { AutoGrid } from '../AutoGrid';
import { Typography } from '../Typography';
import { VisuallyHidden } from '../VisuallyHidden';

const WORK_WEEK: readonly Weekday[] = WEEKDAY_ORDER.slice(0, 5);

export interface WeeklyClassCardProps {
  title: string;
  /** The days it meets. Any order; the card sorts them into the week. */
  days: Weekday[];
  /**
   * One time range for every meeting day, e.g. `5:00 PM to 5:30 PM`. A class
   * that meets at different times on different days does not fit this card
   * as built — it would need a time per day, not one per class.
   */
  time: string;
  description?: string;
  location?: string;
  /**
   * Written out in full, e.g. `Up to 15 participants`. The icon beside it is
   * decorative, so the string has to carry its own unit.
   */
  capacity?: string;
  /**
   * The days the strip draws. Defaults to Monday to Friday; pass the full
   * `WEEKDAY_ORDER` when a class meets on a weekend, or that day has no chip.
   */
  stripDays?: readonly Weekday[];
  /** Heading level, so a card sits correctly in its section's outline. */
  headingAs?: 'h2' | 'h3' | 'h4';
}

/* Pinned 'en' so the server and client join the list identically. Calendar
   order, not input order, so it reads the way the strip does. */
const dayList = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

const describeDays = (days: Weekday[]) =>
  dayList.format(
    WEEKDAY_ORDER.filter((day) => days.includes(day)).map((day) => `${day}s`),
  );

/* No top accent rule, unlike FacilityCard: the two sit on the same page, and
   the week strip is what should tell a class card apart, so it should not
   also borrow the facility card's silhouette. */
const Container = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${Spaces.lg};
  gap: ${Spaces.md};
  border-radius: ${Radii.surface};
  background-color: ${Colors.white};
  box-shadow: ${Shadows.soft};
`;

/* Chips share the row equally rather than sizing to their labels, so the
   five columns line up card to card down the grid. */
const DayStrip = styled.ol`
  display: flex;
  gap: ${Spaces.xs};
  margin: 0;
  padding: 0;
  list-style: none;
`;

/* A meeting day is filled and bold; a rest day is neither. Weight carries the
   difference alongside the fill, so it survives a view without color. */
const DayChip = styled.li<{ $active: boolean }>`
  flex: 1;
  padding: ${Spaces.sm} 0;
  border-radius: ${Radii.control};
  text-align: center;
  font-size: ${FontSizes['2xs']};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: ${(p) => (p.$active ? 700 : 400)};
  background-color: ${(p) =>
    p.$active ? Colors.primary : Colors.greyLightest};
  color: ${(p) => (p.$active ? Colors.black : Colors.greyDark)};
`;

/* Narrowest a footer column may get before location and capacity stack.
   Measured, not guessed: the widest item in use, "Up to 20 participants"
   with its icon, is 170px. A longer location or capacity would wrap inside
   its column; raise this if one does. */
const LOGISTICS_MIN_COLUMN_WIDTH = '170px';

/* Pinned to the foot so a row of cards closes on one line whatever length
   of description sits above. */
const Logistics = styled.div`
  margin-top: auto;
  padding-top: ${Spaces.md};
  border-top: 1px solid ${Colors.greyLighter};
`;

const LogisticsItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${Spaces.xs};

  svg {
    flex: none;
  }
`;

/**
 * One class that meets at the same time on the same days every week: its
 * name, then when — a week strip and the time — then what it is and where.
 * Nothing about it is Recreation-specific.
 *
 * Keep the heading first, in markup and on screen. Screen reader users move
 * through a grid like this one heading to heading, reading forward from
 * each, so anything placed before a card's heading is heard as the tail of
 * the previous card.
 */
export const WeeklyClassCard = ({
  title,
  days,
  time,
  description,
  location,
  capacity,
  stripDays = WORK_WEEK,
  headingAs = 'h3',
}: WeeklyClassCardProps) => {
  const headingId = useId();

  return (
    <Container aria-labelledby={headingId}>
      <Typography
        as={headingAs}
        id={headingId}
        variant="titleSmall"
        size="lg"
        weight="700"
        lineHeight="1.3"
        margin="0"
      >
        {title}
      </Typography>

      <div>
        {/* The strip is a picture of the schedule. The hidden days inside
            the time line are the schedule, read as one phrase:
            "Thursdays, 12:30 PM to 1:00 PM". */}
        <DayStrip aria-hidden="true">
          {stripDays.map((day) => (
            <DayChip key={day} $active={days.includes(day)}>
              {WEEKDAY_ABBREVIATIONS[day]}
            </DayChip>
          ))}
        </DayStrip>
        <Typography
          as="p"
          variant="labelTitle"
          size="md"
          weight="700"
          margin={`${Spaces.md} 0 0`}
        >
          <VisuallyHidden as="span">{`${describeDays(days)}, `}</VisuallyHidden>
          {time}
        </Typography>
      </div>

      {description && (
        <Typography
          as="p"
          variant="copy"
          size="xs"
          lineHeight="1.6"
          color="greyDarker"
          margin="0"
        >
          {description}
        </Typography>
      )}

      {(location || capacity) && (
        <Logistics>
          {/* Side by side or stacked is decided by the card's width, not by
              whether the text happens to fit, so every card in a grid row
              (all one width) switches together. Letting each footer wrap on
              its own put one card's footer on one line and its neighbor's
              on two, and the rules above them stepped card to card. A
              container query would say this more directly, but
              styled-components 5 strips the selector out of @container. */}
          <AutoGrid
            minColumnWidth={LOGISTICS_MIN_COLUMN_WIDTH}
            maxColumns={2}
            gap={Spaces.sm}
          >
            {location && (
              <LogisticsItem>
                <MdLocationPin
                  aria-hidden="true"
                  size="18px"
                  color={Colors.primary}
                />
                <Typography
                  as="span"
                  variant="span"
                  size="xs"
                  color="greyDarker"
                >
                  {location}
                </Typography>
              </LogisticsItem>
            )}
            {capacity && (
              <LogisticsItem>
                <BiGroup
                  aria-hidden="true"
                  size="18px"
                  color={Colors.primary}
                />
                <Typography
                  as="span"
                  variant="span"
                  size="xs"
                  color="greyDarker"
                >
                  {capacity}
                </Typography>
              </LogisticsItem>
            )}
          </AutoGrid>
        </Logistics>
      )}
    </Container>
  );
};
