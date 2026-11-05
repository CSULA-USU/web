import { atom } from 'jotai';
import { SupaPage } from 'types';

export const editorPageState = atom<SupaPage | undefined>(undefined);
