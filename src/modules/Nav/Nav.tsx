import styled from 'styled-components';
import Link from 'next/link';
import { FluidContainer, Image } from 'components';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';
import { SearchButton } from 'modules/SiteSearch';
import { breakpoints } from 'theme';

const LogoLink = styled(Link)`
  &:focus {
    text-decoration: underline;
  }
`;

const MobileIconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavWrapper = styled.nav`
  filter: drop-shadow(0px 4px 4px rgb(0, 0, 0, 0.25));
  z-index: 99;
`;

// Both bars are always rendered and a media query hides one. Do not move this
// choice back into JS (useBreakpoint): the server has no window, so it renders
// a guess, and wide-screen visitors saw the white compact bar with the black
// wordmark until hydration swapped in the dark one. CSS resolves before first
// paint. `display: none` also drops the hidden bar from the accessibility
// tree, so screen readers meet one nav, not two.
//
// The full bar needs roughly 1225px to lay out at rest — a 200px logo, six
// top-level items, and the search icon. DesktopNav tightens its spacing below
// 1366px to fit, which holds down to 1024px; anything narrower gets the
// hamburger. The two rules are complementary (one default, one min-width at
// the same value) so no width, including fractional ones under browser zoom,
// shows both bars or neither.
const FULL_BAR_MEDIA = `(min-width: ${breakpoints.desktop}px)`;
// The exact complement of FULL_BAR_MEDIA, for the same no-gap reason.
const COMPACT_BAR_MEDIA = `not all and ${FULL_BAR_MEDIA}`;

const CompactBar = styled.div`
  @media ${FULL_BAR_MEDIA} {
    display: none;
  }
`;

const FullBar = styled.div`
  display: none;

  @media ${FULL_BAR_MEDIA} {
    display: block;
  }
`;

// A 1x1 transparent GIF, inline, so it costs no request.
const BLANK_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// Browsers download an <img> even inside `display: none`, so each wordmark
// sits in a <picture> whose <source> swaps in BLANK_IMAGE at the widths where
// its bar is hidden. Only the visible bar's PNG is requested, and resizing
// across the breakpoint fetches the other. `display: contents` gives the
// <picture> no box of its own, so the <img> lays out exactly as it did bare.
const Wordmark = styled.picture`
  display: contents;
`;

export const Nav = () => (
  <NavWrapper aria-label="Main navigation">
    <CompactBar>
      <FluidContainer
        padding="24px"
        backgroundColor="white"
        justifyContent="space-between"
        alignItems="center"
        flex
      >
        <LogoLink href="/" id="nav-logo-mobile">
          <Wordmark>
            <source media={FULL_BAR_MEDIA} srcSet={BLANK_IMAGE} />
            <Image
              className="mobile-logo"
              src="/usu-wordmark.png"
              alt="Cal State LA University-Student Union Logo"
              style={{ maxHeight: '64px' }}
            />
          </Wordmark>
        </LogoLink>

        <MobileIconsContainer>
          {/* Gold, not primary: this bar is white, and primary on white
              is too faint to read as a hover. */}
          <SearchButton size="33px" color="black" hoverColor="gold" />
          <MobileNav />
        </MobileIconsContainer>
      </FluidContainer>
    </CompactBar>

    <FullBar>
      <FluidContainer
        flex
        justifyContent="space-between"
        alignItems="center"
        padding="24px"
        backgroundColor="greyDarkest"
      >
        <LogoLink href="/" id="nav-logo-desktop">
          <Wordmark>
            <source media={COMPACT_BAR_MEDIA} srcSet={BLANK_IMAGE} />
            <Image
              width="200px"
              height="70"
              src="/usu-wordmark-white.png"
              alt="Cal State LA University-Student Union"
            />
          </Wordmark>
        </LogoLink>

        <DesktopNav />
        <SearchButton />
      </FluidContainer>
    </FullBar>
  </NavWrapper>
);
