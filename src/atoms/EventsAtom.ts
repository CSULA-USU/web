import { atom } from 'recoil';
import { PresenceEvent } from 'types';

export const eventListState = atom<PresenceEvent[]>({
  key: 'EventList',
  default: [],
});
