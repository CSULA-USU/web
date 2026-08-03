import Link from 'next/link';
import styled from 'styled-components';
import { Colors, FontSizes, Spaces, media } from 'theme';
import { Typography } from '../Typography';
import { Button } from '../Button';

interface AnchorLink {
  label: string;
  /** In-page target, e.g. `#numbers`. */
  href: string;
}

interface AnchorNavProps {
  /** Short page title shown at the start of the bar. */
  title: string;
  links: AnchorLink[];
  ctaLabel: string;
  ctaHref: string;
}

/* Sits below the app nav, which scrolls away rather than sticking. Anchored
   sections allow 84px for this bar via their own scroll-margin-top. */
const Bar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${Spaces.md};
  padding: ${Spaces.md} clamp(20px, 4vw, 36px);
  background-color: ${Colors.white};
  border-bottom: 1px solid ${Colors.greyLighter};

  ${media('tablet')(`
    display: none;
  `)}
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${Spaces.md} ${Spaces.lg};
  margin-right: auto;
`;

const AnchorLinkItem = styled(Link)`
  font-size: ${FontSizes.xs};
  font-weight: 600;
  color: ${Colors.greyDarkest};
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${Colors.gold};
  }
`;

export const AnchorNav = ({
  title,
  links,
  ctaLabel,
  ctaHref,
}: AnchorNavProps) => (
  <Bar aria-label="On this page">
    <Typography as="span" variant="span" size="xs" weight="800">
      {title}
    </Typography>
    <Links>
      {links.map((link) => (
        <AnchorLinkItem key={link.href} href={link.href}>
          {link.label}
        </AnchorLinkItem>
      ))}
    </Links>
    <Button variant="primary" href={ctaHref} padding="10px 18px">
      {ctaLabel}
    </Button>
  </Bar>
);
