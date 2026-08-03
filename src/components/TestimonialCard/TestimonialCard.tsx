import { Spaces } from 'theme';
import { Typography } from '../Typography';
import { Image } from '../Image';
import { Panel } from '../Panel';

export interface Testimonial {
  quote: string;
  name: string;
  /** Standing of the person quoted, e.g. major and class year. */
  detail: string;
  photo?: string;
}

export const TestimonialCard = ({
  quote,
  name,
  detail,
  photo,
}: Testimonial) => (
  <Panel border="greyLighter" shadow="soft" borderRadius="16px" padding="28px">
    <Typography as="p" variant="copy" size="sm" lineHeight="1.6">
      {quote}
    </Typography>
    <div>
      {/* Decorative: the name sits beside it in the same card. */}
      {photo && (
        <Image
          src={photo}
          alt=""
          width="48px"
          height="48px"
          round
          marginBottom={Spaces.sm}
        />
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
