export type CampusGroupsEvent = {
  eventId: string;
  eventUid: string;
  groupId: string;
  group: string;
  groupAcronym: string;
  title: string;
  description: string;
  eventStartDateTime: string;
  eventEndDateTime: string;
  eventDate: string;
  eventTime: string;
  eventEndTime: string;
  eventLocation: string;
  locationType: string;
  eventType: string;
  eventLink: string;
  /**
   * CampusGroups' own 2:1 crop of whatever the coordinator uploaded, not a
   * second size of it. It crops to fill, so a square flyer comes back with its
   * top and bottom cut away — see `getEventFlyerUrl`, which prefers
   * `eventOriginalFlyerFullUrl` and keeps this as the fallback.
   */
  eventOriginalPhotoFullUrl: string;
  /** The upload itself, uncropped. Empty on events that have no flyer. */
  eventOriginalFlyerFullUrl: string;
  eventPhotoAltText: string;
  iCalLink: string;
  allDayEvent: string;
  approvalStatus: string;
  timeZoneId: string;

  /**
   * Every topic tag on the event, parsed from the feed's
   * `<eventTopicsSeparated>` children rather than its comma-joined
   * `<eventTopics>` twin, so a topic that ever contains a comma cannot split
   * into two bogus tags.
   *
   * Events carry several — a single LEAD Series workshop is tagged Leadership
   * Development, Food, Guest Speaker and Wingspan all at once — so this is how
   * a program page finds its own events. Distinct from `eventType`, which the
   * feed keeps single-valued and coarser.
   */
  eventTopics: string[];
};
