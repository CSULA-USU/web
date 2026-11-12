/**
 * @jest-environment jsdom
 */
// The `components` barrel transitively reaches lib/supabase, which throws at
// import time without env vars. Nothing here talks to Supabase.
jest.mock('lib/supabase', () => ({ supabase: {} }));
jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Modal from 'react-modal';
import { SearchButton } from 'modules/SiteSearch/SearchButton';

beforeAll(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([]),
  }) as unknown as typeof fetch;
});

// Mirrors _app.tsx's setAppElement with a dedicated root, so react-modal hides
// that root rather than the portal and *ByRole queries still see the dialog.
const renderButton = () => {
  const appRoot = document.createElement('div');
  document.body.appendChild(appRoot);
  Modal.setAppElement(appRoot);
  return render(<SearchButton />, { container: appRoot });
};

describe('SearchButton', () => {
  /* The opening animation in globals.css is scoped to this portal class and
     keys off react-modal's --after-open classes, so both have to be present
     for the dialog to ease in rather than appear at once. */
  it('opens search inside the portal the opening animation is scoped to', async () => {
    renderButton();
    fireEvent.click(screen.getByRole('link', { name: 'Search' }));

    const dialog = await screen.findByRole('dialog', { name: 'Search' });
    const portal = dialog.closest('.usu-search-modal-portal');
    expect(portal).not.toBeNull();

    await waitFor(() => {
      expect(dialog.className).toContain('ReactModal__Content--after-open');
      expect(
        portal?.querySelector('.ReactModal__Overlay--after-open'),
      ).not.toBeNull();
    });
  });
});
