import { SESSION_ROUTE_PREFIXES, usesAuthSession } from 'utils/authRoutes';

describe('usesAuthSession', () => {
  it('matches every gated area at its root', () => {
    expect(usesAuthSession('/backoffice')).toBe(true);
    expect(usesAuthSession('/graffix/backoffice')).toBe(true);
    expect(usesAuthSession('/_edit')).toBe(true);
  });

  it('matches nested routes inside a gated area', () => {
    expect(usesAuthSession('/backoffice/signin')).toBe(true);
    expect(usesAuthSession('/backoffice/access-management')).toBe(true);
    expect(usesAuthSession('/backoffice/graffix-requests')).toBe(true);
    expect(usesAuthSession('/graffix/backoffice/[id]')).toBe(true);
    expect(usesAuthSession('/_edit/[slug]')).toBe(true);
  });

  /* The whole point of the flag: these must not pull a session, because that
     request is what sets NextAuth's cookies on an ordinary visitor. */
  it('does not match public routes', () => {
    [
      '/',
      '/contact',
      '/search',
      '/events',
      '/about',
      '/ccc/gsrc',
      '/recreation',
      '/save-the-u',
      '/ccc/cultural-grads/[id]',
    ].forEach((pathname) => {
      expect(usesAuthSession(pathname)).toBe(false);
    });
  });

  /* A prefix match alone would treat a public page whose name merely begins
     with a gated one as authenticated, and quietly start setting cookies on it. */
  it('only matches on a segment boundary', () => {
    expect(usesAuthSession('/backoffice-policy')).toBe(false);
    expect(usesAuthSession('/backofficelike')).toBe(false);
    expect(usesAuthSession('/_editorial')).toBe(false);
    expect(usesAuthSession('/graffix/backoffice-archive')).toBe(false);
  });

  it('does not match a gated name appearing deeper in a path', () => {
    expect(usesAuthSession('/about/backoffice')).toBe(false);
    expect(usesAuthSession('/csi/_edit')).toBe(false);
  });

  it('handles the root and empty pathnames', () => {
    expect(usesAuthSession('/')).toBe(false);
    expect(usesAuthSession('')).toBe(false);
  });

  /* Guards the duplication against src/middleware.ts: Next requires that
     matcher to be a static literal, so drift is caught here rather than by a
     staff member finding themselves signed out. */
  it('covers exactly the areas the middleware gates', () => {
    expect([...SESSION_ROUTE_PREFIXES].sort()).toEqual(
      ['/_edit', '/backoffice', '/graffix/backoffice'].sort(),
    );
  });
});
