import { atom } from 'recoil';
import { SupaPage } from 'types';

export const editorPageState = atom<SupaPage | undefined>({
  key: 'EditorPageState',
  default: undefined,
});
