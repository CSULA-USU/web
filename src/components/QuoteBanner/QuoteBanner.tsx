import styled from 'styled-components';
import { Typography } from '../Typography';
import { FluidContainer } from '../FluidContainer';
import { Colors } from 'theme';

interface QuoteBannerProps {
  quote: string;
  attribution: string;
}

const BannerWrapper = styled(FluidContainer)`
  width: 100%;
  background-color: ${Colors.greyLightest};
  text-align: center;
`;

const QuoteContent = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

export const QuoteBanner = ({ quote, attribution }: QuoteBannerProps) => {
  return (
    <BannerWrapper>
      <QuoteContent>
        <Typography
          as="p"
          variant="copy"
          size="xl"
          color="black"
          lineHeight="1.5"
        >
          “{quote}”
        </Typography>

        <Typography
          as="p"
          variant="subheader"
          margin="24px 0 0 0"
          color="greyDark"
          size="md"
          weight="400"
        >
          — {attribution}
        </Typography>
      </QuoteContent>
    </BannerWrapper>
  );
};
