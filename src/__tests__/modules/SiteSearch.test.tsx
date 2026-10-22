/**
 * @jest-environment jsdom
 */
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}));

import { act, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { SiteSearch } from 'modules/SiteSearch/SiteSearch';

const entries = [
  {
    url: '/recreation',
    title: 'Recreation',
    description: 'The fitness center.',
    tags: ['gym'],
    names: ['recreation'],
  },
  {
    url: '/recreation/game-room',
    title: 'Game Room',
    description: 'Pool and consoles, run by Recreation.',
    tags: [],
    names: ['game room'],
  },
];

beforeAll(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(entries),
  }) as unknown as typeof fetch;
});

const Harness = ({ onResultOpen }: { onResultOpen?: () => void }) => {
  const [query, setQuery] = useState('');
  return (
    <SiteSearch
      query={query}
      onQueryChange={setQuery}
      onResultOpen={onResultOpen}
    />
  );
};

const typeQuery = async (query: string) => {
  const field = screen.getByRole('searchbox', { name: 'Search the U-SU' });
  // Lets the index fetch and the dynamic import settle before typing.
  await act(async () => {});
  fireEvent.change(field, { target: { value: query } });
  return field;
};

describe('SiteSearch', () => {
  beforeEach(() => mockPush.mockClear());

  it('lists matching pages as links and announces how many', async () => {
    render(<Harness />);
    await typeQuery('recreation');

    expect(
      screen.getAllByRole('link').map((link) => link.getAttribute('href')),
    ).toEqual(['/recreation', '/recreation/game-room']);
    expect(screen.getByRole('status').textContent).toBe('2 results');
  });

  it('says so when nothing matches', async () => {
    render(<Harness />);
    await typeQuery('zzzzqqq');

    expect(screen.queryAllByRole('link')).toEqual([]);
    expect(screen.getByRole('status').textContent).toBe(
      'No results for “zzzzqqq”.',
    );
  });

  it('moves focus between the field and results with the arrow keys', async () => {
    render(<Harness />);
    const field = await typeQuery('recreation');
    const [first, second] = screen.getAllByRole('link');

    fireEvent.keyDown(field, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(first);

    fireEvent.keyDown(first, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(second);

    fireEvent.keyDown(second, { key: 'ArrowUp' });
    fireEvent.keyDown(first, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(field);
  });

  it('opens the top result on Enter', async () => {
    const onResultOpen = jest.fn();
    render(<Harness onResultOpen={onResultOpen} />);
    const field = await typeQuery('gym');

    fireEvent.submit(field.closest('form') as HTMLFormElement);

    expect(mockPush).toHaveBeenCalledWith('/recreation');
    expect(onResultOpen).toHaveBeenCalled();
  });
});
