import { atom } from 'recoil';
import { CampusGroupsEvent } from 'types';

export type StatusType = 'undefined' | 'success' | 'failed';

export const eventListState = atom<CampusGroupsEvent[]>({
  key: 'EventList',
  default: [],
});

export const eventListStatusState = atom<StatusType>({
  key: 'EventListStatus',
  default: 'undefined',
});
