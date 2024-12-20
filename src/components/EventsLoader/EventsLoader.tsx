import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fetchEvents, fetchRequests } from 'api';
import { PresenceEvent } from 'types';
import {
  eventListState,
  eventListStatusState,
  graphicsRequestListState,
} from 'atoms';
import { USU_ORGS } from 'utils/constants';

export const EventsLoader = () => {
  const [_, setEvents] = useRecoilState(eventListState);
  const [_eventsStatus, setEventsStatus] = useRecoilState(eventListStatusState);
  const [_graphicRequests, setGraphicsRequests] = useRecoilState(
    graphicsRequestListState,
  );

  const getEvents = async () => {
    const data: PresenceEvent[] = await fetchEvents(setEventsStatus);
    const sortedData = data
      .filter(
        (event) =>
          new Date().getTime() + 1 <
            new Date(event.startDateTimeUtc).getTime() &&
          USU_ORGS.includes(event.organizationName),
      )
      .sort((a, b) => {
        return (
          new Date(a.startDateTimeUtc).getTime() -
          new Date(b.startDateTimeUtc).getTime()
        );
      });
    setEvents(sortedData);
  };

  const getGraphicsRequests = async () => {
    const requestData: any = await fetchRequests();
    setGraphicsRequests(requestData);
  };

  useEffect(() => {
    getEvents();
    getGraphicsRequests();
  }, []); // eslint-disable-line

  return <></>;
};
