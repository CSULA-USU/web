'use client';

import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import { Button, FluidContainer, Typography } from 'components';
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
  background: ${({ theme }) => theme?.Colors?.Background ?? '#ffffff'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 10px;
    position: static;
    width: 100%;
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

  @media (max-width: 580px) {
    display: flex;
    flex-direction: row;
    align-items: center;
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
  const { isMobile, isDesktop } = useBreakpoint();
  const navSections = backOfficeLinks as BackofficeLinkSection[];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const allItems = useMemo(() => flattenNav(navSections), [navSections]);
  const featuredItems = useMemo(
    () => allItems.filter((item) => item.featured),
    [allItems],
  );

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  return (
    <Shell>
      <BackofficeMobilePanel
        open={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false);
        }}
      />
      {!isDesktop ? <BackofficeSideBar /> : null}
      <Main>
        <TopBar>
          <TopBarLeft>
            <Typography
              as="h1"
              variant="pageHeader"
              size={isMobile ? 'xl' : '2xl'}
            >
              {title}
            </Typography>

            {subtitle ? (
              <Typography as="p" variant="cta">
                {subtitle}
              </Typography>
            ) : null}
          </TopBarLeft>

          {isDesktop ? (
            <TabletIconsContainer>
              <Button onClick={() => signOut()}>Sign Out</Button>
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
        </Content>
      </Main>
    </Shell>
  );
}
