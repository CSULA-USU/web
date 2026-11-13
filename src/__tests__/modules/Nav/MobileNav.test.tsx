/**
 * @jest-environment jsdom
 */
// The `components` barrel transitively reaches lib/supabase, which throws at
// import time without env vars. Nothing here talks to Supabase.
jest.mock('lib/supabase', () => ({ supabase: {} }));

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { MobileNav } from 'modules/Nav/MobileNav';

// These renders bypass _app, so supply its styled-components prop filter.
const renderWithAppStyles = (ui: Parameters<typeof render>[0]) =>
  render(ui, {
    wrapper: ({ children }) => (
      <StyleSheetManager
        shouldForwardProp={(propName, target) =>
          typeof target === 'string' ? isPropValid(propName) : true
        }
      >
        {children}
      </StyleSheetManager>
    ),
  });

const openMenu = () => {
  fireEvent.click(screen.getByRole('button', { name: 'Navigation Menu' }));
  return screen.getByRole('dialog', { name: 'Menu' });
};

let consoleError: jest.SpyInstance;
let consoleWarn: jest.SpyInstance;

beforeEach(() => {
  consoleError = jest.spyOn(console, 'error');
  consoleWarn = jest.spyOn(console, 'warn');
});

afterEach(() => {
  // React 19's element.ref warning and Radix's missing-title warning both
  // arrive here; the menu should produce neither.
  expect(consoleError).not.toHaveBeenCalled();
  expect(consoleWarn).not.toHaveBeenCalled();
  jest.restoreAllMocks();
});

describe('MobileNav', () => {
  it('keeps the menu out of the page until it is opened', () => {
    renderWithAppStyles(<MobileNav />);
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByRole('link', { name: 'About' })).toBeNull();
  });

  it('opens a labeled dialog holding the site links', () => {
    renderWithAppStyles(<MobileNav />);
    openMenu();

    expect(
      screen.getByRole('link', { name: 'About' }).getAttribute('href'),
    ).toBe('/about');
  });

  // Radix makes the dialog modal by hiding everything else from assistive
  // tech, not with aria-modal, so that is what is asserted.
  it('hides the rest of the page from screen readers while open', async () => {
    renderWithAppStyles(
      <>
        <main>Page content</main>
        <MobileNav />
      </>,
    );
    const page = screen.getByText('Page content');
    expect(page.closest('[aria-hidden="true"]')).toBeNull();

    openMenu();
    expect(page.closest('[aria-hidden="true"]')).not.toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Close Navigation' }));
    await waitFor(() =>
      expect(page.closest('[aria-hidden="true"]')).toBeNull(),
    );
  });

  it('moves focus into the menu when it opens', async () => {
    renderWithAppStyles(<MobileNav />);
    const menu = openMenu();

    await waitFor(() =>
      expect(menu.contains(document.activeElement)).toBe(true),
    );
  });

  it('closes on Escape and returns focus to the hamburger', async () => {
    renderWithAppStyles(<MobileNav />);
    const menu = openMenu();

    fireEvent.keyDown(menu, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Navigation Menu' }),
    );
  });

  it('closes from its close button', async () => {
    renderWithAppStyles(<MobileNav />);
    openMenu();

    fireEvent.click(screen.getByRole('button', { name: 'Close Navigation' }));

    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });
});
