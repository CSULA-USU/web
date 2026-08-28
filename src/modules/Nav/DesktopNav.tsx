'use client';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import { Colors, FontSizes, Radii, Spaces, media } from 'theme';
import navMap from 'data/navMap.json';
import { NonBreakingSpan } from 'components';
import { FiChevronDown } from 'react-icons/fi';

interface navMapType {
  text: string;
  href: string;
  sub?: navMapType[];
}

const UnstyledUnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  line-height: 1.5;
  z-index: 10;
  // The pills below carry their own horizontal padding, so the gap between
  // items is cut to match — the space between two labels reads the same as it
  // did before, only now part of it belongs to the highlight.
  > * {
    &:not(:last-child) {
      margin-right: ${Spaces.xs};
      ${media('tablet')(`margin-right: ${Spaces.zero}`)}
    }
  }
  button {
    background-color: transparent;
    border: none;
  }
  // Scoped to the bar itself — a direct child link, or the menu button the
  // library gives its own class — so none of the pill styling reaches the
  // dropdown rows, which are styled on their own terms further down.
  > li > a,
  .szh-menu-button {
    color: ${Colors.greyLighter};
    font-weight: 700;
    font-size: ${FontSizes.sm};
    display: inline-flex;
    align-items: center;
    padding: ${Spaces.sm} ${Spaces.md};
    ${media('tablet')(`padding: ${Spaces.xs} ${Spaces.sm}`)}
    border-radius: 4px;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    // A hovered item fills with primary rather than just tinting its text:
    // pages with their own in-page nav already spend the primary color on
    // text, so recoloring alone no longer reads as "you are pointing at this."
    // The aria-expanded case holds the fill while the dropdown is open, so the
    // panel stays visibly attached once the pointer leaves the button for it.
    &:hover,
    &:focus,
    &[aria-expanded='true'] {
      color: ${Colors.black};
      background-color: ${Colors.primary};
    }
    // With the panel open this button is the tab sitting on top of it, so its
    // bottom corners square off to meet the panel's square top edge. Hover
    // alone keeps all four rounded — there is no panel below to meet yet.
    &[aria-expanded='true'] {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  ul {
    animation: fadeIn 0.3s;
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    border-left: 2px solid ${Colors.primary};
    // No vertical offset: react-menu already places the panel's top edge on the
    // button's bottom edge and aligns their left edges, so the button's primary
    // fill runs straight into this border and the two read as one shape. Any
    // nudge here reopens the gap that made the panel look detached from the
    // item that opened it — the nested panels below get their own offset
    // instead, measured from their parent row.
    a,
    button,
    .szh-menu__item,
    .szh-menu__item--submenu {
      color: ${Colors.greyLighter};
      font-weight: 400;
      font-size: ${FontSizes.sm};
    }

    // Same highlight as the top-level bar, but edge to edge: the row spans the
    // panel's full width so a highlighted row meets the panel its own submenu
    // opens, and the primary carries across the join instead of stopping at an
    // inset pill. Square corners are part of that — a radius here would leave
    // the highlight pulling away from the edge it is supposed to reach.
    //
    // --hover is the library's own class, which it also sets during arrow-key
    // navigation, so the keyboard path lights up the same row the pointer
    // would. --open holds the fill while this row's submenu is showing, the way
    // aria-expanded does for the bar above; without it the highlight drops the
    // moment the pointer moves into the panel it just opened.
    .szh-menu__item {
      border-radius: ${Radii.structure};
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
      &:hover,
      &:focus,
      &.szh-menu__item--hover,
      &.szh-menu__item--open {
        color: ${Colors.black};
        background-color: ${Colors.primary};
        font-weight: 600;
        a {
          color: ${Colors.black};
          font-weight: 600;
        }
      }
    }

    // Location of the '+' on expandable rows. Measured from the panel edge now
    // that rows run the full width, so it carries the 8px the panel used to
    // hold as padding on top of its own inset.
    .szh-menu__item--submenu:after {
      content: '+';
      position: absolute;
      right: ${Spaces.md};
    }
  }

  // No padding on any side. Horizontal padding insets every row from the
  // panel's sides and stops a highlight short of the edge where the next panel
  // attaches; vertical padding leaves a grey band above the first row and below
  // the last, which reads as an unfinished edge as soon as one of those rows is
  // highlighted. The rows below absorb the 8px the sides gave up into their own
  // padding, so the text sits exactly where it always did while the highlight
  // behind it runs corner to corner.
  //
  // Zero here also removes any need to correct a nested panel's position:
  // react-menu aligns a submenu's top edge to its parent row's top, so with no
  // padding of its own the nested panel's first row lands exactly on that row
  // rather than a notch below it.
  ul {
    padding: ${Spaces.zero};
    list-style: none;
    background-color: ${Colors.greyDarker};
  }

  // Row padding is what positions the text, now that it is no longer doubling
  // as the highlight's inset: each side carries its old value plus the 8px the
  // panel gave up. The right side stays wider to reserve room for the '+' on
  // expandable rows, which margin can't hold open without leaving a gap the
  // highlight cannot fill.
  .szh-menu__item {
    padding: ${Spaces.sm} calc(${Spaces.lg} + ${Spaces.sm}) ${Spaces.sm}
      ${Spaces.md};
  }

  // A nested panel gets no transform at all. react-menu already places it at
  // its parent row's right edge, which is now the panel's own edge too, so it
  // butts straight onto the highlighted row and its primary border-left
  // continues that row's primary fill. Any offset reopens the gap between them.
`;

const MainMenuItem = styled.div`
  display: flex;
  align-items: center;
  > :last-child {
    margin-left: 4px;
  }
`;

/**
 * A dropdown label that is already as wide as its own hovered, heavier self.
 *
 * The hidden `::after` copy carries the label at `$hoverFontWeight` and sets
 * the width; the visible text sits above it and grows into slack that was
 * always reserved. Without it, bolding on hover widens the row and shoves the
 * dropdown panel wider mid-hover.
 *
 * The bar's own items do not need this — they rest at 700 and stay there, so
 * their width never changes on hover.
 *
 * The copy is `visibility: hidden`, not transparent, so it stays out of the
 * accessibility tree and screen readers do not hear the label twice.
 */
const SteadyWidthLabel = styled(NonBreakingSpan)<{ $hoverFontWeight: number }>`
  display: inline-flex;
  flex-direction: column;
  // Left-aligned so the text's leading edge never moves; the reserved slack
  // all sits on the trailing side.
  align-items: flex-start;
  &::after {
    content: attr(data-label);
    height: 0;
    overflow: hidden;
    visibility: hidden;
    font-weight: ${({ $hoverFontWeight }) => $hoverFontWeight};
  }
`;

/** Weight a dropdown row reaches on hover, and the width it reserves. */
const DROPDOWN_HOVER_WEIGHT = 600;

export const DesktopNav = () => {
  const router = useRouter();

  return (
    <nav>
      <UnstyledUnorderedList>
        {(navMap as navMapType[]).map((t1, index) => {
          if (t1.sub) {
            return (
              <li key={index}>
                <Menu
                  menuButton={
                    <MenuButton>
                      <MainMenuItem>
                        <NonBreakingSpan>{t1.text}</NonBreakingSpan>
                        <FiChevronDown />
                      </MainMenuItem>
                    </MenuButton>
                  }
                >
                  {t1.sub.map((t2, index) => {
                    if (t2.sub) {
                      return (
                        <SubMenu
                          label={
                            <SteadyWidthLabel
                              data-label={t2.text}
                              $hoverFontWeight={DROPDOWN_HOVER_WEIGHT}
                            >
                              {t2.text}
                            </SteadyWidthLabel>
                          }
                          key={`t2_${index}`}
                        >
                          {t2.sub.map((t3, index) => (
                            <MenuItem
                              key={`t3_${index}`}
                              onClick={() => {
                                router.push(`${t3.href}`);
                              }}
                            >
                              <Link href={t3.href}>
                                <SteadyWidthLabel
                                  data-label={t3.text}
                                  $hoverFontWeight={DROPDOWN_HOVER_WEIGHT}
                                >
                                  {t3.text}
                                </SteadyWidthLabel>
                              </Link>
                            </MenuItem>
                          ))}
                        </SubMenu>
                      );
                    }
                    return (
                      <MenuItem
                        key={`t2_${index}`}
                        onClick={() => {
                          router.push(`${t2.href}`);
                        }}
                      >
                        <Link href={t2.href}>
                          <SteadyWidthLabel
                            data-label={t2.text}
                            $hoverFontWeight={DROPDOWN_HOVER_WEIGHT}
                          >
                            {t2.text}
                          </SteadyWidthLabel>
                        </Link>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </li>
            );
          }
          return (
            <li key={index}>
              <Link href={t1.href}>
                <NonBreakingSpan>{t1.text}</NonBreakingSpan>
              </Link>
            </li>
          );
        })}
      </UnstyledUnorderedList>
    </nav>
  );
};
