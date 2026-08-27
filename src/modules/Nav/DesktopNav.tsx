'use client';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import { Colors, FontSizes, Spaces, media } from 'theme';
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
    transform: translateY(8px);
    a,
    button,
    .szh-menu__item,
    .szh-menu__item--submenu {
      color: ${Colors.greyLighter};
      font-weight: 400;
      font-size: ${FontSizes.sm};
    }

    // Same highlight as the top-level bar. The --hover class is the library's
    // own, which it also sets during arrow-key navigation — so the keyboard
    // path lights up the same row the pointer would.
    .szh-menu__item {
      border-radius: 4px;
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
      &:hover,
      &:focus,
      &.szh-menu__item--hover {
        color: ${Colors.black};
        background-color: ${Colors.primary};
        font-weight: 600;
        a {
          color: ${Colors.black};
          font-weight: 600;
        }
      }
    }

    // sets location of '+' icon for expandable menu items
    .szh-menu__item--submenu:after {
      content: '+';
      position: absolute;
      right: ${Spaces.sm};
    }
  }

  // styling for window expandable pop up
  ul {
    padding: 4px 8px;
    list-style: none;
    background-color: ${Colors.greyDarker};
  }

  // Row padding doubles as the highlight's inset. The right side is wider to
  // reserve room for the '+' on expandable rows, which the old margin-right
  // used to hold open — margin would have left a gap the highlight can't fill.
  .szh-menu__item {
    padding: ${Spaces.sm} ${Spaces.lg} ${Spaces.sm} ${Spaces.sm};
  }

  // A nested panel is placed at its parent row's right edge, so this nudge is
  // measured from there. Dropping the rows' 12px margin above widened them by
  // that much, so the nudge sheds the same 12px to land where it always did.
  ul ul {
    transform: translate(${Spaces.sm}, -4px);
  }
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
