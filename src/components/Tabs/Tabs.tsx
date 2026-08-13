import { KeyboardEvent, useEffect, useId, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Colors, FontSizes, Spaces, media } from 'theme';

type TabsVariant = 'plain' | 'folder';

interface TabProps {
  title: string;
  children: React.ReactNode;
  /** DOM id for the tab button. Give one when the tab is a link target: `#id`
   * then both scrolls the page to the tab strip and selects that tab. */
  id?: string;
}

interface TabsStyle {
  minHeight?: string;
  /** Clearance for a sticky bar above the tab strip, used when a tab is a
   * link target and the browser scrolls to it. */
  scrollMarginTop?: string;
}

interface TabsProps extends TabsStyle {
  items: TabProps[];
  /** `plain` is a row of labels over a rule. `folder` draws each tab as the
   * tab of a file folder, with the active one joined to the panel below it. */
  variant?: TabsVariant;
  /** Names the tab strip for screen readers. Required when a page has more
   * than one set of tabs, so the two are told apart. */
  label?: string;
  /** Tab shown before anything is clicked, and before any matching hash. */
  defaultIndex?: number;
}

/* The folder's outline and its interior. The active tab paints its own bottom
   edge in the interior color to erase the seam between tab and panel. */
const FOLDER_EDGE = Colors.greyLighter;
const FOLDER_FILL = Colors.greyLightest;

const TabsContainer = styled.div<{ minHeight?: string }>`
  ${(p) => p.minHeight && `min-height: ${p.minHeight}`}
`;

const TabList = styled.div<{ $variant: TabsVariant }>`
  display: flex;
  align-items: flex-end;

  ${(p) =>
    p.$variant === 'folder'
      ? `
        gap: ${Spaces.xs};
        /* The whole strip overlaps the panel's top border by 1px, so the
           active tab's fill-colored bottom edge lands on that border and
           erases it — the join that makes tab and panel one shape. The
           overlap belongs here rather than on the tab itself: the scrolling
           below makes this a scroll container, which clips its children on
           both axes, so a tab reaching past this box would be cut off. */
        position: relative;
        z-index: 1;
        margin-bottom: -1px;
        /* Folder tabs cannot wrap — a second row would sit behind the panel
           rather than on it — so a crowded strip scrolls instead. */
        flex-wrap: nowrap;
        overflow-x: auto;
        scrollbar-width: none;
        ::-webkit-scrollbar {
          display: none;
        }
      `
      : `
        border-bottom: 1px solid ${Colors.black};
        padding-bottom: ${Spaces.sm};
        margin-bottom: ${Spaces.md};
        > *:not(:last-child) {
          margin-right: ${Spaces.md};
        }
        ${media('tablet')('flex-wrap: wrap;')}
      `}
`;

/* Weight and color both carry the active state, so it never rests on color
   alone. The plain variant deliberately has no underline: the strip already
   has a rule, and a second line on top of it reads as a mistake. */
const Tab = styled.button<{
  $active: boolean;
  $variant: TabsVariant;
  $scrollMarginTop?: string;
}>`
  background: transparent;
  border: none;
  padding: 0;
  font: inherit;
  font-weight: ${(p) => (p.$active ? 700 : 400)};
  color: ${(p) => (p.$active ? Colors.gold : Colors.black)};
  transition: color 0.2s ease, background-color 0.2s ease,
    border-color 0.2s ease;
  cursor: pointer;
  ${(p) => p.$scrollMarginTop && `scroll-margin-top: ${p.$scrollMarginTop};`}

  :hover {
    color: ${Colors.gold};
    ${(p) => p.$variant === 'plain' && 'text-decoration: underline;'}
  }

  :focus-visible {
    outline: 2px solid ${Colors.gold};
    outline-offset: 3px;
  }

  ${(p) =>
    p.$variant === 'folder' &&
    `
      position: relative;
      /* Every tab is outlined on all four sides. The active tab's gold cap is
         its 1px top border thickened by an inset shadow rather than a wider
         border, so widening it cannot shift the tab's height. */
      border: 1px solid ${FOLDER_EDGE};
      border-top-color: ${p.$active ? Colors.gold : FOLDER_EDGE};
      border-bottom-color: ${p.$active ? FOLDER_FILL : FOLDER_EDGE};
      box-shadow: ${p.$active ? `inset 0 2px 0 ${Colors.gold}` : 'none'};
      border-radius: 12px 12px 0 0;
      background-color: ${p.$active ? FOLDER_FILL : Colors.white};
      color: ${p.$active ? Colors.gold : Colors.greyDark};
      font-size: ${FontSizes.xs};
      font-weight: ${p.$active ? 700 : 600};
      white-space: nowrap;
      /* Inactive tabs start 4px lower and are 4px shorter, so every tab ends
         on the same seam while the active one stands proud of the rest. */
      padding: ${p.$active ? Spaces.sm : Spaces.xs} ${Spaces.lg} ${Spaces.sm};
      margin-top: ${p.$active ? '0' : Spaces.xs};

      :hover {
        background-color: ${p.$active ? FOLDER_FILL : Colors.greyLightest};
      }

      :focus-visible {
        outline-offset: -4px;
      }
    `}
`;

const TabPanel = styled.div<{ $variant: TabsVariant }>`
  ${(p) =>
    p.$variant === 'folder' &&
    `
      position: relative;
      background-color: ${FOLDER_FILL};
      border: 1px solid ${FOLDER_EDGE};
      /* Square where the strip meets it; rounded everywhere else. */
      border-radius: 0 16px 16px 16px;
      padding: clamp(20px, 3vw, 32px);
    `}

  :focus-visible {
    outline: 2px solid ${Colors.gold};
    outline-offset: 3px;
  }
`;

export const Tabs = ({
  items,
  variant = 'plain',
  label,
  defaultIndex = 0,
  scrollMarginTop,
  ...props
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultIndex);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const { events } = useRouter();
  /* Read through a ref so the subscription below can be set up once, rather
     than torn down and rebuilt whenever a caller passes `items` inline. */
  const itemsRef = useRef(items);

  useEffect(() => {
    itemsRef.current = items;
  });

  /* Deep links. Next handles in-page fragments with `pushState`, which never
     fires `hashchange`, so the router's own event is the signal — and it
     fires even when the fragment is unchanged, so clicking the same link
     twice re-selects the tab. The first call covers a page loaded straight
     at a fragment, which the server render cannot know about. */
  useEffect(() => {
    const selectLinkedTab = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const linked = itemsRef.current.findIndex((item) => item.id === hash);
      if (linked > -1) setActiveTab(linked);
    };

    selectLinkedTab();
    events.on('hashChangeComplete', selectLinkedTab);
    return () => events.off('hashChangeComplete', selectLinkedTab);
  }, [events]);

  const selectTab = (index: number) => {
    const next = (index + items.length) % items.length;
    setActiveTab(next);
    tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: activeTab + 1,
      ArrowLeft: activeTab - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    selectTab(moves[event.key]);
  };

  const activeItem = items[activeTab] ?? items[0];
  const activeTabId = activeItem?.id ?? `${baseId}-tab-${activeTab}`;

  return (
    <TabsContainer {...props}>
      <TabList role="tablist" aria-label={label} $variant={variant}>
        {items.map((item, i) => (
          <Tab
            key={item.title}
            type="button"
            id={item.id ?? `${baseId}-tab-${i}`}
            ref={(node) => {
              tabRefs.current[i] = node;
            }}
            role="tab"
            aria-selected={i === activeTab}
            aria-controls={`${baseId}-panel-${i}`}
            tabIndex={i === activeTab ? 0 : -1}
            $active={i === activeTab}
            $variant={variant}
            $scrollMarginTop={scrollMarginTop}
            onClick={() => setActiveTab(i)}
            onKeyDown={handleKeyDown}
          >
            {item.title}
          </Tab>
        ))}
      </TabList>
      <TabPanel
        role="tabpanel"
        id={`${baseId}-panel-${activeTab}`}
        aria-labelledby={activeTabId}
        tabIndex={0}
        $variant={variant}
      >
        {activeItem?.children}
      </TabPanel>
    </TabsContainer>
  );
};
