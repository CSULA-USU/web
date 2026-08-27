import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Tab, Tabs, TabList } from 'react-tabs';
import { FluidContainer, Typography, Button } from 'components';
import { toKebabCase } from 'utils/stringhelpers';

interface TabClusterProps {
  tabItems: string[];
  children?: React.ReactNode;
  /**
   * Names the tab strip for screen readers. Give one when a page carries more
   * than one set of tabs, so the two are told apart.
   */
  label?: string;
  /**
   * Query key the open tab is written to, e.g. `?tab=chapters`. Override it
   * when a page carries two clusters, so they do not fight over one key.
   */
  urlParam?: string;
}

/*
 * `react-tabs` ships a stylesheet whose entire contribution for panels is
 * these two rules, and this project has never imported it. Nothing needed it
 * while an unselected panel rendered no children at all — `forceRenderTabPanel`
 * below changes that, so the hiding has to come from somewhere. Scoped to the
 * cluster rather than dropped in globally.
 *
 * `display: none` rather than `visibility` or `opacity`: it keeps a closed
 * panel out of the tab order and out of the accessibility tree, and it is the
 * form a crawler reads as ordinary hidden content.
 */
const TabsScope = styled.div`
  .react-tabs__tab-panel {
    display: none;
  }

  .react-tabs__tab-panel--selected {
    display: block;
  }
`;

export const TabCluster = ({
  tabItems,
  children,
  label,
  urlParam = 'tab',
}: TabClusterProps) => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);

  /* Read through a ref so the effect below can depend on the route alone.
     Callers build `tabItems` inline — `Object.keys(...)`, an array literal —
     so as a dependency it is a fresh array on every render. */
  const slugsRef = useRef(tabItems.map(toKebabCase));
  useEffect(() => {
    slugsRef.current = tabItems.map(toKebabCase);
  });

  /* Deep links: `?tab=how-to-join` opens that tab, and Back steps between the
     tabs a reader opened. The server has no query string to render from, so
     the first paint is always the first tab and the linked one is selected
     once the router is ready — resolving it any earlier would make the
     client's markup disagree with the server's. A route carrying no key at
     all returns to the first tab, which is what Back off the first click
     should do. */
  useEffect(() => {
    if (!router.isReady) return;
    const requested = router.query[urlParam];
    const slug = Array.isArray(requested) ? requested[0] : requested;
    const linked = slug ? slugsRef.current.indexOf(slug) : 0;
    if (linked > -1) setSelectedIndex(linked);
  }, [router.isReady, router.query, urlParam]);

  /* Writing the open tab to the URL is what makes it shareable. Shallow and
     scroll-free: nothing needs refetching, and the reader is already looking
     at the strip they just clicked. */
  const openTab = (index: number) => {
    setSelectedIndex(index);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, [urlParam]: slugsRef.current[index] },
      },
      undefined,
      { shallow: true, scroll: false },
    );
  };

  return (
    <TabsScope>
      <FluidContainer flex justifyContent="space-evenly" flexWrap="wrap">
        {/* Every panel renders, open or not, so the whole page reaches a
            crawler — which never clicks a tab — and the CSS above decides what
            is on screen. Without it only the tab that happens to open first is
            ever indexed. */}
        <Tabs
          selectedIndex={selectedIndex}
          onSelect={openTab}
          forceRenderTabPanel
        >
          <TabList
            aria-label={label}
            style={{
              listStyleType: 'none',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              paddingLeft: 0,
            }}
          >
            {tabItems.map((item, index) => (
              <Tab key={item}>
                <Button margin="5px" variant="black">
                  <Typography
                    lineHeight="1"
                    variant="cta"
                    color={selectedIndex === index ? 'primary' : 'white'}
                    size="xs"
                  >
                    {item}
                  </Typography>
                </Button>
              </Tab>
            ))}
          </TabList>
          {children}
        </Tabs>
      </FluidContainer>
    </TabsScope>
  );
};
