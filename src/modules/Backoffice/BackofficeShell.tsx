'use client';

import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import { Button, FluidContainer, Loading, Typography } from 'components';
import backOfficeLinks from 'data/backOfficeLinks.json';
import type { BackofficeLinkSection } from 'types/Backoffice';
import BackofficeSideBar from './BackofficeSideBar';
import { useBackofficeUser, canViewBackofficePage } from 'hooks';
import { useBreakpoint } from 'hooks';
import { Colors, media } from 'theme';
import { MdOutlineLaunch } from 'react-icons/md';
import BackofficeMobilePanel from 'modules/Backoffice/BackofficeMobilePanel';

const Shell = styled.div`
  position: relative;
  display: flex;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

// Floats the sidebar outside the layout so the content can center in the
// same 1440px box as the main nav instead of in the space beside the
// sidebar. The rail spans the full height of the shell so the sticky
// sidebar inside it keeps following the scroll. Above TopBar (z-index 10)
// so the sidebar draws over anything it overlaps.
//
// It only shows above the uhd breakpoint (1980px): the content's left edge
// is max(72px, (width - 1440px) / 2), which first clears the 250px sidebar
// there, with 20px to spare. Narrower, it would cover the content, so
// MenuButton opens BackofficeMobilePanel instead. Widening the sidebar
// means raising this breakpoint with it.
const SidebarRail = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 250px;
  z-index: 11;

  ${media('uhd')(`display: none;`)}
`;

// The menu's only way in wherever SidebarRail is hidden, so it is a real
// button (focusable, labeled) rather than a click handler on the icon.
const MenuButton = styled.button`
  display: none;
  align-items: center;
  padding: 0;
  border: 0;
  background: none;
  line-height: 0;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${Colors.black};
    outline-offset: 2px;
  }

  ${media('uhd')(`display: inline-flex;`)}
`;

const Content = styled.div`
  width: 100%;
  flex: 1;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const TopBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  height: 80px;
  box-sizing: border-box;
  background: ${({ theme }) => theme?.Colors?.Background ?? '#ffffff'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  /* The bar spans the full width, but its contents sit where a default
     FluidContainer puts the page body: 72px in, and centered in 1440px once
     there is room. max(72px, (100% - 1440px) / 2) is that same edge, so the
     title lines up with the body and, on wide screens, the main nav. */
  padding: 60px max(72px, calc((100% - 1440px) / 2));
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  ${media('desktop')(`padding: 60px 36px;`)}
  @media (max-width: 768px) {
    gap: 24px;
    padding: 24px;
    height: 200px;
    justify-content: center;
  }
  @media (max-width: 580px) {
    display: flex;
    flex-direction: column;
  }
`;

const TopBarActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 580px) {
    display: flex;
    flex-direction: row;
  }
`;

const TopBarLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 0 0 0px;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.button`
border 0;
  background: ${({ theme }) => theme?.Colors?.Background ?? '#ffffff'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 6px;

  &:hover {
    background: ${Colors.pastelYellow};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme?.Colors?.Primary ?? '#007bff'};
    outline-offset: 2px;
  }
`;

type Props = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

function flattenNav(sections: BackofficeLinkSection[]) {
  return sections.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      section: section.section,
    })),
  );
}

export default function BackofficeShell({ title, subtitle, children }: Props) {
  const router = useRouter();
  const { isMobile, isDesktop, isWidescreen } = useBreakpoint();
  const navSections = backOfficeLinks as BackofficeLinkSection[];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const { user, loading: userLoading } = useBackofficeUser();

  const allItems = useMemo(() => flattenNav(navSections), [navSections]);
  const featuredItems = useMemo(
    () =>
      allItems.filter((item) => {
        if (!item.featured) return false;
        if (!item.pageKey) return true;
        if (userLoading || !user) return true;
        return canViewBackofficePage(user.effectivePolicies, item.pageKey);
      }),
    [allItems, user, userLoading],
  );

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        setIsNavigating(true);
      }
    };
    const handleComplete = () => setIsNavigating(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.asPath, router.events]);

  return (
    <Shell>
      <BackofficeMobilePanel
        open={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false);
        }}
      />
      <SidebarRail>
        <BackofficeSideBar />
      </SidebarRail>
      <Main>
        <TopBar>
          <TopBarLeft>
            <Typography
              as="h1"
              variant="pageHeader"
              size={isMobile ? 'lg' : isWidescreen ? 'xl' : '2xl'}
            >
              {title}
            </Typography>

            {subtitle ? (
              <Typography as="p" variant="cta" size={isMobile ? 'sm' : 'md'}>
                {subtitle}
              </Typography>
            ) : null}
          </TopBarLeft>

          <TopBarActions>
            {isDesktop ? (
              <Button
                padding="10px 20px"
                fontSize="14px"
                fontWeight="600"
                variant="outline"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            ) : (
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            )}
            <MenuButton
              type="button"
              aria-label="Open backoffice menu"
              onClick={() => setIsMenuOpen(true)}
            >
              <MdOutlineLaunch size={32} color={Colors.black} aria-hidden />
            </MenuButton>
          </TopBarActions>
        </TopBar>
        <Content>
          {isNavigating ? (
            <FluidContainer
              flex
              alignItems="center"
              justifyContent="center"
              height="70vh"
            >
              <Loading load={true} />
            </FluidContainer>
          ) : (
            <>
              {children}

              {router.pathname === '/backoffice' && featuredItems.length > 0 ? (
                <FluidContainer>
                  <Typography as="h2" variant="titleSmall">
                    Featured Tools
                  </Typography>

                  <FeaturedGrid>
                    {featuredItems.map((item) => (
                      <FeatureCard
                        key={item.url}
                        type="button"
                        onClick={() => handleNavigate(item.url)}
                      >
                        <Typography as="h4" variant="label">
                          {item.title}
                        </Typography>

                        {item.description ? (
                          <Typography as="p" variant="span">
                            {item.description}
                          </Typography>
                        ) : null}
                      </FeatureCard>
                    ))}
                  </FeaturedGrid>
                </FluidContainer>
              ) : null}
            </>
          )}
        </Content>
      </Main>
    </Shell>
  );
}
