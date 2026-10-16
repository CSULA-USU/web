'use client';

import styled from 'styled-components';
import { signOut, useSession } from 'next-auth/react';

import { Button } from 'components';
import { useBackofficeUser } from 'hooks';
import { Colors, FontSizes, Spaces } from 'theme';
import BackofficeNavList from './BackofficeNavList';

// The main nav's own ground (greyDarkest) with no seam, so the rail reads as
// the nav turning down the left edge. It only shows at widths where the main
// nav is the dark variant (see SidebarRail in BackofficeShell); against the
// compact white nav it would read as a separate slab.
const Sidebar = styled.aside`
  width: 250px;
  position: sticky;
  top: 0;
  height: 100vh;
  background: ${Colors.greyDarkest};
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const SidebarInner = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: ${Spaces.lg} 0;
`;

// The sidebar is one window tall and pins at top: 0, but until the page is
// scrolled it starts below the main nav, so its last ~120px hang past the
// window's bottom edge. Pinning this block to the window's bottom keeps Sign
// Out in view from the first paint. It needs its own background because, at
// the top of the page, it sits over the bottom of the link list; with a list
// long enough to reach that far, its last link shows once the page scrolls.
const Account = styled.div`
  position: sticky;
  bottom: 0;
  background: ${Colors.greyDarkest};
  flex-shrink: 0;
  padding: 20px;
  border-top: 1px solid ${Colors.greyDark};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const AccountLabel = styled.span`
  display: block;
  font-size: ${FontSizes['2xs']};
  color: ${Colors.greyLighter};
`;

const AccountName = styled.span`
  display: block;
  font-size: ${FontSizes.xs};
  font-weight: 600;
  color: ${Colors.white};
  overflow-wrap: anywhere;
`;

export default function BackofficeSideBar() {
  const { data: session } = useSession();
  const { user } = useBackofficeUser();
  // Azure AD supplies a display name; the backoffice record only has email.
  const accountName = session?.user?.name ?? user?.email;

  return (
    <Sidebar aria-label="Backoffice navigation">
      <SidebarInner>
        <BackofficeNavList searchId="backoffice-sidebar-search" />
      </SidebarInner>
      <Account>
        {accountName ? (
          <div>
            <AccountLabel>Signed in as</AccountLabel>
            <AccountName>{accountName}</AccountName>
          </div>
        ) : null}
        <Button
          variant="whiteOutline"
          padding="8px 16px"
          fontSize="14px"
          fontWeight="600"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </Account>
    </Sidebar>
  );
}
