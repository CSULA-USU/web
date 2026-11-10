# Next.js 16 migration audit and plan

Audit date: October 28, 2026. Status: suitable for a staged migration; not yet validated on Next.js 16.

## React 19 progress (November 9, 2026)

React 19 followed the framework release in three steps, each merged separately so a regression points at one change:

1. React 18.2 to 18.3.1 (#1903). 18.3 adds warnings for every API React 19 removes; a source scan and the test suite found none in this codebase.
2. Libraries whose peer ranges stopped at React 18 (#1904): `@radix-ui/react-popover` ^1.3.1, `@radix-ui/react-select` ^2.4.1, `@testing-library/react` ^16.3.0 with `@testing-library/dom` ^10. Recoil had already been replaced with Jotai (#1899).
3. React, React DOM and `react-is` 19.3.1 with `@types/react` and `@types/react-dom` 19 on `feat/react-19`. Type check, lint (0 errors) and 561 tests pass with no React warnings, and a server render through `ServerStyleSheet` (the path `_document.tsx` uses) collects every style. The mobile menu moved from `@accessible/drawer` (unpublished since 2022) to Radix Dialog: the old library read `element.ref`, which React 19 warns about and a later release removes.

styled-components stays on 5 for now. Its runtime works on React 19, but `@types/styled-components` 5 reads element props through the global `JSX` namespace that `@types/react` 19 removed; `src/types/styled-components-jsx.d.ts` restores it and is deleted on the move to styled-components 6. Still open: preview validation (hydration, initial styles, Azure sign-in).

## Progress (October 30, 2026)

Upgraded on `feat/upgrade-next16` to Next.js 16.4.3. Type check, lint (0 errors), 522 tests, a local `next build --webpack`, and a local `next start` smoke test pass. Preview validation against the acceptance matrix below is still open.

Decisions that change the plan below:

- **No 15.x checkpoint.** 15 left Maintenance LTS on October 21, 2026. If a regression needs bisecting, install 15.5.x locally; nothing ships on 15.
- **Webpack for the first release.** Scripts pass `--webpack`; `next.config.js` records what switching to Turbopack involves.
- **ESLint 9, not 10.** eslint-config-next bundles jsx-a11y, react and import plugins that do not yet declare ESLint 10 support. ESLint 9 reports as unsupported upstream; revisit when those plugins catch up.
- **React Compiler lint rules warn.** eslint-plugin-react-hooks 7 enables five rules as errors that flag about 60 existing sites. They warn in `eslint.config.mjs` until refactored separately.
- **`middleware.ts` became `proxy.ts` in this release** (item 4, commit `5afa55a0`), rather than in its own PR as first planned. The auth guard now runs on Node, not Edge.
- **Next 16 warns that React 18 support is deprecated** and ends in Next 17. Replacing Recoil, the blocker for React 19, now has a deadline.

Still to verify on a preview: Azure sign-in end to end through the new proxy, and any `www.dropbox.com` image served through `next/image`, directly or via a component that uses it internally such as `FluidContainer`'s `backgroundImage`. Dropbox redirects to a host outside `remotePatterns`, and the optimizer now follows at most 3 redirects. The Dropbox URLs hard-coded in `src/` are unaffected: they are document links, and the cultural-grads banners render through the plain-`<img>` `Image` component. Only a Dropbox URL arriving from runtime data could still hit the limit.

## Recommendation

Upgrade the framework while retaining Pages Router, React 18, styled-components 5, NextAuth 4, and Webpack for the first release. Treat React 19, replacing Recoil, Turbopack, and any App Router conversion as separate projects. The immediate benefit is a supported framework release; do not assume this upgrade alone improves visitor performance.

Next.js lists 14 as unsupported and 16 as Active LTS. Version 15 is a useful intermediate verification checkpoint, not the intended deployment destination. [Support policy](https://nextjs.org/support-policy)

The audited target is Next.js 16.4.3, whose published source manifest accepts React 18.2.0. Reconfirm the latest patched stable 16.x release when implementation starts and record the exact target in the lockfile. Avoid an unbounded `next@latest react@latest` upgrade. [Next.js 16.4.3 manifest](https://raw.githubusercontent.com/vercel/next.js/v16.4.3/packages/next/package.json)

## Evidence and readiness

| Area           | Repository finding                                                                                  | Migration implication                                                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework      | `package.json`: Next.js and eslint-config-next 14.2.35; React/React DOM 18.2.0                      | Framework and lint configuration need coordinated changes.                                                                                        |
| Routing        | `src/pages`, `_app.tsx`, `_document.tsx`; no App Router tree found                                  | Preserve current routes, API handlers, `next/head`, and `next/router`.                                                                            |
| Rendering      | Static props/paths for staff, rooms, booklets, employment; server-side props in backoffice          | Test generated pages, fallback/404 behavior, and authenticated server rendering. No synchronous `next/headers` usage found in the source scan.    |
| Runtime        | `.nvmrc`: 22.18.0; local audit shell: 22.21.1; TypeScript 6.0.2                                     | Versions exceed framework minimums. Confirm Vercel's actual Node setting; the repository does not establish it. Align Node types, currently 18.x. |
| State          | Recoil 0.7.7 wraps the app; six atoms across five files                                             | Retain React 18 initially. Events, editor, search, and request/submission state need regression coverage.                                         |
| Authentication | Installed NextAuth 4.24.15 explicitly accepts Next 16; Azure AD and Supabase allowlist              | No dependency-driven need for an Auth.js major migration. Peer acceptance does not prove login works.                                             |
| Styling        | styled-components 5.3.11 installed; SWC transform plus ServerStyleSheet in `_document.tsx`          | Keep both SSR mechanisms; verify initial styles and hydration.                                                                                    |
| Video          | next-video 2.8.1 injects Webpack and Turbopack loaders; project deletes its Turbopack configuration | Explicitly retain Webpack first, then validate Turbopack separately.                                                                              |
| Images         | `/save-the-u` requests quality 50 through ParallaxBand/ParallaxStrip                                | Preserve that setting with an explicit qualities allowlist.                                                                                       |
| Delivery       | CI installs with frozen lockfile and runs Jest only                                                 | Add type checking and linting as enforced checks; require a successful preview production build.                                                  |

Recoil is archived, and its issue tracker records React 19 failures involving React internals. This is a React 19 migration blocker, not evidence that Next 16 with React 18 is blocked. Testing Library 14 also declares React 18 peers. [Recoil repository](https://github.com/facebookexperimental/Recoil), [React 19 issue](https://github.com/facebookexperimental/Recoil/issues/2318)

## Changes to implement

1. **Build setup:** remove the obsolete `swcMinify` option. Preserve `compiler.styledComponents` and the video wrapper. [Compiler documentation](https://nextjs.org/docs/architecture/nextjs-compiler)
2. **Bundler:** add `--webpack` to Next 16 development and build invocations, including `dev:sections`; preserve the video sync process. Next 16 defaults to Turbopack and rejects unhandled custom Webpack configuration. Remove the stale Next 13 comment and deliberately account for the video plugin's Turbopack settings. [Upgrade guide](https://nextjs.org/docs/pages/guides/upgrading/version-16)
3. **Lint:** replace `next lint` with the ESLint CLI. Adopt ESLint 9 and a compatible flat configuration with eslint-config-next 16, retaining accessibility, Prettier, TypeScript, and script-ignore rules. Next 16 removes `next lint` and build-time linting. [Upgrade guide](https://nextjs.org/docs/pages/guides/upgrading/version-16)
4. **Auth boundary:** migrate `src/middleware.ts` to `src/proxy.ts` in a distinct commit, preserving all matchers and redirects. Proxy uses Node rather than Edge; retaining deprecated middleware temporarily is an option if runtime verification fails. Update references in `src/utils/authRoutes.ts` and its test. [Upgrade guide](https://nextjs.org/docs/pages/guides/upgrading/version-16)
5. **Images:** set `images.qualities: [50, 75]`. Validate upstream redirects and local query-string image sources against the new restrictions. Existing TTL, formats, widths, and remote host configuration are already explicit. [Upgrade guide](https://nextjs.org/docs/pages/guides/upgrading/version-16)

Do not mechanically convert Pages Router `getStaticProps` or `getServerSideProps` parameters to async App Router APIs. Preserve current Pages API request/response semantics, multipart body-parser settings, and explicit cache headers.

## Implementation sequence and estimates

Estimates are engineering judgment for one developer, assuming preview credentials and reviewers are available. Allow roughly 6–10 working days plus release observation; external integration failures can extend this.

| Stage                    | Work                                                                                                                                                        | Exit gate                                                     | Estimate                     |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------- |
| 1. Establish baseline    | Create an isolated checkout; restore dependencies with frozen lockfile; resolve baseline failures; capture public/authenticated behavior and build output   | Repeatable green checks and current-version preview           | 1 day                        |
| 2. Prepare quality gates | Add explicit type/lint CI steps; fix duplicated TypeScript key in lint-staged config, which currently shadows its type-check entry; add auth behavior tests | CI catches failures independently of Next build               | 1–2 days                     |
| 3. Upgrade framework     | Verify a patched 15.x checkpoint, then 16.x in separate commits; keep React 18; apply build/lint/config changes; inspect lockfile and peer warnings         | Tests, types, lint, and Next 16 production preview pass       | 2–3 days                     |
| 4. Verify runtime        | Exercise the matrix below, including proxy migration; compare baseline HTML, screenshots, network behavior, and performance                                 | Public site and staff workflows accepted                      | 2–3 days                     |
| 5. Release               | Promote the tested deployment in a low-traffic window; retain previous deployment and commit for rollback                                                   | Smoke tests pass; observe errors and behavior for 24–48 hours | Partial day plus observation |

The 15.x checkpoint is for diagnosing which major introduces a regression; it does not require a production release. Use an exact target for each step and review any codemod diff before keeping it. Preserve React 18 types and `react-is` alongside React 18.

Do not run builds or another server in the active development checkout. Use an isolated checkout or Vercel preview so the running `.next` artifacts remain intact. Preserve sitemap generation and the existing test-before-build behavior. Check `patch-package` applies during a clean install. Review security resolutions against the new dependency tree; do not blanket-force dependencies across incompatible majors.

## Acceptance matrix

| Surface           | Required checks                                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Public rendering  | Home, events, search, Save the U, department pages: direct load, navigation, mobile layout, no hydration errors, expected initial CSS                              |
| Static generation | Staff, meeting-room and booklet detail pages; employment feed fallback; valid/unknown IDs; expected 404s                                                           |
| SEO               | Titles, descriptions, canonical/social tags, draft noindex, sitemap output, existing redirects and query-string preservation                                       |
| Authentication    | Signed-out redirects for backoffice, Graffix, and editor; callback URL preservation; Azure sign-in/out; allowed and denied users; expired sessions; protected APIs |
| Session lifecycle | Public production pages retain intended cookie behavior; staff can cross public/private pages without losing session or app state                                  |
| Media             | Desktop/mobile video, poster, autoplay, video sync; galleries and external images; quality 50/75 image requests                                                    |
| Integrations      | Events, Instagram and image proxy, JotForm, Notion, Supabase, rate limits, multipart name tags/work orders, monthly token cron                                     |
| Editing           | Editor save/load, backoffice CRUD and role enforcement using test records                                                                                          |

Use designated test accounts and records for writes. A mocked unit test cannot establish Azure callback or deployed media compatibility. The existing auth-session test checks a literal list against another list; it does not execute the proxy or verify access enforcement. Add focused tests for that boundary and verify it in preview.

Compare production-mode behavior against the baseline, including response errors, client exceptions, LCP/CLS, API latency, and asset failures. Agree acceptable regression thresholds before promotion. Roll back on broken login, lost access enforcement, widespread 5xx responses, or materially broken public pages. Keep environment and database schema changes out of this release so deployment rollback remains straightforward.

## Audit validation and limits

- `yarn test --runInBand`: **48 suites, 461 tests passed**.
- `yarn lint`: **passed with existing warnings**.
- `yarn tsc --noEmit --incremental false`: **failed** because `fuse.js` is absent from local `node_modules`; imports fail in `src/atoms/SearchResultAtom.ts` and `src/pages/search/index.tsx`. It is declared in both package.json and yarn.lock. Restore the install before deciding whether any source fix is needed.
- No packages were upgraded or installed. No production build, live browser audit, deployment, or external integration transaction was performed. Next 16 compatibility remains a preview-validation gate.
- The existing change in `src/modules/SaveTheU/content.ts` was left untouched.

After the framework release stabilizes, replace Recoil and validate React 19 in a separate effort. Evaluate Turbopack with the restored video loader rules separately. App Router, React Compiler, and Cache Components require their own product or performance justification.
