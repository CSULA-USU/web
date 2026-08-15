import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { Typography } from '../Typography';
import { Image } from '../Image';
import { Panel } from '../Panel';

const PHOTO_SIZE = '48px';

export interface Testimonial {
  quote: string;
  name: string;
  /** Standing of the person quoted, e.g. major and class year. */
  detail: string;
  photo?: string;
  /**
   * The quote is settled but the portrait has not arrived. Holds the photo's
   * footprint with a dashed circle, so the card is already the height and
   * shape it will be once the picture lands and nothing below it reflows.
   * Ignored when `photo` is set.
   */
  isAwaitingPhoto?: boolean;
}

/* Same round footprint as a real portrait. Decorative rather than announced:
   an empty frame is not information a screen reader needs, and the section
   carries a visible marker for what the grid is still waiting on. */
const PhotoSlot = styled.div`
  width: ${PHOTO_SIZE};
  height: ${PHOTO_SIZE};
  border-radius: 50%;
  border: 1px dashed ${Colors.greyLighter};
  background-color: ${Colors.greyLightest};
  margin-bottom: ${Spaces.sm};
`;

export const TestimonialCard = ({
  quote,
  name,
  detail,
  photo,
  isAwaitingPhoto,
}: Testimonial) => (
  <Panel border="greyLighter" shadow="soft" borderRadius="16px" padding="28px">
    <Typography as="p" variant="copy" size="sm" lineHeight="1.6">
      {quote}
    </Typography>
    <div>
      {/* Decorative: the name sits beside it in the same card. */}
      {photo ? (
        <Image
          src={photo}
          alt=""
          width={PHOTO_SIZE}
          height={PHOTO_SIZE}
          round
          marginBottom={Spaces.sm}
        />
      ) : (
        isAwaitingPhoto && <PhotoSlot aria-hidden="true" />
      )}
      <Typography as="p" variant="span" size="sm" weight="700">
        {name}
      </Typography>
      <Typography as="p" variant="span" size="2xs" color="greyDark">
        {detail}
      </Typography>
    </div>
  </Panel>
);
