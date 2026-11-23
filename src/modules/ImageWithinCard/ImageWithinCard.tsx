import React from 'react';
import styled from 'styled-components';
import { Button, Image, Typography } from 'components';
import { Colors, Radii, Shadows, Spaces, media } from 'theme';

interface CardLink {
  buttonLink: string;
  /** Shown on a disabled button while the link is not ready yet. */
  buttonPlaceholder: string;
  buttonText: string;
}

interface ImageWithinCardProps {
  /** Anchor target, so other parts of the page can link to this card. */
  id: string;
  title: string;
  subheader: string;
  /**
   * Lines written as "Label: value" ("Date: Friday, May 15"). A nested array
   * groups lines the data keeps together; the card lists them all in order.
   */
  details: (string | string[])[];
  button: CardLink;
  iconSrc: string;
  imgSrc: string;
  imgAlt: string;
}

/* Matches AnchorNav's NAV_OFFSET, so a jump to a card lands below the bar. */
const SCROLL_MARGIN = '84px';

const Card = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  overflow: hidden;
  border: 1px solid ${Colors.greyLighter};
  border-radius: ${Radii.surface};
  background-color: ${Colors.white};
  box-shadow: ${Shadows.soft};
  scroll-margin-top: ${SCROLL_MARGIN};

  ${media('tablet')(`
    grid-template-columns: minmax(0, 1fr);
  `)}
`;

const Media = styled.div`
  position: relative;
  min-height: 320px;
  background-color: ${Colors.greyDarkest};

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${media('tablet')(`
    min-height: 0;
    aspect-ratio: 3 / 2;
  `)}
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.lg};
  padding: ${Spaces.xl};

  ${media('mobile')(`
    padding: ${Spaces.lg};
  `)}
`;

/* Title block on the left, the center's mark at top right. The mark lives in
   the text column so it never covers anyone in the photo. */
const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${Spaces.lg};

  /* Beside the title at phone width the mark squeezes it onto extra lines,
     so it moves above the title instead. */
  ${media('mobile')(`
    flex-direction: column-reverse;
    gap: ${Spaces.md};
  `)}
`;

const Mark = styled.div`
  flex: none;
  width: 88px;
  height: 88px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  ${media('mobile')(`
    width: 64px;
    height: 64px;
  `)}
`;

const Details = styled.dl`
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  align-items: baseline;
  gap: ${Spaces.sm} ${Spaces.lg};
  margin: 0;

  dd {
    margin: 0;
    overflow-wrap: anywhere;
  }

  a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  ${media('mobile')(`
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    dd { margin-bottom: ${Spaces.sm}; }
  `)}
`;

/* Pinned to the bottom of the text column, and sized to its label rather
   than stretched across the column. */
const Action = styled.div`
  margin-top: auto;
`;

/* "Date: Friday, May 15" -> ["Date", "Friday, May 15"]. The visible words
   stay exactly as written in the data; only the styling changes. */
const splitDetail = (line: string): [string | null, string] => {
  const separator = line.indexOf(': ');
  return separator === -1
    ? [null, line]
    : [line.slice(0, separator), line.slice(separator + 2)];
};

export const ImageWithinCard = ({
  id,
  title,
  subheader,
  details,
  button,
  iconSrc,
  imgSrc,
  imgAlt,
}: ImageWithinCardProps) => {
  const { buttonLink, buttonText, buttonPlaceholder } = button;
  const lines = details.flat();

  return (
    <Card id={id}>
      <Media>
        <Image src={imgSrc} alt={imgAlt} lazy />
      </Media>
      <Body>
        <Header>
          <div>
            <Typography as="h3" variant="label" margin="0">
              {title}
            </Typography>
            <Typography
              as="p"
              variant="labelTitle"
              size="sm"
              lineHeight="1.5"
              color="greyMid"
              margin={`${Spaces.xs} 0 0`}
            >
              {subheader}
            </Typography>
          </div>
          {/* Decorative: the center it marks is named in the title beside it. */}
          <Mark>
            <Image src={iconSrc} alt="" />
          </Mark>
        </Header>
        <Details>
          {lines.map((line) => {
            const [label, value] = splitDetail(line);
            return (
              <React.Fragment key={line}>
                <dt>
                  <Typography
                    as="span"
                    variant="labelTitleSmall"
                    size="2xs"
                    letterSpacing="0.08em"
                    lineHeight="1.9"
                    color="gold"
                    uppercase
                  >
                    {label}
                  </Typography>
                </dt>
                <dd>
                  <Typography as="span" variant="copy">
                    {label === 'Email' ? (
                      <a href={`mailto:${value}`}>{value}</a>
                    ) : (
                      value
                    )}
                  </Typography>
                </dd>
              </React.Fragment>
            );
          })}
        </Details>
        <Action>
          {buttonLink === '' ? (
            <Button variant="primary" disabled>
              {buttonPlaceholder}
            </Button>
          ) : (
            /* Five cards share this label, so the accessible name adds the
               celebration. It starts with the visible text so voice control
               ("click Booklet") still finds it. */
            <Button
              href={buttonLink}
              variant="primary"
              isExternalLink
              aria-label={`${buttonText}: ${title} (opens in a new tab)`}
            >
              {buttonText}
            </Button>
          )}
        </Action>
      </Body>
    </Card>
  );
};
