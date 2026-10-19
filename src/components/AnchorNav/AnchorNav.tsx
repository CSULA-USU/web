import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Radii, Shadows, Spaces, media } from 'theme';
import { Typography } from '../Typography';
import { Button } from '../Button';

interface AnchorLink {
  label: string;
  /** In-page target, e.g. `#numbers`. */
  href: string;
}

type NavTone = 'light' | 'dark';

interface AnchorNavProps {
  /** Short page title shown at the start of the bar. Omit for links only. */
  title?: string;
  links: AnchorLink[];
  /** Both are needed to render the CTA; omit them for a bar of links only. */
  ctaLabel?: string;
  ctaHref?: string;
  /**
   * Ground the bar settles onto once scrolled. `light` turns white and takes
   * dark labels — the right choice over a page of white sections. `dark`
   * stays dark and keeps its labels white, for a page whose sections it will
   * be read against are themselves dark.
   */
  tone?: NavTone;
  /** Matches the page's content measure so the bar's items line up with the
   * sections below it on wide screens. The bar itself stays full-bleed.
   * Defaults to FluidContainer's own max-width, so a page that has not
   * narrowed its sections gets an aligned bar without passing anything. */
  contentMaxWidth?: string;
  /**
   * Starts transparent and floats over a hero, turning opaque once the page
   * scrolls. Turn it off for a bar that begins partway down a light page:
   * it then takes its own height in the flow, rests transparent with its
   * links drawn as outlined chips — the hero state's white labels would
   * vanish on a light ground — and switches to the opaque bar of plain
   * labels only once it pins to the top.
   */
  floatsOverHero?: boolean;
}

interface ToneColors {
  /** Before the page moves — over the hero. */
  restBackground: string;
  restBorder: string;
  restLabel: keyof typeof Colors;
  restHover: keyof typeof Colors;
  /** Once scrolled, when the bar has content running under it. */
  scrolledBackground: string;
  scrolledBorder: string;
  scrolledLabel: keyof typeof Colors;
  scrolledHover: keyof typeof Colors;
}

const tones: Record<NavTone, ToneColors> = {
  light: {
    restBackground: 'transparent',
    restBorder: 'transparent',
    restLabel: 'white',
    restHover: 'primary',
    scrolledBackground: Colors.white,
    scrolledBorder: Colors.greyLighter,
    /* Gold over the opaque bar, primary over the hero — primary yellow on
       white does not hold up. */
    scrolledLabel: 'greyDarkest',
    scrolledHover: 'gold',
  },
  /* Never fully transparent: a dark bar over a dark hero would otherwise have
     nothing to separate it from the photograph behind it. */
  dark: {
    restBackground: 'rgba(0, 0, 0, 0.65)',
    restBorder: 'transparent',
    restLabel: 'white',
    restHover: 'primary',
    scrolledBackground: Colors.greyDarkest,
    scrolledBorder: 'rgba(255, 255, 255, 0.2)',
    scrolledLabel: 'white',
    scrolledHover: 'primary',
  },
};

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

/* Width of the fade at the trailing edge of the narrow-screen row. Wide
   enough to read as a fade rather than a cut, narrow enough that it does not
   swallow a whole label. */
const SCROLL_HINT_FADE = 28;

/* Horizontal padding inside each link, shared with the in-flow bar's gutter
   so the label text, not the link's box, lines up with the content edge. */
const LINK_PADDING_X = 6;

/* A resting in-flow link's horizontal padding as a chip — the filter chips'
   own 16px, less the 1px border. */
const CHIP_PADDING_X = 15;

/* FluidContainer's default horizontal padding at each breakpoint — wide, then
   at media('desktop') and media('mobile'). An in-flow bar matches it so its
   labels align with the content below; change one, change the other. */
const CONTENT_GUTTER = { wide: 72, desktop: 36, mobile: 16 };

/* Breathing room left either side of the current item when the narrow-screen
   row scrolls it back into view, so it reads as part of a row rather than
   jammed against the edge. */
const ITEM_REVEAL_MARGIN = 16;

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
 *
 * A bar that does not float over a hero takes its own height instead, so it
 * pushes the content down rather than covering the first heading below it.
 */
const StickyHost = styled.div<{ $floatsOverHero: boolean }>`
  position: sticky;
  top: 0;
  height: ${(p) => (p.$floatsOverHero ? '0' : 'auto')};
  z-index: 50;
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
const Bar = styled.nav<{
  $opaque: boolean;
  $tone: NavTone;
  $floatsOverHero: boolean;
}>`
  padding: ${Spaces.md} clamp(20px, 4vw, 36px);

  ${media('tablet')(`
    padding: 10px 0 10px 16px;
  `)}

  /* In flow, the bar sits directly above page content rather than over a
     hero, so its labels line up with that content's left edge: the gutter
     steps with FluidContainer's own default padding, less each link's own
     horizontal padding so the text, not the hit area, meets the edge. */
  ${(p) =>
    !p.$floatsOverHero &&
    `
      padding-left: ${CONTENT_GUTTER.wide - LINK_PADDING_X}px;
      padding-right: ${CONTENT_GUTTER.wide - LINK_PADDING_X}px;
      ${media('desktop')(`
        padding-left: ${CONTENT_GUTTER.desktop - LINK_PADDING_X}px;
        padding-right: ${CONTENT_GUTTER.desktop - LINK_PADDING_X}px;
      `)}
      ${media('tablet')(`
        padding-right: 0;
      `)}
      ${media('mobile')(`
        padding-left: ${CONTENT_GUTTER.mobile - LINK_PADDING_X}px;
      `)}
    `}
  background-color: ${(p) =>
    p.$opaque
      ? tones[p.$tone].scrolledBackground
      : tones[p.$tone].restBackground};
  border-bottom: 1px solid
    ${(p) =>
      p.$opaque ? tones[p.$tone].scrolledBorder : tones[p.$tone].restBorder};
  box-shadow: ${(p) =>
    p.$opaque && p.$tone === 'light' ? Shadows.soft : Shadows.none};
  transition: background-color ${CHROME_FADE}, border-color ${CHROME_FADE},
    box-shadow ${CHROME_FADE};
`;

/* In flow, widened by the links' own padding on each side, so on a screen
   wide enough to hit the cap the first label still meets the content edge. */
const BarInner = styled.div<{ $maxWidth: string; $floatsOverHero: boolean }>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${Spaces.md};
  width: 100%;
  max-width: ${(p) =>
    p.$floatsOverHero
      ? p.$maxWidth
      : `calc(${p.$maxWidth} + ${LINK_PADDING_X * 2}px)`};
  margin: 0 auto;

  ${media('tablet')(`
    flex-wrap: nowrap;
    gap: 8px;
  `)}
`;

/* As chips, the links close up to the chip groups' own gap, and the row
   steps in by the text links' padding so the first chip's outline, rather
   than its label, meets the content edge — as the filter chips above it do. */
const Links = styled.div<{ $asChips: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${(p) => (p.$asChips ? Spaces.sm : `${Spaces.md} ${Spaces.lg}`)};
  margin-right: auto;
  margin-left: ${(p) => (p.$asChips ? `${LINK_PADDING_X}px` : '0')};

  /* An auto x-overflow forces overflow-y to auto too, which would clip the
     indicator drawn on each item's bottom edge and offer a vertical scrollbar
     for the 4px it sticks out. Hiding the y axis and reserving its height in
     padding keeps the rule visible and the row one line tall. */
  ${media('tablet')(`
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: ${INDICATOR_THICKNESS}px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    /* Softens the trailing edge so a clipped label reads as a row that
       continues rather than one that broke. The scrollbar is hidden, so
       without this there is nothing at all to say the row scrolls. */
    mask-image: linear-gradient(
      to right,
      #000 calc(100% - ${SCROLL_HINT_FADE}px),
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      #000 calc(100% - ${SCROLL_HINT_FADE}px),
      transparent 100%
    );

    &::-webkit-scrollbar {
      display: none;
    }
  `)}
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
const AnchorLinkItem = styled(Link)<{
  $opaque: boolean;
  $tone: NavTone;
  $asChip: boolean;
  $floatsOverHero: boolean;
}>`
  position: relative;
  z-index: 1;
  padding: 8px ${LINK_PADDING_X}px;
  font-size: ${FontSizes.xs};
  line-height: ${FontSizes.md};
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: color ${CHROME_FADE};
  color: ${(p) =>
    Colors[
      p.$opaque ? tones[p.$tone].scrolledLabel : tones[p.$tone].restLabel
    ]};

  &:hover {
    color: ${(p) =>
      Colors[
        p.$opaque ? tones[p.$tone].scrolledHover : tones[p.$tone].restHover
      ]};
  }

  /* Outlined like a filter chip, so links resting on the page read as
     things to press rather than as a line of text. Hover fills primary under
     black text, per the house rule; the fill is gated to real pointers, where
     a tapped chip would otherwise stay yellow. 7px vertical padding plus the
     1px border keeps the chip exactly as tall as the 8px-padded text link it
     turns into, so the bar does not change height as it sticks — in flow,
     that would shove the page under it and could flip the bar straight back. */
  ${(p) =>
    p.$asChip &&
    `
      padding: 7px ${CHIP_PADDING_X}px;
      border: 1px solid ${Colors.greyLighter};
      border-radius: ${Radii.pill};
      background-color: ${Colors.white};
      color: ${Colors.black};
      transition: color ${CHROME_FADE}, background-color ${CHROME_FADE},
        border-color ${CHROME_FADE};

      &:hover {
        color: ${Colors.black};
      }
      @media (hover: hover) {
        &:hover {
          background-color: ${Colors.primary};
          border-color: ${Colors.primary};
        }
      }
    `}

  /* The same 44px touch target the filter chips get, in both states so the
     bar's height still does not change as it sticks. */
  ${(p) =>
    !p.$floatsOverHero &&
    `
      @media (pointer: coarse) {
        display: inline-flex;
        align-items: center;
        min-height: 44px;
      }
    `}
`;

/* A real button rather than a styled link: the destination is the top of the
   current page, not a URL, so there is nothing meaningful to put in an href and
   nothing worth adding to the reader's history.

   Hover takes the same two colors as the links beside it, rather than fading
   the label: hover means "this responds to you," and dimming the one thing
   under the cursor says the opposite. Gold over the opaque bar, primary over
   the hero — primary yellow on white does not hold up. */
const TitleButton = styled.button<{ $opaque: boolean; $tone: NavTone }>`
  display: flex;
  align-items: center;
  /* WCAG 2.2 target size: the label alone is an 18px line. */
  min-height: 24px;

  ${media('tablet')(`
    display: none;
  `)}
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;

  span {
    transition: color ${CHROME_FADE};
  }

  &:hover span {
    color: ${(p) =>
      Colors[
        p.$opaque ? tones[p.$tone].scrolledHover : tones[p.$tone].restHover
      ]};
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
  flex: none;

  ${media('tablet')(`
    margin-right: 16px;
  `)}
`;

export const AnchorNav = ({
  title,
  links,
  ctaLabel,
  ctaHref,
  contentMaxWidth = '1440px',
  tone = 'light',
  floatsOverHero = true,
}: AnchorNavProps) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  /* Over a hero the bar turns opaque once the page moves. In flow it has
     nothing behind it worth seeing through until it pins to the top, so it
     waits for that — and until then its links rest as chips. */
  const isOpaque = floatsOverHero ? hasScrolled : isStuck;
  const showsChips = !floatsOverHero && !isStuck;
  const hostRef = useRef<HTMLDivElement | null>(null);
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
      setHasScrolled(window.scrollY > OPAQUE_AFTER);
      /* Pinned once its host reaches the top edge; a pixel of slack covers
         the fractional offsets zoomed or high-DPI layouts report. It stays
         pinned-looking after the list ends and the bar scrolls away with
         it, which is the right look for something leaving under the page. */
      if (hostRef.current) {
        setIsStuck(hostRef.current.getBoundingClientRect().top <= 1);
      }

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

    /* Once the row scrolls sideways — the narrow-screen layout — the current
       item can sit outside it, which would leave the indicator invisible and
       the bar looking inert while the reader scrolls. Nudging the container's
       own scrollLeft keeps it on screen; scrollIntoView would take the page
       with it. */
    const host = linksRef.current;
    if (!host || host.scrollWidth <= host.clientWidth) return;

    const left = item.offsetLeft;
    const right = left + item.offsetWidth;

    if (left - ITEM_REVEAL_MARGIN < host.scrollLeft) {
      host.scrollLeft = Math.max(0, left - ITEM_REVEAL_MARGIN);
    } else if (
      right + ITEM_REVEAL_MARGIN >
      host.scrollLeft + host.clientWidth
    ) {
      host.scrollLeft = right + ITEM_REVEAL_MARGIN - host.clientWidth;
    }
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
    <StickyHost ref={hostRef} $floatsOverHero={floatsOverHero}>
      <Bar
        aria-label="On this page"
        $opaque={isOpaque}
        $tone={tone}
        $floatsOverHero={floatsOverHero}
      >
        <BarInner $maxWidth={contentMaxWidth} $floatsOverHero={floatsOverHero}>
          {title && (
            <TitleButton
              type="button"
              onClick={scrollToTop}
              $opaque={isOpaque}
              $tone={tone}
              aria-label={`${title}, back to top`}
            >
              <Typography
                as="span"
                variant="span"
                size="xs"
                weight="800"
                color={isOpaque && tone === 'light' ? 'black' : 'white'}
              >
                {title}
              </Typography>
            </TitleButton>
          )}
          <Links ref={linksRef} $asChips={showsChips}>
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
                $tone={tone}
                $asChip={showsChips}
                $floatsOverHero={floatsOverHero}
                aria-current={activeHref === link.href ? 'location' : undefined}
              >
                {link.label}
              </AnchorLinkItem>
            ))}
          </Links>
          {ctaLabel && ctaHref && (
            <BarCta variant="primary" href={ctaHref} padding="10px 18px">
              {ctaLabel}
            </BarCta>
          )}
        </BarInner>
      </Bar>
    </StickyHost>
  );
};
