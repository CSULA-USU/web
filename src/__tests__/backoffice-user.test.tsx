/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import { useBackofficeUser } from 'hooks/useBackofficeUser';

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

const Probe = ({ label }: { label: string }) => {
  const { user: loaded, loading } = useBackofficeUser();
  return (
    <span data-testid={label}>
      {loading ? 'loading' : loaded?.email ?? 'none'}
    </span>
  );
};

// Stands in for one backoffice page: the shell, sidebar, nav list and page
// access check each use the hook in the same render.
const BackofficePage = () => (
  <>
    <Probe label="shell" />
    <Probe label="sidebar" />
    <Probe label="nav" />
    <Probe label="access" />
  </>
);

describe('useBackofficeUser', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(user),
    });
  });

  it('shares one /me request across every copy mounted in the same render', async () => {
    render(<BackofficePage />);

    for (const label of ['shell', 'sidebar', 'nav', 'access']) {
      await waitFor(() =>
        expect(screen.getByTestId(label).textContent).toBe(user.email),
      );
    }
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/api/backoffice/me');
  });

  it('fetches again on the next page, so policy edits still apply', async () => {
    const { unmount } = render(<BackofficePage />);
    await waitFor(() =>
      expect(screen.getByTestId('shell').textContent).toBe(user.email),
    );
    unmount();

    render(<BackofficePage />);
    await waitFor(() =>
      expect(screen.getByTestId('shell').textContent).toBe(user.email),
    );
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('resolves every copy to no user when the request fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
    render(<BackofficePage />);

    for (const label of ['shell', 'sidebar', 'nav', 'access']) {
      await waitFor(() =>
        expect(screen.getByTestId(label).textContent).toBe('none'),
      );
    }
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
