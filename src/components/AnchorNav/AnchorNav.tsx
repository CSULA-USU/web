import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Shadows, Spaces, media } from 'theme';
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
   * sections below it on wide screens. The bar itself stays full-bleed.
   * Defaults to FluidContainer's own max-width, so a page that has not
   * narrowed its sections gets an aligned bar without passing anything. */
  contentMaxWidth?: string;
}

/* The line the bar occupies once stuck. Anchored sections reserve the same
   distance through their own scroll-margin-top, so a section counts as
   current at exactly the moment it arrives under the bar. */
const NAV_OFFSET = 84;

/* The bar turns opaque as soon as the page moves rather than after the hero
   clears — "started scrolling" is the signal, not "left the hero". */
const OPAQUE_AFTER = 24;

/* Long enough to read as travel, short enough that a fast scroll does not
   leave the pill trailing several sections behind the reader. */
/* Heavy enough to catch the eye against a label at FontSizes.xs; a hairline
   rule under 14px text is easy to miss entirely. */
const INDICATOR_THICKNESS = 4;

const SLIDE = '220ms cubic-bezier(0.4, 0, 0.2, 1)';
const FADE = '160ms ease';
const CHROME_FADE = '180ms ease';

/**
 * Zero height, so the bar hangs over what follows instead of pushing it down.
 *
 * The transparent state only means something if there is something behind it,
 * and on this page that is the hero. Sticky lives on this host rather than on
 * the bar itself: a sticky element still occupies its own height in flow, so
 * putting it here is what buys the overlap without measuring anything or
 * shifting the page once JS arrives.
 */
const StickyHost = styled.div`
  position: sticky;
  top: 0;
  height: 0;
  z-index: 50;

  ${media('tablet')(`
    display: none;
  `)}
`;

/* Rule and shadow both, because they answer different questions and neither
   answers the other everywhere. The rule is an edge; the shadow is height,
   and height is the true one — the page scrolls underneath this. Over white
   and greyLightest the shadow carries it and the rule is barely there; over
   the primary and greyDarkest bands a 6% black shadow is invisible and the
   rule is all that holds the edge.

   Both are tied to $opaque. Unconditional, the shadow would smear across the
   hero photograph before the reader has scrolled at all — and the bar's whole
   transparent state exists so the hero shows through it. */
const Bar = styled.nav<{ $opaque: boolean }>`
  padding: ${Spaces.md} clamp(20px, 4vw, 36px);
  background-color: ${(p) => (p.$opaque ? Colors.white : 'transparent')};
  border-bottom: 1px solid
    ${(p) => (p.$opaque ? Colors.greyLighter : 'transparent')};
  box-shadow: ${(p) => (p.$opaque ? Shadows.soft : Shadows.none)};
  transition: background-color ${CHROME_FADE}, border-color ${CHROME_FADE},
    box-shadow ${CHROME_FADE};
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
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${Spaces.md} ${Spaces.lg};
  margin-right: auto;
`;

/**
 * One rule that moves, rather than an underline toggled on each item. Moving
 * a single element is what makes the change read as one indicator travelling
 * between sections instead of two unrelated things blinking.
 *
 * Position is animated through `transform`, not `left`, so the browser can
 * keep it off the layout path at scroll speed.
 */
const Indicator = styled.span<{
  $x: number;
  $y: number;
  $width: number;
  $visible: boolean;
  $animated: boolean;
}>`
  position: absolute;
  left: 0;
  top: 0;
  width: ${(p) => p.$width}px;
  height: ${INDICATOR_THICKNESS}px;
  transform: translate(${(p) => p.$x}px, ${(p) => p.$y}px);
  border-radius: ${INDICATOR_THICKNESS}px;
  background-color: ${Colors.primary};
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  pointer-events: none;
  z-index: 0;
  transition: ${(p) =>
    p.$animated
      ? `transform ${SLIDE}, width ${SLIDE}, opacity ${FADE}`
      : 'none'};
`;

/* Padding is symmetric, and the line-height is the title's, so the label sits
   at the center of its own box: the bar centers boxes, and vertical padding
   that is heavier on one side would drop the label off the line the title and
   the CTA sit on. The bottom half still does the job of separating the label
   from the indicator, which is drawn on this box's bottom edge — without it
   the rule would sit against the descenders. */
const AnchorLinkItem = styled(Link)<{ $opaque: boolean }>`
  position: relative;
  z-index: 1;
  padding: 8px 6px;
  font-size: ${FontSizes.xs};
  line-height: ${FontSizes.md};
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: color ${CHROME_FADE};
  color: ${(p) => (p.$opaque ? Colors.greyDarkest : Colors.white)};

  &:hover {
    color: ${(p) => (p.$opaque ? Colors.gold : Colors.primary)};
  }
`;

/* A real button rather than a styled link: the destination is the top of the
   current page, not a URL, so there is nothing meaningful to put in an href and
   nothing worth adding to the reader's history.

   Hover takes the same two colors as the links beside it, rather than fading
   the label: hover means "this responds to you," and dimming the one thing
   under the cursor says the opposite. Gold over the opaque bar, primary over
   the hero — primary yellow on white does not hold up. */
const TitleButton = styled.button<{ $opaque: boolean }>`
  display: flex;
  align-items: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;

  span {
    transition: color ${CHROME_FADE};
  }

  &:hover span {
    color: ${(p) => (p.$opaque ? Colors.gold : Colors.primary)};
  }
`;

/* The bar sets three things on one line, so the CTA carries the same type size
   and line-height as the title and the links; left at Button's 16px default its
   label reads as sitting off the line beside 14px text. Set through a wrapper
   rather than Button's `fontSize` prop, which reaches the DOM node as a stray
   attribute. */
const BarCta = styled(Button)`
  font-size: ${FontSizes.xs};
  line-height: ${FontSizes.md};
`;

export const AnchorNav = ({
  title,
  links,
  ctaLabel,
  ctaHref,
  contentMaxWidth = '1440px',
}: AnchorNavProps) => {
  const [isOpaque, setIsOpaque] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [indicator, setIndicator] = useState<{
    x: number;
    y: number;
    width: number;
  } | null>(null);
  /* Off until the pill has been placed once, so it fades in where it belongs
     instead of flying in from the left edge on first paint. */
  const [hasSettled, setHasSettled] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const linksRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>());

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
  }, []);

  /**
   * Anchor jumps glide rather than teleport.
   *
   * On a page long enough to need an in-page nav, a jump tells the reader
   * nothing about where they went — and the travelling indicator only tells a
   * story if the page travels with it. Scrolling through the intervening
   * sections is the part that shows the shape of the page.
   *
   * Set on the document element because that is what actually scrolls; a
   * component cannot scope this to its own subtree. Restored on unmount so it
   * does not leak into the next page, and skipped outright under reduced
   * motion, where a long smooth scroll is a common vestibular trigger.
   */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'smooth';

    return () => {
      root.style.scrollBehavior = previous;
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setIsOpaque(window.scrollY > OPAQUE_AFTER);

      /* The current section is the last one whose top has passed under the
         bar. Walking the list in order means overlapping or nested targets
         resolve to the furthest one down the page, which is the one the
         reader is actually in. */
      let next: string | null = null;

      links.forEach((link) => {
        const target = document.querySelector(link.href);
        if (!target) return;

        const rect = target.getBoundingClientRect();
        /* A target inside an unselected tab panel has no box at all. Its zero
           rect would otherwise read as "already scrolled past" and light up
           a section the reader cannot even see. */
        if (rect.width === 0 && rect.height === 0) return;
        if (rect.top - NAV_OFFSET <= 1) next = link.href;
      });

      setActiveHref(next);
    };

    /* One read per frame. A raw scroll handler fires far faster than the
       screen repaints, and every extra call here is layout work. */
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [links]);

  /* No `behavior` of its own: left at the default it defers to the document's
     `scroll-behavior`, which the effect above sets to smooth and leaves alone
     under reduced motion. One place decides how this page travels. */
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const measure = useCallback(() => {
    const item = activeHref ? itemRefs.current.get(activeHref) : undefined;

    if (!item) {
      setIndicator(null);
      return;
    }

    setIndicator({
      x: item.offsetLeft,
      /* Sits on the item's bottom edge. Read per item rather than assumed,
         because the bar wraps its links on narrow desktops and a wrapped
         item's underline belongs on its own row. */
      y: item.offsetTop + item.offsetHeight,
      width: item.offsetWidth,
    });
  }, [activeHref]);

  useEffect(() => {
    measure();
  }, [measure]);

  /* The bar wraps its links on narrow desktops, so an item's position can
     change without the active section changing. */
  useEffect(() => {
    const host = linksRef.current;
    if (!host || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(measure);
    observer.observe(host);

    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    if (!indicator || hasSettled) return;

    const frame = window.requestAnimationFrame(() => setHasSettled(true));

    return () => window.cancelAnimationFrame(frame);
  }, [indicator, hasSettled]);

  return (
    <StickyHost>
      <Bar aria-label="On this page" $opaque={isOpaque}>
        <BarInner $maxWidth={contentMaxWidth}>
          <TitleButton
            type="button"
            onClick={scrollToTop}
            $opaque={isOpaque}
            aria-label={`${title}, back to top`}
          >
            <Typography
              as="span"
              variant="span"
              size="xs"
              weight="800"
              color={isOpaque ? 'black' : 'white'}
            >
              {title}
            </Typography>
          </TitleButton>
          <Links ref={linksRef}>
            <Indicator
              aria-hidden="true"
              $x={indicator?.x ?? 0}
              $y={indicator?.y ?? 0}
              $width={indicator?.width ?? 0}
              $visible={!!indicator}
              $animated={hasSettled && !prefersReducedMotion}
            />
            {links.map((link) => (
              <AnchorLinkItem
                key={link.href}
                href={link.href}
                ref={(node: HTMLAnchorElement | null) => {
                  if (node) itemRefs.current.set(link.href, node);
                  else itemRefs.current.delete(link.href);
                }}
                $opaque={isOpaque}
                aria-current={activeHref === link.href ? 'location' : undefined}
              >
                {link.label}
              </AnchorLinkItem>
            ))}
          </Links>
          <BarCta variant="primary" href={ctaHref} padding="10px 18px">
            {ctaLabel}
          </BarCta>
        </BarInner>
      </Bar>
    </StickyHost>
  );
};
