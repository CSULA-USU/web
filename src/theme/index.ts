import { Sizes } from 'types';
import { CSSObject } from 'styled-components';

export const breakpoints = {
  uhd: 1980,
  widescreen: 1366,
  desktop: 1024,
  tablet: 768,
  mobile: 580,
  mini: 414,
};

export const media = (key: keyof typeof breakpoints) => {
  return (style: TemplateStringsArray | CSSObject | String) =>
    `
      @media (max-width: ${breakpoints[key]}px) {
        ${style};
      }
    `;
};

export const Spaces: {
  [_ in Exclude<Sizes, '2xs' | '4xl' | '5xl' | '6xl'>]: string;
} = {
  zero: '0px',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '36px',
  '2xl': '72px',
  '3xl': '96px',
} as const;

export const FontSizes: { [_ in Exclude<Sizes, 'zero'>]: string } = {
  '2xs': '12px',
  xs: '14px',
  sm: '16px',
  md: '18px',
  lg: '24px',
  xl: '30px',
  '2xl': '36px',
  '3xl': '48px',
  '4xl': '54px',
  '5xl': '72px',
  '6xl': '96px',
} as const;

export const Colors = {
  primary: '#ffce04',
  gold: '#8c6a14',
  black: '#000000',
  greyDarkest: '#2b2b2b',
  greyDarker: '#323232',
  greyDark: '#6e6e6e',
  grey: '#757575',
  greyLighter: '#dedede',
  greyLightest: '#f4f4f4',
  white: '#ffffff',
  transparent: 'transparent',
  nuestraOrange: '#f4951c',
  blackMauve: '#52284f',
  nativeBeige: '#c6ba98',
  pastelYellow: '#fef9c3',
  recognizedGreen: '#1ED760',
  blue: '#0066cc',
  red: '#dc3545',
  /* Deeper than `red`, which lands at 4.53:1 on white — a hair over the AA
     floor and too thin for a figure a reader is meant to trust. This sits at
     about 5.6:1 and still reads unmistakably as a deficit. */
  redDark: '#c62828',
} as const;

/**
 * The site's elevation language. `default` is the long-standing card
 * lift; `soft` is the tighter, cooler one used where something sits only just
 * above the surface — a card in a grid, or chrome that content scrolls under.
 *
 * Two resting steps on purpose. A third would invite picking by taste rather
 * than by how far off the page the thing actually is.
 *
 * `lifted` is not a third resting step — it is the hovered state of an
 * interactive card, and belongs here so every card that reacts to a pointer
 * reacts by the same amount. Pair it with `translateY(-4px)`: the shadow casts
 * straight down because the card has risen, not because it has been nudged
 * sideways.
 */
export const Shadows = {
  default: '2px 4px 12px rgba(191, 191, 191, 0.25)',
  soft: '0 2px 8px rgba(0, 0, 0, 0.06)',
  lifted: '0 12px 24px rgba(0, 0, 0, 0.12)',
  none: 'none',
} as const;

/**
 * Corner radius, named by the job it does rather than by size.
 *
 * `control` is for the small boxes a person points at or types into — a nav
 * pill, a dropdown row, an input. `surface` is for discrete objects that sit
 * on the page as their own thing: cards, modals, callouts. `structure` is a
 * deliberate zero, for full-bleed bars and anything fused to them — the nav
 * bar, the dropdown panel hanging off it, section bands. Those meet the
 * viewport edge or another surface, and rounding them makes them float when
 * they should read as architecture. Writing `structure` rather than omitting
 * the property is the point: it marks the square corner as a decision, so the
 * next person does not "fix" it.
 *
 * The two sizes differ because radius is read relative to the box, not in the
 * absolute. 4px on a 34px-tall pill is a visible softening; the same 4px on a
 * 400px panel is optically nothing. One value used at both scales produces
 * less consistency, not more.
 *
 * `circle` and `pill` are a different job, not two more steps on that scale.
 * A percentage radius resolves against the box's own width and height, so 50%
 * is how you make a circle or an ellipse — it is never how you soften a
 * corner. (There is no reason to write 100%: when radii would overlap, the
 * spec scales them down proportionally, so on a square box 100% renders
 * exactly as 50% does.) `pill` is a large pixel value instead, because a
 * percentage on a wide box gives an ellipse, while an over-large pixel radius
 * clamps to half the height and gives a true stadium at any width.
 *
 * Open question, deliberately left without a token: `Button` rests at 8px,
 * between `control` and `surface`. Folding it down to `control` changes every
 * button on the site, so it wants a decision rather than a default.
 */
export const Radii = {
  structure: '0px',
  control: '4px',
  surface: '12px',
  circle: '50%',
  pill: '9999px',
} as const;
