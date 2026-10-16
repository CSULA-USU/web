'use client';

import { useMemo, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Direct path, not the components barrel, which pulls in every module.
import { Eyebrow } from 'components/Eyebrow/Eyebrow';
import backOfficeLinks from 'data/backOfficeLinks.json';
import type {
  BackofficeLinkItem,
  BackofficeLinkSection,
} from 'types/Backoffice';
import { Colors, FontSizes, Radii, Spaces } from 'theme';
import { useBackofficeUser, canViewBackofficePage } from 'hooks';

const navSections = backOfficeLinks as BackofficeLinkSection[];

/**
 * The link the current route belongs to: the longest link URL that the path
 * equals or sits under, so a sub-page such as /backoffice/access-management/roles
 * still marks Access Management. Home (/backoffice) only matches itself, since
 * every route sits under it.
 */
export function findActiveBackofficeLink(pathname: string) {
  let best: { item: BackofficeLinkItem; section: string } | null = null;
  for (const section of navSections) {
    for (const item of section.items) {
      const isMatch =
        pathname === item.url ||
        (item.url !== '/backoffice' && pathname.startsWith(`${item.url}/`));
      if (isMatch && (!best || item.url.length > best.item.url.length)) {
        best = { item, section: section.section };
      }
    }
  }
  return best;
}

/** Left and right inset for everything in the rail. */
const RAIL_INSET = '20px';

// Where a section label's text starts: the inset plus Eyebrow's leading rule
// (28px) and the gap after it (Spaces.sm). Tool links indent to this line so
// they sit visibly under their section, the way a tree nests children under a
// parent. Changing Eyebrow's rule or gap means updating this with it.
const NESTED_TEXT_INSET = `calc(${RAIL_INSET} + 28px + ${Spaces.sm})`;

const SearchWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.sm};
  padding: 0 ${RAIL_INSET} ${Spaces.lg};
`;

const SearchLabel = styled.label`
  font-size: ${FontSizes['2xs']};
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${Colors.greyLighter};
`;

const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  font-size: ${FontSizes.xs};
  color: ${Colors.white};
  background: ${Colors.greyDarker};
  border: 1px solid ${Colors.greyDark};
  border-radius: ${Radii.control};

  &::placeholder {
    color: ${Colors.greyLighter};
    opacity: 0.7;
  }

  &:focus-visible {
    outline: 2px solid ${Colors.primary};
    outline-offset: 2px;
  }
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.md};
`;

// Grouping is carried by space first: about 50px between one section's last
// link and the next label against about 24px between links, plus a hairline
// at the break. Labels sit tight to their first link (Section's own gap), so
// each label reads as belonging to what follows it, not to what came before.
//
// The hairline is deliberately quieter than the full greyDark rule above the
// sidebar's account block: that one marks a change of kind (tools to the
// signed-in user), this one only a new group of tools. No theme grey sits
// between the two, so it is greyDark mixed halfway into the rail's ground.
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.xs};

  & + & {
    border-top: 1px solid
      color-mix(in srgb, ${Colors.greyDark} 50%, ${Colors.greyDarkest});
    padding-top: ${Spaces.lg};
  }
`;

// Rows, not cards: the rail is one square structure (Radii.structure), so its
// rows stay square too, and hover fills with primary like the main nav's
// dropdown rows rather than tinting. The fill and the current-page border run
// the rail's full width while the text indents to NESTED_TEXT_INSET. The 2px
// left border is reserved on every row (and taken off the padding) so marking
// the current page does not shift its text.
const RowLink = styled(Link)<{ $active: boolean }>`
  display: block;
  padding: 10px ${RAIL_INSET} 10px calc(${NESTED_TEXT_INSET} - 2px);
  border-left: 2px solid
    ${({ $active }) => ($active ? Colors.primary : 'transparent')};
  border-radius: ${Radii.structure};
  background-color: ${({ $active }) =>
    $active ? Colors.greyDarker : 'transparent'};
  color: ${({ $active }) => ($active ? Colors.white : Colors.greyLighter)};
  font-size: ${FontSizes.sm};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  line-height: 1.3;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${Colors.primary};
    color: ${Colors.black};
  }

  &:focus-visible {
    outline: 2px solid ${Colors.primary};
    outline-offset: -2px;
  }
`;

const EmptyMessage = styled.p`
  margin: 0;
  padding: 0 ${RAIL_INSET};
  font-size: ${FontSizes.xs};
  color: ${Colors.greyLighter};
`;

type Props = {
  /** Unique per instance: the sidebar and the drawer can both be mounted. */
  searchId: string;
  /** Runs after a link is chosen, e.g. to close the drawer. */
  onNavigate?: () => void;
};

/**
 * Search plus the sectioned tool links, drawn for a dark (greyDarkest)
 * ground. Shared by the sidebar and the drawer so the two cannot drift: both
 * filter by the viewer's page permissions and search titles and descriptions
 * alike, though descriptions are not shown — the home page's cards carry them.
 */
export default function BackofficeNavList({ searchId, onNavigate }: Props) {
  const router = useRouter();
  const { user, loading: userLoading } = useBackofficeUser();
  const [query, setQuery] = useState('');

  const activeUrl = findActiveBackofficeLink(router.pathname)?.item.url;

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return navSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          if (item.pageKey && !userLoading && user) {
            if (!canViewBackofficePage(user.effectivePolicies, item.pageKey))
              return false;
          }
          if (!q) return true;
          return (
            item.title.toLowerCase().includes(q) ||
            (item.description ?? '').toLowerCase().includes(q)
          );
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [query, user, userLoading]);

  return (
    <>
      <SearchWrap>
        <SearchLabel htmlFor={searchId}>Search tools</SearchLabel>
        <SearchInput
          id={searchId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Name or description"
        />
      </SearchWrap>

      <Sections>
        {filteredSections.map((section) => (
          <Section key={section.section}>
            <Eyebrow
              as="h2"
              color="greyLighter"
              accentColor="primary"
              margin={`0 ${RAIL_INSET}`}
            >
              {section.section}
            </Eyebrow>
            {section.items.map((item) => (
              <RowLink
                key={item.url}
                href={item.url}
                $active={item.url === activeUrl}
                aria-current={item.url === activeUrl ? 'page' : undefined}
                onClick={onNavigate}
              >
                {item.title}
              </RowLink>
            ))}
          </Section>
        ))}
        {filteredSections.length === 0 ? (
          <EmptyMessage>No tools match that search.</EmptyMessage>
        ) : null}
      </Sections>
    </>
  );
}
