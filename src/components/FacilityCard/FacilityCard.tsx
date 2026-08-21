import styled from 'styled-components';
import { BiPhone, BiTimeFive } from 'react-icons/bi';
import { MdLocationPin } from 'react-icons/md';
import { Colors, FontSizes, Shadows, Spaces } from 'theme';
import { Typography } from '../Typography';
import { StyledLink } from '../Link';
import { TapTarget } from '../TapTarget';

export interface FacilityHours {
  day: string;
  time: string;
  /**
   * A second opening block on the same day, for a space that closes midday
   * and reopens later. Renders on its own line beneath `time`.
   */
  secondTime?: string;
}

type FacilityGround = 'onLight' | 'onDark';

export interface FacilityCardProps {
  name: string;
  /** Where the space is, e.g. `U-SU Basement`. */
  location?: string;
  /**
   * Human-readable form, e.g. `(323) 343-6909`. The `tel:` href is derived
   * from its digits, so a caller never writes the number twice.
   */
  phone?: string;
  /** One line on what is in the space. */
  description?: string;
  hours?: FacilityHours[];
  /** Page devoted to this space. Omit and no link renders. */
  href?: string;
  linkText?: string;
  isExternalLink?: boolean;
  /** Heading level, so a card sits correctly in its section's outline. */
  headingAs?: 'h2' | 'h3' | 'h4';
  /** Ground the card sits on. Drives its surface, rules, and type color. */
  variant?: FacilityGround;
  /**
   * Reserves this many lines of height for the name, so a row of cards lines
   * up beneath their headings even when one name wraps and the rest do not.
   * A name longer than the reservation still renders in full — this sets a
   * floor, not a ceiling.
   */
  titleLines?: number;
}

interface Ground {
  background: keyof typeof Colors;
  heading: keyof typeof Colors;
  body: keyof typeof Colors;
  muted: keyof typeof Colors;
  rule: string;
  shadow: keyof typeof Shadows;
}

const TITLE_SIZE = 'lg';
const TITLE_LINE_HEIGHT = 1.3;

const grounds: Record<FacilityGround, Ground> = {
  onLight: {
    background: 'white',
    heading: 'black',
    body: 'greyDarker',
    muted: 'grey',
    rule: Colors.greyLighter,
    shadow: 'soft',
  },
  /* A step lighter than the band it sits on, which is what separates the card
     from its ground when a shadow has nothing to fall on. */
  onDark: {
    background: 'greyDarker',
    heading: 'white',
    body: 'greyLighter',
    muted: 'greyLighter',
    rule: 'rgba(255, 255, 255, 0.16)',
    shadow: 'none',
  },
};

const Container = styled.article<{ $ground: FacilityGround }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${Spaces.lg};
  gap: ${Spaces.md};
  border-radius: 12px;
  border-top: 4px solid ${Colors.primary};
  background-color: ${(p) => Colors[grounds[p.$ground].background]};
  box-shadow: ${(p) => Shadows[grounds[p.$ground].shadow]};
`;

const TitleSlot = styled.div<{ $lines?: number }>`
  ${(p) =>
    p.$lines &&
    `min-height: calc(${FontSizes[TITLE_SIZE]} * ${TITLE_LINE_HEIGHT} * ${p.$lines});`}
`;

/* Icon and text meet at the top rather than the middle, so a value that wraps
   to two lines still hangs off its icon instead of drifting below it. */
const DetailRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${Spaces.sm};

  svg {
    flex: none;
    margin-top: 2px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.sm};
`;

const HoursBlock = styled.div<{ $ground: FacilityGround }>`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.sm};
  padding-top: ${Spaces.md};
  border-top: 1px solid ${(p) => grounds[p.$ground].rule};
`;

/* Time under day rather than beside it. These cards sit in an auto-fit grid
   and are routinely ~300px wide, where a day/time pair on one line breaks a
   range across two — "7:10 AM to 9:45 / PM" — which is worse than the extra
   height stacking costs. Stacked also gives a split shift somewhere to go. */
const HoursList = styled.dl<{ $ground: FacilityGround }>`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.sm};
  margin: 0;
  font-size: ${FontSizes.xs};

  dt {
    color: ${(p) => Colors[grounds[p.$ground].muted]};
  }

  dd {
    margin: 0;
    font-weight: 700;
    color: ${(p) => Colors[grounds[p.$ground].heading]};
  }

  dd span {
    display: block;
  }
`;

/* Pushes the link to the card's foot so a row of cards ends on one line,
   whatever length of description sits above it. */
const LinkRow = styled.div`
  margin-top: auto;
  padding-top: ${Spaces.sm};
`;

const toTelHref = (phone: string) => `tel:+1${phone.replace(/\D/g, '')}`;

/**
 * One physical space: what it is, where it is, how to reach it, and when it
 * is open. Nothing about it is Recreation-specific — any department with
 * rooms and hours can render the same card.
 */
export const FacilityCard = ({
  name,
  location,
  phone,
  description,
  hours,
  href,
  linkText = 'Learn more',
  isExternalLink,
  headingAs = 'h3',
  variant = 'onLight',
  titleLines,
}: FacilityCardProps) => {
  const ground = grounds[variant];

  return (
    <Container $ground={variant}>
      <TitleSlot $lines={titleLines}>
        <Typography
          as={headingAs}
          variant="titleSmall"
          size={TITLE_SIZE}
          weight="700"
          lineHeight={`${TITLE_LINE_HEIGHT}`}
          color={ground.heading}
          margin="0"
        >
          {name}
        </Typography>
      </TitleSlot>

      {(location || phone) && (
        <Details>
          {location && (
            <DetailRow>
              <MdLocationPin
                aria-hidden="true"
                size="20px"
                color={Colors.primary}
              />
              <Typography
                as="span"
                variant="span"
                size="xs"
                color={ground.body}
              >
                {location}
              </Typography>
            </DetailRow>
          )}
          {phone && (
            <DetailRow>
              <BiPhone aria-hidden="true" size="20px" color={Colors.primary} />
              <Typography
                as="span"
                variant="span"
                size="xs"
                color={ground.body}
              >
                <TapTarget>
                  <StyledLink href={toTelHref(phone)}>{phone}</StyledLink>
                </TapTarget>
              </Typography>
            </DetailRow>
          )}
        </Details>
      )}

      {description && (
        <Typography
          as="p"
          variant="copy"
          size="xs"
          lineHeight="1.6"
          color={ground.body}
          margin="0"
        >
          {description}
        </Typography>
      )}

      {hours && hours.length > 0 && (
        <HoursBlock $ground={variant}>
          <DetailRow>
            <BiTimeFive aria-hidden="true" size="20px" color={Colors.primary} />
            <Typography
              as="span"
              variant="span"
              size="2xs"
              weight="700"
              uppercase
              letterSpacing="0.08em"
              color={ground.muted}
            >
              Hours
            </Typography>
          </DetailRow>
          <HoursList $ground={variant}>
            {hours.map((entry) => (
              <div key={entry.day}>
                <dt>{entry.day}</dt>
                <dd>
                  <span>{entry.time}</span>
                  {entry.secondTime && <span>{entry.secondTime}</span>}
                </dd>
              </div>
            ))}
          </HoursList>
        </HoursBlock>
      )}

      {href && (
        <LinkRow>
          <Typography
            as="span"
            variant="cta"
            size="xs"
            color={variant === 'onDark' ? 'primary' : 'black'}
          >
            <TapTarget>
              <StyledLink
                href={href}
                isExternalLink={isExternalLink}
                isInverseUnderlineStyling
              >
                {linkText}
              </StyledLink>
            </TapTarget>
          </Typography>
        </LinkRow>
      )}
    </Container>
  );
};
