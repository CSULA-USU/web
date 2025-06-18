import styled from 'styled-components';
import { Typography } from '../Typography';
import { FluidContainer } from '../FluidContainer';

interface QuoteBannerProps {
  quote: string;
  attribution: string;
}

const BannerWrapper = styled(FluidContainer)`
  width: 100%;
  background-color: #f9fafb;
  padding: 64px 24px;
  text-align: center;
`;

export const QuoteBanner = ({ quote, attribution }: QuoteBannerProps) => {
  return (
    <BannerWrapper>
      <Typography
        as="p"
        variant="copy"
        style={{
          fontFamily: `'Bitter', serif`,
          fontSize: '2rem',
          fontWeight: 400,
          lineHeight: '1.5',
          color: '#1a202c',
          maxWidth: 960,
          margin: '0 auto',
        }}
      >
        “{quote}”
      </Typography>

      <Typography
        as="p"
        variant="subheader"
        style={{
          marginTop: '1.5rem',
          fontSize: '1rem',
          fontWeight: 500,
          color: '#6b7280',
        }}
      >
        — {attribution}
      </Typography>
    </BannerWrapper>
  );
};
