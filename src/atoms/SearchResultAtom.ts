import { atom } from 'recoil';
import Fuse from 'fuse.js';

export interface SearchResult {
  title: string;
  url: string;
  description: string;
  tags: string[];
}

export type ResultsType = Fuse.FuseResult<SearchResult>;

export const searchResultState = atom<ResultsType[]>({
  key: 'SearchResultList',
  default: [],
});
