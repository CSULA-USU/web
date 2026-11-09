import React from 'react';

import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { HiMenuAlt3 } from 'react-icons/hi';
import { Colors, FontSizes } from 'theme';
import navMap from 'data/navMap.json';
import { MdCancel } from 'react-icons/md';
import { FluidContainer, VisuallyHidden } from 'components';

interface navMapType {
  text: string;
  href: string;
  sub?: navMapType[];
}

// Radix portals the open menu to the end of <body>, so `fixed` is measured
// against the viewport. It used to render inside Nav's wrapper, whose `filter`
// made it measure against the nav instead. 1000 sits above page content and
// level with the site's modals (BaseModal), which never open alongside it;
// toasts (2000) still land on top.
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 1000;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
`;

const NavList = styled.ul`
  padding-left: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  > a {
    color: ${Colors.greyDarker};
    padding: 4px 0;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const T1Container = styled(NavList)`
  margin-bottom: 80%;
  > li > a:first-child {
    text-transform: uppercase;
    font-size: ${FontSizes['lg']};
    font-weight: 700;
  }
`;

const T2Container = styled(NavList)`
  > li > a {
    text-transform: uppercase;
    font-size: ${FontSizes['md']};
  }
`;

const T3Container = styled(NavList).attrs(() => ({ as: 'ul' }))`
  ${NavList};
  border-top: 1px solid ${Colors.greyDarker};
  padding-left: 24px;
  > li > a {
    display: inline;
    &:first-child {
    }
    font-size: ${FontSizes['sm']};
    margin: 0 0 4px;
  }
`;

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 8px;
  transition: 0.3s ease;
  &:hover {
    opacity: 0.7;
  }
`;

const getUniqueSubLinks = (
  items: navMapType[] = [],
  parentHref: string,
): navMapType[] => {
  return items.filter((item) => item.href !== parentHref);
};

/*
 * A Radix Dialog, which supplies everything the menu needs: focus moves in on
 * open and is trapped there, Esc closes it, page scroll is locked, and focus
 * returns to the hamburger on close. No effect here should re-implement any of
 * that.
 *
 * The open menu is not rendered until opened, unlike a hidden panel. That is
 * fine for search: Googlebot never clicks, but the desktop bar (always in the
 * DOM, see Nav) carries the same links.
 */
export const MobileNav = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <StyledButton aria-label="Navigation Menu">
        <HiMenuAlt3 size={48} />
      </StyledButton>
    </Dialog.Trigger>

    <Dialog.Portal>
      {/* The links are the whole menu; there is no description to point at. */}
      <Dialog.Content asChild aria-describedby={undefined}>
        <Container>
          <Dialog.Title asChild>
            <VisuallyHidden as="h2">Menu</VisuallyHidden>
          </Dialog.Title>
          <FluidContainer flex justifyContent="flex-start" alignItems="center">
            <Dialog.Close asChild>
              <button
                style={{
                  border: 0,
                  backgroundColor: 'transparent',
                  fontSize: 16,
                  position: 'absolute',
                  right: 16,
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label="Close Navigation"
              >
                CLOSE <MdCancel size={40} />
              </button>
            </Dialog.Close>
          </FluidContainer>
          <T1Container>
            {(navMap as navMapType[]).map((t1) => (
              <React.Fragment key={`t1-${t1.href}`}>
                <li>
                  <Link href={t1.href}>{t1.text}</Link>
                  {getUniqueSubLinks(t1.sub, t1.href).length > 0 && (
                    <T2Container>
                      {getUniqueSubLinks(t1.sub, t1.href).map((t2) => (
                        <React.Fragment key={`t2-${t2.href}`}>
                          <li>
                            <Link href={t2.href}>{t2.text}</Link>
                            {getUniqueSubLinks(t2.sub, t2.href).length > 0 && (
                              <T3Container>
                                {getUniqueSubLinks(t2.sub, t2.href).map(
                                  (t3) => (
                                    <li key={`t3-${t3.href}`}>
                                      <Link href={t3.href}>{t3.text}</Link>
                                    </li>
                                  ),
                                )}
                              </T3Container>
                            )}
                          </li>
                        </React.Fragment>
                      ))}
                    </T2Container>
                  )}
                </li>
              </React.Fragment>
            ))}
          </T1Container>
        </Container>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
