import React from 'react';
import styled from 'styled-components';
import * as Drawer from '@accessible/drawer';
import Link from 'next/link';
import { HiMenuAlt3 } from 'react-icons/hi';
import { Colors, FontSizes } from 'theme';
import navMap from 'data/navMap.json';
import { MdCancel } from 'react-icons/md';
import { Search } from 'modules/Search';
import { FluidContainer } from 'components';

interface navMapType {
  text: string;
  href: string;
  sub?: navMapType[];
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 10;
  overflow-y: auto;
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

const T3Container = styled(NavList).attrs(() => ({ as: 'li' }))`
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

export const MobileNav = () => (
  <div>
    <Drawer.Drawer>
      <Drawer.Trigger>
        <StyledButton aria-label="Navigation Menu">
          <HiMenuAlt3 size={48} />
        </StyledButton>
      </Drawer.Trigger>

      <Drawer.Target preventScroll>
        <Container>
          <FluidContainer flex justifyContent="flex-start" alignItems="center">
            <Search />
            <Drawer.CloseButton>
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
            </Drawer.CloseButton>
          </FluidContainer>
          <T1Container>
            {(navMap as navMapType[]).map((t1) => (
              <React.Fragment key={`t1-${t1.href}`}>
                <li>
                  <Link href={t1.href}>{t1.text}</Link>
                  {t1.sub?.length && (
                    <T2Container>
                      {t1.sub?.map((t2) => (
                        <React.Fragment key={`t2-${t2.href}`}>
                          <li>
                            <Link href={t2.href}>{t2.text}</Link>
                            {t2.sub?.length && (
                              <T3Container>
                                {t2.sub?.map((t3) => (
                                  <li key={`t3-${t3.href}`}>
                                    <Link href={t3.href}>{t3.text}</Link>
                                  </li>
                                ))}
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
      </Drawer.Target>
    </Drawer.Drawer>
  </div>
);
