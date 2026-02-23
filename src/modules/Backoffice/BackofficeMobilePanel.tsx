'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { MdCancel } from 'react-icons/md';

import { Typography } from 'components';
import backOfficeLinks from 'data/backOfficeLinks.json';
import type { BackofficeLinkSection } from 'types/Backoffice';
import { Colors } from 'theme';

type Props = {
  open: boolean;
  onClose: () => void;
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(255, 255, 255, 0.95);
  padding: 24px;
  overflow-y: auto;
`;

const Panel = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
`;

const CloseRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 16px;
`;

const CloseButton = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;

  &:hover {
    opacity: 0.8;
  }
`;

/**
 * Copy the "card" look of the sidebar
 */
const SidebarCard = styled.nav`
  height: auto;
  background: ${({ theme }) => theme?.Colors?.Background ?? '#ffffff'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`;

const SidebarInner = styled.div`
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
  border: 0;
  border-radius: 8px;
  padding: 10px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: 2px solid ${({ theme }) => theme?.Colors?.Primary ?? '#007bff'};
    outline-offset: 2px;
  }
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

const NavLinkButton = styled.a<{ $active?: boolean }>`
  width: 100%;
  text-align: left;
  border: 0;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  text-decoration: none;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: ${({ $active, theme }) =>
    $active ? Colors.pastelYellow : theme?.Colors?.Surface ?? '#ffffff'};

  display: flex;
  flex-direction: column;
  gap: 4px;

  &:hover {
    background: ${Colors.pastelYellow};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme?.Colors?.Primary ?? '#007bff'};
    outline-offset: 2px;
  }
`;

export default function BackofficeMobilePanel({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');

  const navSections = backOfficeLinks as BackofficeLinkSection[];

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

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onMouseDown);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  if (!open) return null;

  return (
    <Overlay aria-modal="true" role="dialog">
      <Panel ref={ref}>
        <CloseRow>
          <CloseButton type="button" aria-label="Close menu" onClick={onClose}>
            CLOSE <MdCancel size={40} />
          </CloseButton>
        </CloseRow>

        <SidebarCard aria-label="Backoffice navigation panel">
          <SidebarInner>
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
                autoFocus
              />
            </SearchWrap>

            {filteredSections.map((section) => (
              <NavSection key={section.section}>
                <Typography as="h3" variant="label" weight="600">
                  {section.section}
                </Typography>

                <NavItems>
                  {section.items.map((item) => (
                    <Link
                      key={item.url}
                      href={item.url}
                      passHref
                      legacyBehavior
                    >
                      <NavLinkButton onClick={onClose}>
                        <Typography as="span" variant="label" weight="400">
                          {item.title}
                        </Typography>

                        {item.description ? (
                          <Typography as="span" variant="span">
                            {item.description}
                          </Typography>
                        ) : null}
                      </NavLinkButton>
                    </Link>
                  ))}
                </NavItems>
              </NavSection>
            ))}
          </SidebarInner>
        </SidebarCard>
      </Panel>
    </Overlay>
  );
}
