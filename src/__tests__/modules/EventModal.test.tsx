/**
 * @jest-environment jsdom
 */
// The `components` barrel transitively reaches lib/supabase, which throws at
// import time without env vars. Stubbing it keeps this a pure UI test.
jest.mock('lib/supabase', () => ({ supabase: {} }));
// The barrels also reach Nav, whose drawer library ships ESM that ts-jest will
// not parse. Nothing here renders it.
jest.mock('@accessible/drawer', () => ({}));

import { render, screen } from '@testing-library/react';
import { EventModal } from 'modules/EventModal';
import { CampusGroupsEvent } from 'types';

const leadSeries = {
  eventId: 'lead-1',
  group: 'Center for Student Involvement',
  title: 'LEAD Series - Stress Less for Success!',
  description: '<p>Join us.</p>',
  eventStartDateTime: '2026-09-08T13:00:00-07:00',
  eventEndDateTime: '2026-09-08T14:30:00-07:00',
  eventLocation: 'U-SU Alhambra Room, 5154 State University Drive',
  eventOriginalPhotoFullUrl: 'https://example.org/csi-cover-photo.jpg',
  eventPhotoAltText: 'csi cover photo',
  eventLink: '',
  eventTopics: ['Wingspan'],
} as CampusGroupsEvent;

describe('EventModal', () => {
  /* The flyer is decorative on purpose. CampusGroups serves the group's
     generic cover image whenever nobody uploaded a real flyer, and everything
     it could convey is already text in the modal — so naming it only made a
     screen reader repeat the title. This asserts the empty alt so the old
     alt={title} does not come back as a well-meaning "fix". */
  it('renders the flyer as decorative, with no accessible name', () => {
    render(<EventModal isOpen event={leadSeries} onRequestClose={jest.fn()} />);

    const flyer = document.querySelector(
      'img[src="https://example.org/csi-cover-photo.jpg"]',
    );
    expect(flyer).not.toBeNull();
    expect(flyer?.getAttribute('alt')).toBe('');
  });

  it('leaves no image named after the event', () => {
    render(<EventModal isOpen event={leadSeries} onRequestClose={jest.fn()} />);

    expect(screen.queryAllByRole('img', { name: /LEAD Series/ })).toHaveLength(
      0,
    );
    /* Nor named from the feed's own alt field, which is mostly boilerplate. */
    expect(
      screen.queryAllByRole('img', { name: /csi cover photo/i }),
    ).toHaveLength(0);
  });

  /* The information the flyer used to claim in its alt is all still here. */
  it('still carries the event details as text', () => {
    render(<EventModal isOpen event={leadSeries} onRequestClose={jest.fn()} />);

    expect(
      screen.getByRole('heading', {
        name: 'LEAD Series - Stress Less for Success!',
      }),
    ).toBeTruthy();
    expect(screen.getByText('Center for Student Involvement')).toBeTruthy();
    expect(screen.getByText('September 8, 2026')).toBeTruthy();
    expect(screen.getByText('U-SU Alhambra Room')).toBeTruthy();
  });
});
