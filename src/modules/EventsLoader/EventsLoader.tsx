import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fetchEvents, sortUpcomingEvents } from 'services';
import { CampusGroupsEvent } from 'types';
import {
  eventListState,
  eventListStatusState,
  graphicsRequestListState,
} from 'atoms';

export const EventsLoader = () => {
  const [_, setEvents] = useRecoilState(eventListState);
  const [_eventsStatus, setEventsStatus] = useRecoilState(eventListStatusState);
  const [_graphicRequests, _setGraphicsRequests] = useRecoilState(
    graphicsRequestListState,
  );

  const getEvents = async () => {
    const data: CampusGroupsEvent[] = await fetchEvents(setEventsStatus);
    setEvents(sortUpcomingEvents(data));
  };

  useEffect(() => {
    getEvents();
  }, []); // eslint-disable-line

  return <></>;
};
