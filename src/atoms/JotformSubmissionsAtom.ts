import { atom } from 'recoil';

export const jotformSubmissionsListState = atom<any[]>({
  key: 'JotformSubmissions',
  default: [],
});
