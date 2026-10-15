/**
 * @jest-environment jsdom
 */
jest.mock('context/ToastContext', () => ({
  useToast: () => ({ showToast: jest.fn() }),
}));

import { fireEvent, render, screen } from '@testing-library/react';
import { DocumentModal } from 'modules/Backoffice/DocumentModal';
import type { Document } from 'types/Backoffice';

const renderModal = (document: Document | null = null) => {
  const onSubmit = jest.fn();
  render(
    <DocumentModal
      document={document}
      initialCategory="Agenda"
      onClose={jest.fn()}
      onSubmit={onSubmit}
    />,
  );
  return { onSubmit };
};

const fillRequiredFields = () => {
  fireEvent.change(screen.getByLabelText(/Document Title/), {
    target: { value: 'Board of Directors April 24, 2026' },
  });
  fireEvent.change(screen.getByLabelText(/Link URL/), {
    target: { value: 'https://example.com/agenda.pdf' },
  });
  fireEvent.change(screen.getByLabelText(/Meeting Date/), {
    target: { value: '2026-04-24' },
  });
};

const archiveCheckbox = () =>
  screen.queryByRole('checkbox', {
    name: 'Add straight to the archives',
  }) as HTMLInputElement | null;

describe('DocumentModal archive checkbox', () => {
  it('starts unchecked and submits a live document by default', () => {
    const { onSubmit } = renderModal();
    expect(archiveCheckbox()?.checked).toBe(false);

    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: 'Add Document' }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ is_archived: false }),
    );
  });

  it('submits straight to the archives and names the fiscal year when checked', () => {
    const { onSubmit } = renderModal();
    fillRequiredFields();
    fireEvent.click(archiveCheckbox()!);

    expect(
      screen.getByText('Files under FY 25-26 on the public archive page.'),
    ).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Add to Archives' }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ is_archived: true, date: '2026-04-24' }),
    );
  });

  it('is not offered when editing an existing document', () => {
    renderModal({
      id: 'doc-1',
      title: 'Board of Directors September 11, 2026',
      url: 'https://example.com/agenda.pdf',
      category: 'Agenda',
      date: '2026-09-11',
      is_archived: false,
      is_download_all: false,
    });
    expect(archiveCheckbox()).toBeNull();
  });
});
