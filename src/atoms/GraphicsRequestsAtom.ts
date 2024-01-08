import { atom } from 'recoil';

export const graphicsRequestListState = atom<any[]>({
  key: 'RequestList',
  default: [],
});
