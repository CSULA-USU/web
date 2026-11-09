/**
 * @jest-environment jsdom
 */
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { createStore, Provider } from 'jotai';
import { backofficeUserState } from 'atoms/BackofficeUserAtom';
import {
  useBackofficeUser,
  useBackofficeUserSync,
  useRefreshBackofficeUser,
} from 'hooks/useBackofficeUser';

const user = {
  id: 1,
  email: 'staff@calstatela.edu',
  departmentId: null,
  departmentKey: null,
  departmentName: null,
  departmentFullName: null,
  roles: [],
  effectivePolicies: [],
};

const promoted = {
  ...user,
  effectivePolicies: [
    {
      pageKey: 'accessManagement',
      action: 'view',
      scope: '*',
      source: 'role' as const,
    },
  ],
};

const meResponse = (body: unknown, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  // A fresh object per response, as real JSON parsing gives.
  json: () => Promise.resolve(JSON.parse(JSON.stringify(body))),
});

const Probe = ({ label }: { label: string }) => {
  const { user: loaded, loading } = useBackofficeUser();
  const policies = loaded?.effectivePolicies.length ?? 0;
  return (
    <span data-testid={label}>
      {loading ? 'loading' : loaded ? `${loaded.email}:${policies}` : 'none'}
    </span>
  );
};

const Sync = () => {
  useBackofficeUserSync();
  return null;
};

const RefreshButton = () => {
  const refresh = useRefreshBackofficeUser();
  return <button onClick={() => refresh()}>Save</button>;
};

// One backoffice page: the shell (which runs the sync), sidebar, nav list and
// page access check each use the hook in the same render.
const BackofficePage = () => (
  <>
    <Sync />
    <Probe label="shell" />
    <Probe label="sidebar" />
    <Probe label="nav" />
    <Probe label="access" />
  </>
);

const LABELS = ['shell', 'sidebar', 'nav', 'access'];
const text = (label: string) => screen.getByTestId(label).textContent;
const fetchMock = () => global.fetch as jest.Mock;

let store: ReturnType<typeof createStore>;

// The store stands in for _app's Provider, which outlives page changes.
const renderPage = (ui = <BackofficePage />) =>
  render(<Provider store={store}>{ui}</Provider>);

const setVisibility = (state: DocumentVisibilityState) =>
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => state,
  });

beforeEach(() => {
  store = createStore();
  setVisibility('visible');
  global.fetch = jest.fn().mockResolvedValue(meResponse(user));
});

afterEach(() => {
  jest.useRealTimers();
});

describe('useBackofficeUser', () => {
  it('loads /me once for every copy on the first page', async () => {
    renderPage();

    for (const label of LABELS) {
      await waitFor(() => expect(text(label)).toBe(`${user.email}:0`));
    }
    expect(fetchMock()).toHaveBeenCalledTimes(1);
    expect(fetchMock()).toHaveBeenCalledWith('/api/backoffice/me');
  });

  it('shows the next page instantly and refreshes once in the background', async () => {
    const first = renderPage();
    await waitFor(() => expect(text('shell')).toBe(`${user.email}:0`));
    first.unmount();

    renderPage();

    // No loading state: the atom outlived the previous page.
    for (const label of LABELS) expect(text(label)).toBe(`${user.email}:0`);
    await waitFor(() => expect(fetchMock()).toHaveBeenCalledTimes(2));
  });

  it('applies changed permissions from the background refresh', async () => {
    const first = renderPage();
    await waitFor(() => expect(text('shell')).toBe(`${user.email}:0`));
    first.unmount();

    fetchMock().mockResolvedValue(meResponse(promoted));
    renderPage();

    for (const label of LABELS) {
      await waitFor(() => expect(text(label)).toBe(`${user.email}:1`));
    }
  });

  it('does not refetch for a consumer that mounts later on the same page', async () => {
    renderPage();
    await waitFor(() => expect(text('shell')).toBe(`${user.email}:0`));

    // The nav inside the mobile drawer mounts when the drawer opens.
    render(
      <Provider store={store}>
        <Probe label="drawer" />
      </Provider>,
    );

    expect(text('drawer')).toBe(`${user.email}:0`);
    expect(fetchMock()).toHaveBeenCalledTimes(1);
  });

  it.each([401, 404])('treats a %s as no backoffice access', async (status) => {
    fetchMock().mockResolvedValue(meResponse({ error: 'nope' }, status));
    renderPage();

    for (const label of LABELS) {
      await waitFor(() => expect(text(label)).toBe('none'));
    }
  });

  it('keeps the permissions on screen when a background refresh fails', async () => {
    const first = renderPage();
    await waitFor(() => expect(text('shell')).toBe(`${user.email}:0`));
    first.unmount();

    fetchMock().mockResolvedValue(meResponse({ error: 'down' }, 500));
    renderPage();
    await waitFor(() => expect(fetchMock()).toHaveBeenCalledTimes(2));
    await act(async () => {});

    for (const label of LABELS) expect(text(label)).toBe(`${user.email}:0`);
  });

  it('settles as no access when the first load cannot reach /me', async () => {
    fetchMock().mockRejectedValue(new TypeError('fetch failed'));
    renderPage();

    for (const label of LABELS) {
      await waitFor(() => expect(text(label)).toBe('none'));
    }
  });

  it('keeps the same user object when nothing changed', async () => {
    renderPage();
    await waitFor(() => expect(text('shell')).toBe(`${user.email}:0`));
    const before = store.get(backofficeUserState).user;

    await act(async () => {
      window.dispatchEvent(new Event('focus'));
    });
    await waitFor(() => expect(fetchMock()).toHaveBeenCalledTimes(2));
    await act(async () => {});

    expect(store.get(backofficeUserState).user).toBe(before);
  });
});

describe('keeping permissions current', () => {
  it('refreshes when the window regains focus', async () => {
    renderPage();
    await waitFor(() => expect(text('shell')).toBe(`${user.email}:0`));

    fetchMock().mockResolvedValue(meResponse(promoted));
    act(() => {
      window.dispatchEvent(new Event('focus'));
    });

    await waitFor(() => expect(text('nav')).toBe(`${user.email}:1`));
  });

  it('refreshes every 60 seconds while the tab is visible, not while hidden', async () => {
    jest.useFakeTimers();
    renderPage();
    await waitFor(() => expect(text('shell')).toBe(`${user.email}:0`));
    expect(fetchMock()).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(60_000);
    });
    await waitFor(() => expect(fetchMock()).toHaveBeenCalledTimes(2));

    setVisibility('hidden');
    act(() => {
      jest.advanceTimersByTime(120_000);
    });
    expect(fetchMock()).toHaveBeenCalledTimes(2);
  });

  it('stops refreshing once the backoffice page is gone', async () => {
    jest.useFakeTimers();
    const page = renderPage();
    await waitFor(() => expect(text('shell')).toBe(`${user.email}:0`));
    page.unmount();

    act(() => {
      jest.advanceTimersByTime(120_000);
      window.dispatchEvent(new Event('focus'));
    });

    expect(fetchMock()).toHaveBeenCalledTimes(1);
  });

  it('applies a save in access management at once', async () => {
    renderPage(
      <>
        <BackofficePage />
        <RefreshButton />
      </>,
    );
    await waitFor(() => expect(text('shell')).toBe(`${user.email}:0`));

    fetchMock().mockResolvedValue(meResponse(promoted));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    for (const label of LABELS) {
      await waitFor(() => expect(text(label)).toBe(`${user.email}:1`));
    }
  });
});
