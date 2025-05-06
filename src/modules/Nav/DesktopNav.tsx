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
  z-index: 10;
  > * {
    &:not(:last-child) {
      margin-right: ${Spaces.xl};
      ${media('tablet')(`margin-right: ${Spaces.md}`)}
    }
  }
  button {
    background-color: transparent;
    border: none;
  }
  a,
  button {
    color: ${Colors.greyLighter};
    font-weight: 700;
    font-size: ${FontSizes.sm};
    &:hover,
    &:focus {
      color: ${Colors.primary};
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
      &:hover,
      &:focus,
      &:hover a,
      &:focus a {
        color: ${Colors.primary};
      }
    }

    // sets location of '+' icon for expandable menu items
    .szh-menu__item--submenu:after {
      content: '+';
      position: absolute;
      right: 0;
    }
  }

  // styling for window expandable pop up
  ul {
    padding: 4px 8px;
    list-style: none;
    background-color: ${Colors.greyDarker};
  }

  // creates space between menu items
  .szh-menu__item {
    padding: 8px;
    margin-right: 12px;
  }

  ul ul {
    transform: translate(20px, -4px);
  }
`;

const MainMenuItem = styled.div`
  display: flex;
  align-items: flex-end;
  > :last-child {
    margin-left: 4px;
  }
`;

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
                        {t1.text}
                        <FiChevronDown />
                      </MainMenuItem>
                    </MenuButton>
                  }
                >
                  {t1.sub.map((t2, index) => {
                    if (t2.sub) {
                      return (
                        <SubMenu label={`${t2.text}`} key={`t2_${index}`}>
                          {t2.sub.map((t3, index) => (
                            <MenuItem
                              key={`t3_${index}`}
                              onClick={() => {
                                router.push(`${t3.href}`);
                              }}
                            >
                              <Link href={t3.href}>
                                <NonBreakingSpan>{t3.text}</NonBreakingSpan>
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
                          <NonBreakingSpan>{t2.text}</NonBreakingSpan>
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
              <Link href={t1.href}>{t1.text}</Link>
            </li>
          );
        })}
      </UnstyledUnorderedList>
    </nav>
  );
};
