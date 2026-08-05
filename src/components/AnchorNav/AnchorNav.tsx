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
  /** Matches the page's content measure so the bar's items line up with the
   * sections below it on wide screens. The bar itself stays full-bleed. */
  contentMaxWidth?: string;
}

/* Sits below the app nav, which scrolls away rather than sticking. Anchored
   sections allow 84px for this bar via their own scroll-margin-top. */
const Bar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  padding: ${Spaces.md} clamp(20px, 4vw, 36px);
  background-color: ${Colors.white};
  border-bottom: 1px solid ${Colors.greyLighter};

  ${media('tablet')(`
    display: none;
  `)}
`;

const BarInner = styled.div<{ $maxWidth: string }>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${Spaces.md};
  width: 100%;
  max-width: ${(p) => p.$maxWidth};
  margin: 0 auto;
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
  contentMaxWidth = '1200px',
}: AnchorNavProps) => (
  <Bar aria-label="On this page">
    <BarInner $maxWidth={contentMaxWidth}>
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
    </BarInner>
  </Bar>
);
