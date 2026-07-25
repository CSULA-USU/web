/**
 * @jest-environment jsdom
 */
// The `components` barrel transitively reaches lib/supabase, which throws at
// import time without env vars. Stubbing it keeps this a pure UI test.
jest.mock('lib/supabase', () => ({ supabase: {} }));

import type { ComponentProps } from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import Modal from 'react-modal';
import { ConfirmDialog } from 'modules/Modals/ConfirmDialog';

// react-modal portals to document.body and sets aria-hidden on the app element.
// Mirroring _app.tsx's setAppElement with a dedicated root keeps the portalled
// dialog outside the hidden subtree, so *ByRole queries can still see it.
const renderConfirmDialog = (
  props: Partial<ComponentProps<typeof ConfirmDialog>> = {},
) => {
  const appRoot = document.createElement('div');
  appRoot.id = 'app-root';
  document.body.appendChild(appRoot);
  Modal.setAppElement(appRoot);

  const onConfirm = jest.fn();
  const onCancel = jest.fn();

  const view = render(
    <ConfirmDialog
      title="Confirm Deletion"
      message="Are you sure you want to delete this document? This action cannot be undone."
      highlightedText="Board Agenda.pdf"
      confirmLabel="Delete"
      onConfirm={onConfirm}
      onCancel={onCancel}
      {...props}
    />,
    { container: appRoot },
  );

  return { ...view, appRoot, onConfirm, onCancel };
};

describe('ConfirmDialog', () => {
  it('exposes the dialog as an alertdialog named by its heading', () => {
    renderConfirmDialog();

    const dialog = screen.getByRole('alertdialog', {
      name: /confirm deletion/i,
    });
    expect(dialog).toBeTruthy();
    // The heading must supply the accessible name rather than an aria-label
    // override, so the visible text and the announced name stay identical.
    expect(
      within(dialog).getByRole('heading', { name: 'Confirm Deletion' }),
    ).toBeTruthy();
  });

  it('describes the dialog with the message and highlighted text', () => {
    renderConfirmDialog();

    const dialog = screen.getByRole('alertdialog');
    const describedById = dialog.getAttribute('aria-describedby');
    expect(describedById).toBeTruthy();

    const description = document.getElementById(describedById as string);
    expect(description?.textContent).toContain(
      'Are you sure you want to delete',
    );
    expect(description?.textContent).toContain('Board Agenda.pdf');
  });

  // react-modal fires onAfterOpen inside a requestAnimationFrame, so focus
  // lands a frame after render rather than synchronously.
  it('focuses the cancel button on open so a stray Enter does not confirm', async () => {
    renderConfirmDialog();

    await waitFor(() =>
      expect(document.activeElement).toBe(
        screen.getByRole('button', { name: 'Cancel' }),
      ),
    );
  });

  it('hides the app element from assistive tech while open', () => {
    const { appRoot } = renderConfirmDialog();

    expect(appRoot.getAttribute('aria-hidden')).toBe('true');
  });

  it('restores the app element and unlocks scrolling when unmounted', () => {
    const { appRoot, unmount } = renderConfirmDialog();

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(appRoot.getAttribute('aria-hidden')).toBeNull();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('cancels on Escape', () => {
    const { onCancel, onConfirm } = renderConfirmDialog();

    // react-modal's isEscKey checks event.code / keyCode, not event.key.
    fireEvent.keyDown(screen.getByRole('alertdialog'), {
      code: 'Escape',
      keyCode: 27,
    });

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('confirms only when the confirm button is pressed', () => {
    const { onConfirm, onCancel } = renderConfirmDialog();

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('cancels when the cancel button is pressed', () => {
    const { onCancel, onConfirm } = renderConfirmDialog();

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('labels the confirm action with the caller-supplied label', () => {
    renderConfirmDialog({ confirmLabel: 'Archive', title: 'Confirm Archival' });

    expect(screen.getByRole('button', { name: 'Archive' })).toBeTruthy();
    expect(
      screen.getByRole('alertdialog', { name: /confirm archival/i }),
    ).toBeTruthy();
  });

  it('omits the highlighted text block when none is given', () => {
    renderConfirmDialog({ highlightedText: undefined });

    expect(screen.queryByText('Board Agenda.pdf')).toBeNull();
  });

  it('does not append empty parentheses to the heading', () => {
    renderConfirmDialog();

    expect(
      screen.getByRole('heading', { name: 'Confirm Deletion' }).textContent,
    ).toBe('Confirm Deletion');
  });
});
