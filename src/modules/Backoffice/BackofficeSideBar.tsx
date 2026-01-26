'use client';

import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Typography } from 'components';
import backOfficeLinks from 'data/backOfficeLinks.json';
import type { BackofficeLinkSection } from 'types/Backoffice';
import { Colors } from 'theme';

type Props = {
  showSearch?: boolean;
};

const Sidebar = styled.aside`
  flex: 0 0 250px;
  align-self: flex-start;

  position: sticky;
  top: 0;

  height: calc(100vh);
  max-height: calc(100vh);

  background: ${({ theme }) => theme?.Colors?.Background ?? '#ffffff'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    position: static;
    width: 100%;
  }
`;

const SidebarInner = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;

  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const SearchWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SearchInput = styled.input`
  width: 100%;
  background: ${({ theme }) => theme?.Colors?.Background ?? '#ffffff'};
  border: 0px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px 12px;
  background: ${Colors.pastelYellow};
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NavButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  text-align: left;
  border: 0px;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: ${({ $active, theme }) =>
    $active ? Colors.pastelYellow : theme?.Colors?.Surface ?? '#ffffff'};
  display: flex;
  flex-direction: column;
  gap: 4px;

  &:hover {
    background: ${Colors.pastelYellow};
  }
`;

export default function BackofficeSideBar({ showSearch = true }: Props) {
  const router = useRouter();
  const navSections = backOfficeLinks as BackofficeLinkSection[];

  const [query, setQuery] = useState('');

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return navSections;

    return navSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          const titleMatch = item.title.toLowerCase().includes(q);
          const descMatch = (item.description ?? '').toLowerCase().includes(q);
          return titleMatch || descMatch;
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [navSections, query]);

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  const isActive = (href: string) => router.pathname === href;

  return (
    <Sidebar aria-label="Backoffice navigation">
      <SidebarInner>
        {showSearch ? (
          <SearchWrap>
            <Typography
              as="h2"
              variant="title"
              size="lg"
              weight="700"
              margin="0 0 16px 0"
            >
              Search tools
            </Typography>
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or description"
              aria-label="Search backoffice tools"
            />
          </SearchWrap>
        ) : null}

        {filteredSections.map((section) => (
          <NavSection key={section.section}>
            <Typography as="h3" variant="label" weight="600">
              {section.section}
            </Typography>

            <NavItems>
              {section.items.map((item) => (
                <NavButton
                  key={item.url}
                  type="button"
                  onClick={() => handleNavigate(item.url)}
                  $active={isActive(item.url)}
                >
                  <Typography as="span" variant="label" weight="400">
                    {item.title}
                  </Typography>

                  {item.description ? (
                    <Typography as="span" variant="span">
                      {item.description}
                    </Typography>
                  ) : null}
                </NavButton>
              ))}
            </NavItems>
          </NavSection>
        ))}
      </SidebarInner>
    </Sidebar>
  );
}
