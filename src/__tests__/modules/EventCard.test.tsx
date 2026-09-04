/**
 * @jest-environment jsdom
 */
// The `components` barrel transitively reaches lib/supabase, which throws at
// import time without env vars. Stubbing it keeps this a pure UI test.
jest.mock('lib/supabase', () => ({ supabase: {} }));
// The barrels also reach Nav, whose drawer library ships ESM that ts-jest will
// not parse. Nothing here renders it.
jest.mock('@accessible/drawer', () => ({}));

import { fireEvent, render, screen } from '@testing-library/react';
import { EventCard } from 'modules/EventCard';
import { clampFrameAspect } from 'modules/EventCard/ModEventCard';
import { formatEventLocation } from 'utils/eventUtils';
import { shouldCropFlyer } from 'modules/EventCard/SplitEventCard';
import { CampusGroupsEvent } from 'types';

const cultureFest = {
  eventId: 'live-1',
  eventUid: 'uid-live-1',
  groupId: '35630',
  group: 'Cross Cultural Centers',
  groupAcronym: 'CCC',
  title: 'Culture Fest',
  description: '',
  eventStartDateTime: '2026-09-08T12:00:00-07:00',
  eventEndDateTime: '2026-09-08T15:00:00-07:00',
  eventDate: '',
  eventTime: '',
  eventEndTime: '',
  eventLocation: 'U-SU Plaza, 5154 State University Drive',
  locationType: 'On-Campus',
  eventType: 'Cultural',
  eventLink: '',
  eventOriginalPhotoFullUrl: '',
  eventPhotoAltText: '',
  iCalLink: '',
  allDayEvent: '0',
  approvalStatus: '1',
  timeZoneId: 'Pacific Standard Time',
} as CampusGroupsEvent;

describe('EventCard', () => {
  it('exposes the event through one control named after it', () => {
    /* The card used to be a div with an onClick, which no keyboard could reach
       and no screen reader announced. */
    render(<EventCard event={cultureFest} onClick={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Culture Fest' })).toBeTruthy();
  });

  it('opens the event when that control is activated', () => {
    const onClick = jest.fn();
    render(<EventCard event={cultureFest} onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Culture Fest' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not offer Learn More as a second stop to the same place', () => {
    render(<EventCard featured event={cultureFest} onClick={jest.fn()} />);

    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.queryByRole('button', { name: 'Learn More' })).toBeNull();
  });
});

describe('clampFrameAspect', () => {
  it('lets a 2:1 cover through untouched, so it fills the frame exactly', () => {
    /* 760x380 — what all but a couple of the feed's images are. */
    expect(clampFrameAspect(2)).toBe(2);
  });

  it('holds a portrait flyer at the floor rather than making a column', () => {
    expect(clampFrameAspect(1080 / 1350)).toBe(1.5);
  });

  it('holds a 6:1 banner at the ceiling rather than leaving a ribbon', () => {
    expect(clampFrameAspect(1200 / 210)).toBe(3);
  });

  it('falls back while the image is still measuring', () => {
    expect(clampFrameAspect(null)).toBe(2);
  });

  it('ignores the image entirely when a tab strip has locked the frame', () => {
    expect(clampFrameAspect(1080 / 1350, true)).toBe(2);
    expect(clampFrameAspect(1200 / 210, true)).toBe(2);
  });
});

describe('formatEventLocation', () => {
  /* The mobile branch of ModEventCard once rendered the raw feed string, so a
     phone got the full postal address where desktop got the room. */
  it('keeps the room and drops the street address behind it', () => {
    expect(
      formatEventLocation(
        'U-SU Alhambra Room , 5154 State University Drive, Los Angeles, CA 90032, United States',
      ),
    ).toBe('U-SU Alhambra Room ');
  });

  it('leaves a location that carries no address alone', () => {
    expect(formatEventLocation('U-SU Plaza')).toBe('U-SU Plaza');
  });
});

describe('shouldCropFlyer', () => {
  it('contains a 2:1 cover, which is nearly every flyer in the feed', () => {
    expect(shouldCropFlyer(760, 380)).toBe(false);
  });

  it('contains a square and a portrait, where a crop would cut the flyer', () => {
    expect(shouldCropFlyer(1080, 1080)).toBe(false);
    expect(shouldCropFlyer(1080, 1350)).toBe(false);
  });

  it('crops the 5.71:1 banner, which would otherwise be a third of the box', () => {
    /* 11 of the feed's 117 images are exactly this. */
    expect(shouldCropFlyer(1200, 210)).toBe(true);
  });

  it('contains rather than crops when the image never reported a size', () => {
    expect(shouldCropFlyer(0, 0)).toBe(false);
  });
});
