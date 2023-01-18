import { atom } from 'recoil';
import { PresenceEvent } from 'types';

export const eventListState = atom({
  key: 'EventList',
  default: [] as PresenceEvent[],
});
