import { atom } from 'recoil';
import { PresenceEvent } from 'types';

export type StatusType = 'undefined' | 'success' | 'failed';

export const eventListState = atom<PresenceEvent[]>({
  key: 'EventList',
  default: [],
});

export const eventListStatusState = atom<StatusType>({
  key: 'EventListStatus',
  default: 'undefined',
});
