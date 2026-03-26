'use client';

import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import { Button, FluidContainer, Loading, Typography } from 'components';
import backOfficeLinks from 'data/backOfficeLinks.json';
import type { BackofficeLinkSection } from 'types/Backoffice';
import BackofficeSideBar from './BackofficeSideBar';
import { useBreakpoint } from 'hooks';
import { Colors } from 'theme';
import { HiMenuAlt3 } from 'react-icons/hi';
import BackofficeMobilePanel from 'modules/Backoffice/BackofficeMobilePanel';

const Shell = styled.div`
  display: flex;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
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
  padding: 60px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
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

const TabletIconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-cotent: space-between;
  gap: 16px;
  align-items: flex-end;

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

  const allItems = useMemo(() => flattenNav(navSections), [navSections]);
  const featuredItems = useMemo(
    () => allItems.filter((item) => item.featured),
    [allItems],
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
      <BackofficeSideBar />
      <Main>
        <TopBar>
          <TopBarLeft>
            <Typography
              as="h1"
              variant="pageHeader"
              size={isMobile ? 'xl' : isWidescreen ? 'xl' : '2xl'}
            >
              {title}
            </Typography>

            {subtitle ? (
              <Typography as="p" variant="cta" size={isMobile ? 'sm' : 'md'}>
                {subtitle}
              </Typography>
            ) : null}
          </TopBarLeft>

          {isDesktop ? (
            <TabletIconsContainer>
              <Button
                padding="10px 20px"
                fontSize="14px"
                fontWeight="600"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
              <HiMenuAlt3
                size={32}
                color={Colors.primary}
                onClick={() => {
                  setIsMenuOpen(true);
                }}
              />
            </TabletIconsContainer>
          ) : (
            <Button onClick={() => signOut()}>Sign Out</Button>
          )}
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
