/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import { createStore, Provider, useAtomValue } from 'jotai';
import { eventListState, eventListStatusState } from 'atoms';
import { EventsLoader } from 'modules/EventsLoader';

/* Fixed far-past and far-future dates so the "not ended yet" cut in
   sortUpcomingEvents gives the same answer on every run without mocking the
   clock. The future events are listed out of order on purpose. */
const feedXml = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
  <channel>
    <item>
      <eventId>later</eventId>
      <title>Later Workshop</title>
      <eventStartDateTime>2099-03-02T10:00:00.0000000-08:00</eventStartDateTime>
      <eventEndDateTime>2099-03-02T11:00:00.0000000-08:00</eventEndDateTime>
    </item>
    <item>
      <eventId>ended</eventId>
      <title>Ended Mixer</title>
      <eventStartDateTime>2000-01-01T10:00:00.0000000-08:00</eventStartDateTime>
      <eventEndDateTime>2000-01-01T11:00:00.0000000-08:00</eventEndDateTime>
    </item>
    <item>
      <eventId>sooner</eventId>
      <title>Sooner Open House</title>
      <eventStartDateTime>2099-03-01T10:00:00.0000000-08:00</eventStartDateTime>
      <eventEndDateTime>2099-03-01T11:00:00.0000000-08:00</eventEndDateTime>
    </item>
  </channel>
</rss>`;

const emptyFeedXml = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0"><channel></channel></rss>`;

/* Stands in for the pages that read the feed: everything they show is derived
   from these two atoms. */
const EventsReader = () => {
  const events = useAtomValue(eventListState);
  const status = useAtomValue(eventListStatusState);
  return (
    <>
      <p data-testid="status">{status}</p>
      <ol>
        {events.map((event) => (
          <li key={event.eventId}>{event.title}</li>
        ))}
      </ol>
    </>
  );
};

const renderLoader = () =>
  render(
    <Provider store={createStore()}>
      <EventsLoader />
      <EventsReader />
    </Provider>,
  );

const mockFetch = (response: Partial<Response> | Error) => {
  global.fetch = (
    response instanceof Error
      ? jest.fn().mockRejectedValue(response)
      : jest.fn().mockResolvedValue(response)
  ) as jest.Mock;
};

describe('EventsLoader', () => {
  it('starts out unresolved, before the feed answers', () => {
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;
    renderLoader();
    expect(screen.getByTestId('status').textContent).toBe('undefined');
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('hands readers the upcoming events, ended ones dropped, soonest first', async () => {
    mockFetch({ ok: true, text: async () => feedXml });
    renderLoader();

    await waitFor(() =>
      expect(screen.getByTestId('status').textContent).toBe('success'),
    );
    await waitFor(() =>
      expect(
        screen.getAllByRole('listitem').map((item) => item.textContent),
      ).toEqual(['Sooner Open House', 'Later Workshop']),
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  /* An empty feed is a successful answer, not a failure — the pages show
     their "no events" state rather than an error. */
  it('settles on success with no events when the feed is empty', async () => {
    mockFetch({ ok: true, text: async () => emptyFeedXml });
    renderLoader();

    await waitFor(() =>
      expect(screen.getByTestId('status').textContent).toBe('success'),
    );
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('settles on failed when the feed answers with an error status', async () => {
    mockFetch({ ok: false, status: 502 });
    renderLoader();

    await waitFor(() =>
      expect(screen.getByTestId('status').textContent).toBe('failed'),
    );
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('settles on failed when the request itself throws', async () => {
    mockFetch(new TypeError('Failed to fetch'));
    renderLoader();

    await waitFor(() =>
      expect(screen.getByTestId('status').textContent).toBe('failed'),
    );
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
