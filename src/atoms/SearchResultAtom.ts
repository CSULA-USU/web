import { atom } from 'recoil';

export interface SearchResult {
  title: string;
  url: string;
  description: string;
  tags: string[];
}

export const searchResultState = atom({
  key: 'SearchResultList',
  default: [] as SearchResult[],
});
