/**
 * @jest-environment jsdom
 */
// The components and hooks barrels transitively reach lib/supabase, which
// throws at import time without env vars.
jest.mock('lib/supabase', () => ({ supabase: {} }));

let mockPathname = '/backoffice/bod';
jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: mockPathname }),
}));

jest.mock('hooks', () => ({
  ...jest.requireActual('hooks'),
  useBackofficeUser: () => ({ user: null, loading: false }),
}));

import { fireEvent, render, screen } from '@testing-library/react';
import BackofficeNavList, {
  findActiveBackofficeLink,
} from 'modules/Backoffice/BackofficeNavList';

describe('findActiveBackofficeLink', () => {
  it('matches a tool by its exact URL and reports its section', () => {
    const active = findActiveBackofficeLink('/backoffice/bod');
    expect(active?.item.title).toBe('Board of Directors');
    expect(active?.section).toBe('Governance');
  });

  it('keeps a tool active on its sub-pages', () => {
    expect(
      findActiveBackofficeLink('/backoffice/access-management/roles')?.item
        .title,
    ).toBe('Access Management');
  });

  it('matches Home only on /backoffice itself', () => {
    expect(findActiveBackofficeLink('/backoffice')?.item.title).toBe('Home');
    expect(findActiveBackofficeLink('/backoffice/unlisted-page')).toBeNull();
  });
});

describe('BackofficeNavList', () => {
  beforeEach(() => {
    mockPathname = '/backoffice/bod';
  });

  it('marks the current page and only that link', () => {
    render(<BackofficeNavList searchId="search" />);
    const current = screen.getByRole('link', { name: 'Board of Directors' });
    expect(current.getAttribute('aria-current')).toBe('page');
    expect(
      screen.getByRole('link', { name: 'Home' }).getAttribute('aria-current'),
    ).toBeNull();
  });

  it('searches descriptions as well as titles', () => {
    render(<BackofficeNavList searchId="search" />);
    fireEvent.change(screen.getByLabelText('Search tools'), {
      target: { value: 'meeting documents' },
    });
    expect(
      screen.getByRole('link', { name: 'Board of Directors' }),
    ).toBeTruthy();
    expect(screen.queryByRole('link', { name: 'Home' })).toBeNull();
  });

  it('says so when nothing matches', () => {
    render(<BackofficeNavList searchId="search" />);
    fireEvent.change(screen.getByLabelText('Search tools'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No tools match that search.')).toBeTruthy();
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  it('runs onNavigate when a link is chosen', () => {
    const onNavigate = jest.fn();
    render(<BackofficeNavList searchId="search" onNavigate={onNavigate} />);
    fireEvent.click(screen.getByRole('link', { name: 'Banner' }));
    expect(onNavigate).toHaveBeenCalled();
  });
});
