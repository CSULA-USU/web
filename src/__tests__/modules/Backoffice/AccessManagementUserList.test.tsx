/**
 * @jest-environment jsdom
 */
// The components barrel transitively reaches lib/supabase, which throws at
// import time without env vars.
jest.mock('lib/supabase', () => ({ supabase: {} }));

import { fireEvent, render, screen, within } from '@testing-library/react';
import { AccessManagementUserList } from 'modules/Backoffice/AccessManagement/AccessManagementUserList';
import type { V2UserRow } from 'modules/Backoffice/AccessManagement';
import type { TableData } from 'types';

// jsdom evaluates no media queries, so the list's base `display: none` always
// applies. Queries into it have to include hidden elements, and match on text
// rather than accessible name, which is always empty for a hidden element.
const hidden = true;

const user = (id: number, email: string): V2UserRow => ({
  id,
  email,
  is_active: true,
  deactivated_at: null,
  deactivated_by: null,
  department: null,
  roles: [],
  policies: [],
});

const tableData = (users: V2UserRow[]): TableData<V2UserRow> => ({
  id: 'users',
  ariaLabel: 'Backoffice users',
  caption: 'Users',
  headerColors: { backgroundColor: 'greyLightest', textColor: 'black' },
  columns: [
    {
      id: 'email',
      label: 'Email',
      backgroundColor: 'white',
      textColor: 'black',
    },
    {
      id: 'actions',
      label: 'Actions',
      backgroundColor: 'white',
      textColor: 'black',
      render: (row) => (
        <button type="button">Edit {row.original?.email}</button>
      ),
    },
  ],
  rows: users.map((u) => ({
    id: String(u.id),
    values: { email: u.email },
    original: u,
  })),
});

const users = [
  user(1, 'adoe@calstatela.edu'),
  user(2, 'bsmith@calstatela.edu'),
  user(3, 'clee@calstatela.edu'),
];

// The desktop table is a region with the same name; CSS shows one or the
// other, never both, so the list is the region without a table in it.
const renderList = () => {
  render(<AccessManagementUserList data={tableData(users)} emptyMessage="" />);
  const list = screen
    .getAllByRole('region', { hidden })
    .find(
      (region) =>
        region.getAttribute('aria-label') === 'Backoffice users' &&
        !region.querySelector('table'),
    );
  if (!list) throw new Error('Grouped list did not render.');
  return list;
};

describe('AccessManagementUserList', () => {
  it('groups users under one heading per first letter', () => {
    const region = renderList();

    const groupHeadings = within(region)
      .getAllByRole('heading', { level: 2, hidden })
      .map((heading) => heading.textContent);
    expect(groupHeadings).toEqual(['A1 users', 'B1 users', 'C1 users']);
  });

  it('names each row by the part of the email before the @', () => {
    const region = renderList();

    const names = within(region)
      .getAllByRole('heading', { level: 3, hidden })
      .map((heading) => heading.textContent);
    expect(names).toEqual(['adoe', 'bsmith', 'clee']);
  });

  it('keeps details collapsed until the name is opened', () => {
    const region = renderList();

    const buttonWithText = (text: string) =>
      within(region)
        .getAllByRole('button', { hidden })
        .find((button) => button.textContent === text);

    const trigger = buttonWithText('adoe');
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(trigger!);
    expect(trigger?.getAttribute('aria-expanded')).toBe('true');
    expect(buttonWithText('Edit adoe@calstatela.edu')).toBeTruthy();
  });

  it('links each letter in use to its section, and no others', () => {
    const region = renderList();

    const links = within(region).getAllByRole('link', { hidden });
    expect(links.map((link) => link.textContent)).toEqual(['A', 'B', 'C']);
    links.forEach((link) => {
      const target = link.getAttribute('href')!.slice(1);
      expect(region.querySelector(`#${target}`)).not.toBeNull();
    });
  });

  it('shows the empty message instead of an empty table', () => {
    render(
      <AccessManagementUserList
        data={tableData([])}
        emptyMessage="No matches."
      />,
    );

    expect(screen.getByText('No matches.')).toBeTruthy();
    expect(screen.queryByRole('table', { hidden })).toBeNull();
  });
});
