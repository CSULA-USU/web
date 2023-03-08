import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import { Colors, FontSizes, Spaces, media } from 'theme';
import navMap from 'data/navMap.json';
import { NonBreakingSpan } from 'components';
import { FiChevronDown } from 'react-icons/fi';

const Container = styled.nav`
  * {
    outline: none;
  }
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
  .szh-menu-container > ul {
    transform: translate(16px, 8px);
  }
  ul {
    border-left: 2px solid ${Colors.grey};
    transform: translateX(8px);
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
    .szh-menu__item--submenu:after {
      content: '>';
      position: absolute;
      right: 4px;
    }
  }
  ul {
    padding: 4px 8px;
    list-style: none;
    background-color: ${Colors.greyDarker};
  }
  .szh-menu__item {
    padding: 8px;
  }
`;

const MainMenuItem = styled.div`
  display: flex;
  align-items: flex-end;
  > :last-child {
    margin-left: 4px;
  }
`;

export const DesktopNav = () => (
  <Container>
    {navMap.map((t1, index) => {
      if (t1.sub) {
        return (
          <Menu
            key={index}
            menuButton={
              <MenuButton>
                <MainMenuItem>
                  {t1.text}
                  <FiChevronDown />
                </MainMenuItem>
              </MenuButton>
            }
          >
            <MenuItem>
              <Link href={t1.href}>
                <NonBreakingSpan>{t1.text}</NonBreakingSpan>
              </Link>
            </MenuItem>
            {t1.sub.map((t2, index) => {
              if (t2.sub) {
                return (
                  <SubMenu key={`t2_${index}`} label={t2.text}>
                    {t2.sub.map((t3, index) => (
                      <MenuItem key={`t3_${index}`}>
                        <Link href={t3.href}>
                          <NonBreakingSpan>{t3.text}</NonBreakingSpan>
                        </Link>
                      </MenuItem>
                    ))}
                  </SubMenu>
                );
              }
              return (
                <MenuItem key={`t2_${index}`}>
                  <Link href={t2.href}>
                    <NonBreakingSpan>{t2.text}</NonBreakingSpan>
                  </Link>
                </MenuItem>
              );
            })}
          </Menu>
        );
      }
      return (
        <Link key={index} href={t1.href}>
          {t1.text}
        </Link>
      );
    })}
  </Container>
);
