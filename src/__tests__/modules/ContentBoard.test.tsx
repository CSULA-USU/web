/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { ContentBoard } from 'modules/ContentBoard/ContentBoard';
import type { ContentBoardColumnProps } from 'modules/ContentBoard/ContentBoardTypes';
import type { GraffixRequest } from 'types';

const requests: Record<string, GraffixRequest> = {
  a: {
    id: 'a',
    title: 'Spring Flyer',
    departmentID: 'csi',
    status: 'Not Started',
    requestorName: 'Requester A',
    eventDate: '2026-04-24',
  },
  b: {
    id: 'b',
    title: 'Welcome Banner',
    departmentID: 'csi',
    status: 'Not Started',
  },
  c: {
    id: 'c',
    title: 'Fall Flyer',
    departmentID: 'csi',
    status: 'Complete',
  },
};

const columns: ContentBoardColumnProps[] = [
  {
    color: 'grey',
    columnTitle: 'Not Started',
    columnData: [
      { cellID: 'a', cellTitle: 'Spring Flyer' },
      { cellID: 'b', cellTitle: 'Welcome Banner' },
    ],
  },
  {
    color: 'green',
    columnTitle: 'Complete',
    columnData: [{ cellID: 'c', cellTitle: 'Fall Flyer' }],
    startsCollapsed: true,
  },
];

const renderBoard = () =>
  render(
    <ContentBoard
      columns={columns}
      cellMap={requests}
      selectedDepartment="csi"
      setSelectedDepartment={jest.fn()}
      accessibleDepartment="all"
    />,
  );

const toggle = (status: string) =>
  screen.getByRole('button', { name: new RegExp(`^${status} \\d+ requests$`) });

describe('ContentBoard', () => {
  it('opens active statuses and keeps collapsed ones unrendered', () => {
    renderBoard();
    expect(toggle('Not Started').getAttribute('aria-expanded')).toBe('true');
    expect(
      screen.getAllByRole('button', { name: 'Spring Flyer' }).length,
    ).toBeGreaterThan(0);

    expect(toggle('Complete').getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('button', { name: 'Fall Flyer' })).toBeNull();
  });

  it('renders a collapsed section only once it is opened', () => {
    renderBoard();
    fireEvent.click(toggle('Complete'));
    expect(toggle('Complete').getAttribute('aria-expanded')).toBe('true');
    expect(
      screen.getAllByRole('button', { name: 'Fall Flyer' }).length,
    ).toBeGreaterThan(0);
  });

  it('narrows counts by title search without opening closed sections', () => {
    renderBoard();
    fireEvent.change(screen.getByLabelText('Search titles'), {
      target: { value: 'flyer' },
    });
    expect(within(toggle('Not Started')).getByText('1')).toBeTruthy();
    expect(within(toggle('Complete')).getByText('1')).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Welcome Banner' })).toBeNull();
    expect(toggle('Complete').getAttribute('aria-expanded')).toBe('false');
  });

  it('opens a request in the detail panel and closes it with Escape', () => {
    renderBoard();
    fireEvent.click(screen.getAllByRole('button', { name: 'Spring Flyer' })[0]);
    const dialog = screen.getByRole('dialog', { name: 'Spring Flyer' });
    expect(within(dialog).getByText('Requester A')).toBeTruthy();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('shows a labeled Department picker', () => {
    render(
      <ContentBoard
        columns={columns}
        cellMap={requests}
        selectedDepartment="csi"
        setSelectedDepartment={jest.fn()}
        accessibleDepartment="csi"
      />,
    );
    expect(screen.getByRole('combobox', { name: 'Department' })).toBeTruthy();
  });
});
