import { atom } from 'recoil';
import Fuse from 'fuse.js';

export interface SearchResult {
  title: string;
  url: string;
  description: string;
  tags: string[];
}

export const searchResultState = atom({
  key: 'SearchResultList',
  default: [] as
    | SearchResult[]
    | Fuse.FuseResult<{
        title: string;
        url: string;
        description: string;
        tags: string[];
      }>[],
});
