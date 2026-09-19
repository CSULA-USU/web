/**
 * Route prefixes whose pages read an authenticated session.
 *
 * Deliberately duplicated from the `matcher` in `src/middleware.ts` rather than
 * shared: Next.js requires that matcher to be a statically analyzable literal,
 * so it cannot import this. The two lists must be changed together — a route
 * gated there but missing here renders as permanently signed out, and one added
 * here but not there is unprotected.
 */
export const SESSION_ROUTE_PREFIXES = [
  '/backoffice',
  '/graffix/backoffice',
  '/_edit',
] as const;

/**
 * Whether a pathname belongs to the authenticated area.
 *
 * Matches a prefix only at a segment boundary, so a hypothetical public route
 * such as `/backoffice-policy` is not treated as authenticated and does not
 * start pulling a session on a page that has no business doing so.
 */
export const usesAuthSession = (pathname: string): boolean =>
  SESSION_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
