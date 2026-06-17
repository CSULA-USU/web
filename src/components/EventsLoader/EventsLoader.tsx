import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fetchEvents } from 'services';
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
    const sortedData = data
      .filter(
        (event) =>
          new Date().getTime() < new Date(event.eventStartDateTime).getTime(),
      )
      .sort(
        (a, b) =>
          new Date(a.eventStartDateTime).getTime() -
          new Date(b.eventStartDateTime).getTime(),
      );
    setEvents(sortedData);
  };

  useEffect(() => {
    getEvents();
  }, []); // eslint-disable-line

  return <></>;
};
