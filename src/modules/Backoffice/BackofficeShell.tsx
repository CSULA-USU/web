'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { MdMenu } from 'react-icons/md';

import {
  Button,
  Eyebrow,
  FluidContainer,
  Loading,
  Typography,
} from 'components';
import backOfficeLinks from 'data/backOfficeLinks.json';
import type { BackofficeLinkSection } from 'types/Backoffice';
import BackofficeSideBar from './BackofficeSideBar';
import { findActiveBackofficeLink } from './BackofficeNavList';
import { useBackofficeUser, canViewBackofficePage } from 'hooks';
import { useBreakpoint } from 'hooks';
import { Colors, Spaces, media } from 'theme';
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
// sidebar inside it keeps following the scroll, and sits above the page
// content so the sidebar draws over anything it overlaps.
//
// It only shows above the uhd breakpoint (1980px): the content's left edge
// is max(72px, (width - 1440px) / 2), which first clears the 250px sidebar
// there, with 20px to spare. Narrower, it would cover the content, so the
// band's Tools button opens BackofficeMobilePanel instead. Widening the
// sidebar means raising this breakpoint with it.
const SidebarRail = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 250px;
  z-index: 11;

  ${media('uhd')(`display: none;`)}
`;

// Tools and Sign Out, for wherever SidebarRail is hidden; above uhd the
// sidebar holds both, so the band carries the title alone.
const BandActions = styled.div`
  display: none;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  ${media('uhd')(`display: flex;`)}
`;

const ButtonLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${Spaces.sm};
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
  const { isMobile } = useBreakpoint();
  const navSections = backOfficeLinks as BackofficeLinkSection[];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const { user, loading: userLoading } = useBackofficeUser();

  // Stable, because the drawer re-runs its open effect (focus, scroll lock)
  // whenever onClose changes identity.
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const activeSection = findActiveBackofficeLink(router.pathname)?.section;

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
      <BackofficeMobilePanel open={isMenuOpen} onClose={closeMenu} />
      <SidebarRail>
        <BackofficeSideBar />
      </SidebarRail>
      <Main>
        {/* The page hero's type (eyebrow, serif title, quiet subtitle) on a
            light band in place of the photo: a tool page under the dark main
            nav reads better calm, and a dark band would merge into the nav.
            Its padding mirrors a default FluidContainer at every breakpoint
            so the title stays on the body's left edge. */}
        <FluidContainer
          backgroundColor="greyLightest"
          padding="48px 72px 40px"
          paddingDesktop="32px 36px 28px"
          paddingMobile="24px 16px"
          flex
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="flex-end"
          gap={Spaces.lg}
        >
          <div>
            {activeSection ? (
              <Eyebrow margin={`0 0 12px`}>{activeSection}</Eyebrow>
            ) : null}
            <Typography
              as="h1"
              variant="pageHeader"
              size={isMobile ? 'xl' : '2xl'}
              lineHeight="1.15"
            >
              {title}
            </Typography>
            {subtitle ? (
              <Typography
                as="p"
                variant="span"
                size="sm"
                color="greyDark"
                margin={`${Spaces.sm} 0 0`}
              >
                {subtitle}
              </Typography>
            ) : null}
          </div>

          <BandActions>
            <Button
              variant="outline"
              padding="10px 16px"
              fontSize="14px"
              fontWeight="600"
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
            >
              <ButtonLabel>
                <MdMenu size={18} aria-hidden="true" />
                Tools
              </ButtonLabel>
            </Button>
            <Button
              variant="outline"
              padding="10px 20px"
              fontSize="14px"
              fontWeight="600"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </BandActions>
        </FluidContainer>
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
