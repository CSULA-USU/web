import { atom } from 'jotai';
import { CampusGroupsEvent } from 'types';

export type StatusType = 'undefined' | 'success' | 'failed';

export const eventListState = atom<CampusGroupsEvent[]>([]);

export const eventListStatusState = atom<StatusType>('undefined');
