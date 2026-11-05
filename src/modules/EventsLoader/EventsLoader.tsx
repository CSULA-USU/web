import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { fetchEvents, sortUpcomingEvents } from 'services';
import { CampusGroupsEvent } from 'types';
import { eventListState, eventListStatusState } from 'atoms';

export const EventsLoader = () => {
  const setEvents = useSetAtom(eventListState);
  const setEventsStatus = useSetAtom(eventListStatusState);

  const getEvents = async () => {
    const data: CampusGroupsEvent[] = await fetchEvents(setEventsStatus);
    setEvents(sortUpcomingEvents(data));
  };

  useEffect(() => {
    getEvents();
  }, []); // eslint-disable-line

  return <></>;
};
