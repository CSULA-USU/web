import { atom } from 'jotai';
import type { BackofficeUserData } from 'hooks/useBackofficeUser';

/**
 * The signed-in staff member's backoffice record and effective policies, from
 * /api/backoffice/me. It lives in an atom rather than component state so it
 * outlives a page change: every backoffice page renders its own
 * BackofficeShell, so component state was rebuilt, and /me refetched, on each
 * navigation, with the nav briefly unfiltered every time.
 *
 * `loaded` is false only until the first answer of the visit. After that,
 * refreshes replace `user` in place and never send it back to loading. Read
 * and refresh it through the hooks in hooks/useBackofficeUser, not directly.
 */
export const backofficeUserState = atom<{
  user: BackofficeUserData | null;
  loaded: boolean;
}>({ user: null, loaded: false });
