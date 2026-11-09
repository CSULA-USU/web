/**
 * @jest-environment jsdom
 */
// The barrels _app reaches transitively pull in lib/supabase, which throws at
// import time without env vars, and Nav's drawer library, which ships ESM
// that ts-jest will not parse. Neither is exercised here.
jest.mock('lib/supabase', () => ({ supabase: {} }));
jest.mock('@accessible/drawer', () => ({}));
// next/font only works under the Next compiler, which Jest does not run.
jest.mock('next/font/google', () => {
  const font = () => ({
    style: { fontFamily: 'TestFont' },
    variable: 'test-font',
  });
  return { Bitter: font, Montserrat: font };
});
jest.mock('@vercel/analytics/react', () => ({ Analytics: () => null }));
jest.mock('@vercel/speed-insights/react', () => ({
  SpeedInsights: () => null,
}));

let mockPathname = '/';
jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: mockPathname }),
}));

import { render, screen, waitFor } from '@testing-library/react';
import type { JSX } from 'react';
import type { AppProps } from 'next/app';
import type { NextComponentType } from 'next';
import { useAtomValue } from 'jotai';
import { eventListState, eventListStatusState } from 'atoms';

const feedXml = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
  <channel>
    <item>
      <eventId>open-house</eventId>
      <title>Open House</title>
      <eventStartDateTime>2099-03-01T10:00:00.0000000-08:00</eventStartDateTime>
      <eventEndDateTime>2099-03-01T11:00:00.0000000-08:00</eventEndDateTime>
    </item>
  </channel>
</rss>`;

type Page = NextComponentType<any, any, any>;

/* Each page reports the shared event state under its own test id, so a test
   can tell which mount or route it is looking at. */
const probePage =
  (label: string): Page =>
  // eslint-disable-next-line react/display-name
  () => {
    const events = useAtomValue(eventListState);
    const status = useAtomValue(eventListStatusState);
    return (
      <p data-testid={label}>
        {`${status}:${events.map((event) => event.title).join(',')}`}
      </p>
    );
  };

const HomePage = probePage('home');
const EventsPage = probePage('events');
const BackofficePage = probePage('backoffice');

let App: (props: AppProps) => JSX.Element;

const appProps = (Component: Page): AppProps => ({
  Component,
  pageProps: {},
  router: {} as AppProps['router'],
});

const eventsFeedCalls = () =>
  (global.fetch as jest.Mock).mock.calls.filter(
    ([url]) => String(url) === '/api/events',
  );

/* Routes the two endpoints _app can reach. The session endpoint only answers
   on auth routes, where next-auth asks who is signed in. */
const mockFetch = (feedResponses: Partial<Response>[]) => {
  const queue = [...feedResponses];
  global.fetch = jest.fn((url: RequestInfo | URL) => {
    if (String(url) === '/api/events') {
      const response = queue.shift();
      if (!response) throw new Error('Feed requested more often than expected');
      return Promise.resolve(response);
    }
    if (String(url).includes('/api/auth/session')) {
      return Promise.resolve({ ok: true, json: async () => ({}) });
    }
    return Promise.reject(new Error(`Unexpected fetch: ${String(url)}`));
  }) as jest.Mock;
};

const feedOk = { ok: true, text: async () => feedXml };

beforeAll(() => {
  /* _app registers react-modal's app element at import time, and react-modal
     throws if the selector matches nothing — so the element has to exist
     before the module loads. */
  document.body.innerHTML = '<div id="__next"></div>';
  App = require('pages/_app').default;
});

beforeEach(() => {
  mockPathname = '/';
});

describe('_app state provider', () => {
  /* Client-side navigation re-renders App with a new Component. If the
     provider sat inside the page or were keyed by route, the store would be
     recreated, EventsLoader would remount and refetch, and the next page
     would briefly start from 'undefined'. */
  it('keeps event state across client-side navigation without refetching', async () => {
    mockFetch([feedOk]);
    const { rerender } = render(<App {...appProps(HomePage)} />);

    await waitFor(() =>
      expect(screen.getByTestId('home').textContent).toBe('success:Open House'),
    );

    mockPathname = '/events';
    rerender(<App {...appProps(EventsPage)} />);

    expect(screen.getByTestId('events').textContent).toBe('success:Open House');
    expect(eventsFeedCalls()).toHaveLength(1);
  });

  /* Crossing into an auth route changes SessionProvider's props, not its
     place in the tree, so the state provider below it stays mounted. */
  it('keeps event state across a public → backoffice → public round trip', async () => {
    mockFetch([feedOk]);
    const { rerender } = render(<App {...appProps(HomePage)} />);
    await waitFor(() =>
      expect(screen.getByTestId('home').textContent).toBe('success:Open House'),
    );

    mockPathname = '/backoffice';
    rerender(<App {...appProps(BackofficePage)} />);
    expect(screen.getByTestId('backoffice').textContent).toBe(
      'success:Open House',
    );

    mockPathname = '/events';
    rerender(<App {...appProps(EventsPage)} />);
    expect(screen.getByTestId('events').textContent).toBe('success:Open House');
    expect(eventsFeedCalls()).toHaveLength(1);
  });

  /* Two mounts stand in for two server requests. With Jotai's provider-less
     default store they would share one module-level store, and the second
     visitor's failed fetch would overwrite the first visitor's events. */
  it('gives separate app mounts separate state', async () => {
    mockFetch([feedOk, { ok: false, status: 502 }]);

    render(<App {...appProps(HomePage)} />);
    await waitFor(() =>
      expect(screen.getByTestId('home').textContent).toBe('success:Open House'),
    );

    render(<App {...appProps(EventsPage)} />);
    await waitFor(() =>
      expect(screen.getByTestId('events').textContent).toBe('failed:'),
    );

    expect(screen.getByTestId('home').textContent).toBe('success:Open House');
  });
});
