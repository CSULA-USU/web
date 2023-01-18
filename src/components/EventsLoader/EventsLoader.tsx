import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fetchEvents } from 'api';
import { PresenceEvent } from 'types';
import { eventListState } from 'atoms';
import { USU_ORGS } from 'utils/constants';

export const EventsLoader = () => {
  const [_, setEvents] = useRecoilState(eventListState);

  const getEvents = async () => {
    const data: PresenceEvent[] = await fetchEvents();
    const sortedData = data
      .filter(
        (event) =>
          new Date().getTime() < new Date(event.endDateTimeUtc).getTime() &&
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

  useEffect(() => {
    getEvents();
  });

  return <></>;
};
