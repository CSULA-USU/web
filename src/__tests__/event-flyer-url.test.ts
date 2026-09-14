import { getEventFlyerUrl } from 'utils/eventUtils';
import { CampusGroupsEvent } from 'types';

/* The two URLs the feed carries for one event: the coordinator's upload, and
   CampusGroups' 2:1 crop of that same upload. */
const FLYER_URL = 'https://calstatela.campusgroups.com/upload/flyer.png';
const COVER_URL = 'https://calstatela.campusgroups.com/upload/cover.png';

const buildEvent = (
  eventOriginalFlyerFullUrl: string,
  eventOriginalPhotoFullUrl: string,
): CampusGroupsEvent =>
  ({
    eventId: '375783',
    title: 'Strong Start',
    eventOriginalFlyerFullUrl,
    eventOriginalPhotoFullUrl,
  } as CampusGroupsEvent);

describe('getEventFlyerUrl', () => {
  it('prefers the uncropped flyer over the platform cover', () => {
    expect(getEventFlyerUrl(buildEvent(FLYER_URL, COVER_URL))).toBe(FLYER_URL);
  });

  it('falls back to the cover when no flyer was uploaded', () => {
    expect(getEventFlyerUrl(buildEvent('', COVER_URL))).toBe(COVER_URL);
  });

  /* Both empty is the case that decides whether the card renders an image
     element at all, so it has to come back falsy rather than undefined. */
  it('returns an empty string when the event carries neither', () => {
    expect(getEventFlyerUrl(buildEvent('', ''))).toBe('');
  });
});
