# Third-party data inventory

**Last reviewed:** 2026-09-17
**Method:** static analysis of this repository. Items that only a browser can
settle are listed in "Open questions" and covered by
`docs/privacy-runtime-verification-2026-09-17.md`.

What this records: every external service the site talks to, whether the
visitor's browser reaches it directly or the server does it on their behalf, and
where in the code that happens. It exists so the privacy policy, and anyone
changing this code, can work from an accurate list rather than a guess.

## The distinction that matters

A **server-side** call is made by the Vercel function. The visitor's browser
never contacts the vendor, and the vendor never sees the visitor's IP address.

A **browser-side** call is made by the visitor's own browser, which means the
vendor receives their IP address, User-Agent, and — for images, styles and other
subresources — a `Referer` header naming the page they were on.

Most of this site's integrations are server-side, which is the reason the
browser-side list below is short.

---

## 1. Browser-side: scripts

**None.** No third-party JavaScript executes on any page.

`next/script` is not used anywhere in the repository. The only scripts the
browser loads are Next.js's own bundles and two Vercel telemetry scripts, both
served from this site's own origin rather than a vendor domain:

| Path                                | Purpose              | Declared at              |
| ----------------------------------- | -------------------- | ------------------------ |
| `/_vercel/insights/script.js`       | Vercel Web Analytics | `src/pages/_app.tsx:112` |
| `/_vercel/speed-insights/script.js` | Core Web Vitals      | `src/pages/_app.tsx:111` |

Production resolves to those first-party paths
(`node_modules/@vercel/analytics/dist/react/index.mjs:84`); the
`va.vercel-scripts.com` URL on line 79 is a `debug`-mode fallback only. Vercel
still receives pageview and performance data as a processor.

Fonts are self-hosted. All three `next/font/google` call sites —
`src/pages/_app.tsx:13`, `src/pages/about/brand.tsx:16`,
`src/pages/recreation/game-room.tsx:27` — inline their fonts at build time, so
there is no runtime request to Google Fonts. `src/styles/globals.css` contains no
`@import` and no remote `url()`.

There are no `<iframe>` elements anywhere in the codebase, so there are no
embedded players, maps or widgets.

### A reference that looks like a third-party script and is not

Every page bundle contains a `vercel.live` URL, added by the framework rather
than by this codebase. Grepping the bundles finds it, so it is recorded here to
save the next person the investigation.

It never runs for a visitor. The surrounding code tests `document.cookie` for
Vercel's toolbar flag and returns before creating the element if it is absent:

```js
...toolbar=1(?:;|$)/.test(document.cookie)) return;
var s = document.createElement('script');
s.src = 'https://vercel.live/_next-live/feedback/feedback.js';
s.setAttribute('data-explicit-opt-in', 'true');
```

That flag is only present for someone signed in to Vercel who has turned the
review toolbar on, so the request is made by the people who build the site and
by nobody else. Observed in practice on the staging hostname and not on
production, which fits the toolbar being a preview-review feature.

Two other strings in the bundles are similarly inert. `fonts.gstatic.com` and
`fonts.googleapis.com` appear inside a font-provider lookup table that Next
ships whether or not those providers are used — no request is made, because
fonts here are self-hosted at build time. **A string in a bundle is not a
network request**; anything found by grep needs confirming in a network log
before it counts.

## 2. Browser-side: media

`src/components/Image/Image.tsx:124` renders a plain `<img>`, and CSS
`background: url(...)` is used in several components. Both fetch directly from
whatever host the URL names, so the `images.domains` allowlist at
`next.config.js:15-22` does not govern them — that allowlist applies only to
`next/image`, which is used in exactly two files
(`src/components/Gallery/Gallery.tsx:141`,
`src/components/GridGallery/GridGallery.tsx:156`) and consumed only by
`/keep-the-u-open`.

| Host                                                                                                                            | Serves                             | Referenced at                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bubqscxokeycpuuoqphp.supabase.co`                                                                                              | Page backgrounds and hosted assets | `src/pages/ccc/gsrc/index.tsx:114`, `src/pages/ccc/apisrc/index.tsx:79`, `src/pages/ccc/pasrc/index.tsx:72`, `src/pages/ccc/clsrc/index.tsx:38`, `src/pages/contact/index.tsx:242`, `src/pages/search/index.tsx:194,200`, and ~320 further references |
| `calstatela-cdn.presence.io`                                                                                                    | Event photos, as CSS backgrounds   | `src/modules/EventCard/EventCard.tsx:172` → `ModEventCard.tsx:134`, `SplitEventCard.tsx:86`                                                                                                                                                           |
| `image.mux.com`                                                                                                                 | Video poster frames                | `src/pages/about/u-krew/index.tsx:224`, `src/pages/operations/index.tsx:274`, `src/pages/graffix/web-team/index.tsx:168`                                                                                                                              |
| `stream.mux.com`                                                                                                                | HLS video segments                 | `videos/*.mp4.json:17`, played via `src/modules/HeaderWithVideo/HeaderWithVideo.tsx:7`                                                                                                                                                                |
| `res.cloudinary.com`                                                                                                            | U-Awards gallery photos            | `src/data/uAwardsGallery.json`, `src/data/uAwards.json`, transformed at `src/modules/UAwards/UAwardsGallery.tsx:43-46`                                                                                                                                |
| `i.imgur.com`                                                                                                                   | Cultural grads header art          | `src/pages/ccc/cultural-grads/[id].tsx:88,96,98`                                                                                                                                                                                                      |
| `www.jotform.com`                                                                                                               | Graduate-submitted photos          | URLs supplied by `src/pages/api/jotform.ts:88,119,150,181`                                                                                                                                                                                            |
| `dl.dropboxusercontent.com`, `media.giphy.com`, `photos.smugmug.com`, `images.unsplash.com`, `*.public.blob.vercel-storage.com` | Assorted images                    | Scattered across `src/data/*.json` and page files                                                                                                                                                                                                     |

Instagram post images are **not** in this list. They are fetched server-side and
re-served from this origin by `src/pages/api/instagram-image.ts`, so the browser
only ever contacts `calstatelausu.org` for them.

`www.dropbox.com` appears frequently but almost entirely as `href` document
links, rewritten at `src/services/index.ts:250-263`. Those are navigation, not
subresource loads.

## 3. Server-side only

The browser never contacts these; the Vercel function does.

| Service                        | Purpose                                                | Called from                                                                                                                   |
| ------------------------------ | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `api.jotform.com`              | Contact submissions, grad and U-Krew reads             | `src/pages/api/jotformContact.ts:135`, `src/pages/api/jotform.ts:30-32`, `src/pages/api/jotformUKrew.ts:21-23`                |
| `graph.instagram.com`          | Instagram Graph API                                    | `src/pages/api/instagram.ts:92-94`, `src/pages/api/cron/update-ig-tokens.ts:16`                                               |
| Meta CDN                       | Instagram image bytes, proxied                         | `src/pages/api/instagram-image.ts`                                                                                            |
| `calstatela.campusgroups.com`  | Events RSS                                             | `src/pages/api/events.ts:5,12`; the client calls `/api/events` per `src/utils/constants.ts:19`                                |
| `csuaoa.org`                   | AOA job feed                                           | `src/lib/aoaJobFeed.ts:7`                                                                                                     |
| `calstatela.joinhandshake.com` | Employment RSS                                         | `src/pages/api/employment.ts:14-16`                                                                                           |
| Notion API                     | Graphics requests, work orders, name tags              | `src/pages/api/notion.ts`, `src/pages/api/notion/notion-client.ts`, `src/pages/api/work-order.ts`, `src/pages/api/nametag.ts` |
| Upstash Redis                  | Rate limiting                                          | `src/lib/ratelimit.ts`                                                                                                        |
| Resend                         | Feedback notification and confirmation email           | `src/lib/feedbackNotifications.ts:106-165`                                                                                    |
| Slack webhook                  | Alert when a feedback email fails                      | `src/lib/feedbackNotifications.ts:186-199`                                                                                    |
| Supabase                       | Backoffice allowlist, CMS, meeting documents           | `src/lib/supabaseAdmin.ts`, `src/services/index.ts:177+`                                                                      |
| Azure AD                       | Backoffice sign-in (browser-side redirect, staff only) | `src/pages/api/auth/[...nextauth].js:7-11`                                                                                    |

Azure AD is the one entry in this table the browser reaches directly rather
than the server, and it is worth spelling out because the hand-off happens
without a click: reaching the sign-in route while signed out sends the browser
straight on to Microsoft, with no intermediate page to accept or decline.

From there Microsoft sets its own cookies on its own domain. Those belong to
Microsoft, are outside this site's control, and reach only staff who are
deliberately signing in — no ordinary visitor encounters them. They are listed
nowhere below for the same reason.

## 4. Cookies and client storage

The application writes none. Searches across `src/` for `document.cookie`,
`Set-Cookie`, `js-cookie`, `cookies-next`, `nookies`, `localStorage`,
`sessionStorage` and `indexedDB` all return zero matches, and no cookie library
is in `package.json`. `src/middleware.ts` only redirects.

What remains is set by dependencies:

| Name                               | Set by                                      | Scope                                                                                                                                                                                                                                     |
| ---------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__Host-next-auth.csrf-token`      | NextAuth, via a call to `/api/auth/session` | Set on reaching any backoffice route, including the sign-in page before anyone signs in — the CSRF token has to exist before the form is submitted. `HttpOnly`, `Secure`, `SameSite=Lax`. Random per session; not an identifier.          |
| `__Secure-next-auth.callback-url`  | same                                        | Same trigger. Holds the return URL after sign-in. `HttpOnly`, `Secure`, `SameSite=Lax`.                                                                                                                                                   |
| `__Secure-next-auth.session-token` | NextAuth, on successful sign-in             | Staff only, after authenticating. Carried on every request to the domain thereafter, including public pages — NextAuth's endpoints live under `/api/auth`, so the cookie cannot be path-scoped to `/backoffice` without breaking sign-in. |

All three are first party. No third party receives them, and none is used for
tracking. NextAuth's library defaults apply; no `cookies` block is configured in
`src/pages/api/auth/[...nextauth].js`.

**Public visitors receive no cookies.** `SessionProvider` is passed an explicit
`null` session outside the gated routes (`src/pages/_app.tsx`, using
`usesAuthSession` from `src/utils/authRoutes.ts`), so it never calls
`/api/auth/session` and nothing is set. `refetchOnWindowFocus` is gated on the
same condition, since it defaults to true and would otherwise re-fetch — and set
the cookies — whenever a tab regained focus.

This was verified in a browser rather than inferred: before that change, a plain
page load set the first two cookies for every visitor.

## 5. Forms

| Route                                        | Fields                                                                                                                                                   | Destination                                                                                   | Third-party handler                                                           |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `/contact` (`src/pages/contact/index.tsx`)   | `subject`, `category`, `email`, `message`, `firstName`, `lastInitial`, plus a hidden honeypot and a fill-duration value — type at `src/types/Contact.ts` | `POST /api/jotformContact`                                                                    | Yes, server-side: JotForm, Resend, Upstash, and Slack if email delivery fails |
| `/search` (`src/pages/search/index.tsx:203`) | Free-text query                                                                                                                                          | None — filtering is local via Fuse.js (line 120); `handleOnSubmit` is a no-op (lines 127-131) | No                                                                            |

Backoffice forms post to first-party `/api/backoffice/*` routes behind the
session gate in `src/middleware.ts:16-41`.

A contact submission fans out to JotForm (`src/pages/api/jotformContact.ts:135`),
then Resend for a staff notification and a confirmation to the submitter
(`src/lib/feedbackNotifications.ts:116-165`). Rate-limit identifiers are hashed
before they reach Upstash (`src/lib/ratelimit.ts`), so that vendor holds an
opaque digest rather than an IP or email address.

`src/modules/Footer/Footer.tsx:199` links a JotForm-hosted form. That is
navigation away from this site, not an embed.

## 6. Configuration

- `next.config.js` defines no `headers()`, so there is no Content-Security-Policy.
  Adding one in report-only mode would make any future third-party script fail
  visibly rather than silently.
- `src/middleware.ts` gates `/backoffice`, `/graffix/backoffice` and `/_edit`.
  It sets no cookies and adds no headers.
- `vercel.json` holds one cron entry for Instagram token refresh.
- `public/` contains no HTML or JavaScript.

## 7. Environment variable names

Names only; no values are recorded here.

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`, `AZURE_AD_CLIENT_ID`, `AZURE_AD_CLIENT_SECRET`,
`AZURE_AD_TENANT_ID`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`,
`CONTACT_JOTFORM_API_KEY`, `CONTACT_JOTFORM_FORM_ID`,
`JOTFORM_SUBMISSIONS_API_KEY`, `APIDA_GRAD_FORM_ID`, `BLACK_GRAD_FORM_ID`,
`NUESTRA_GRAD_FORM_ID`, `PRIDE_GRAD_FORM_ID`, `NOTION_GRDB_API_KEY`,
`NOTION_NAMETAG_API_KEY`, `NOTION_NAMETAG_DB_ID`, `NOTION_WORKORDER_API_KEY`,
`NOTION_WORKORDER_DB_ID`, `NOTION_GRAPHICS_REQUEST_API_KEY`,
`NOTION_GRAPHICS_REQUEST_DB_ID`, `RESEND_API_KEY`, `FEEDBACK_FROM_EMAIL`,
`FEEDBACK_NOTIFY_EMAILS`, `FEEDBACK_LOGO_URL`, `SLACK_ALERT_WEBHOOK_URL`,
`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `RATELIMIT_HASH_SECRET`,
`MUX_TOKEN_ID`, `MUX_TOKEN_SECRET`, the `IG_TOKEN_*` keys enumerated at
`src/pages/api/instagram.ts:11-55`, `CRON_SECRET`, `ENABLE_UKREW_API`,
`BACKOFFICE_AUTH_STRATEGY`, `SITE_URL`.

## 8. Open questions

Static analysis cannot settle these. Each is covered by a check in
`docs/privacy-runtime-verification-2026-09-17.md`.

1. **Does `@supabase/supabase-js` write to `localStorage` on public pages?**
   `src/lib/supabase.ts:9` calls `createClient` with no options, so
   `persistSession: true` applies and the client binds `globalThis.localStorage`
   on construction. No public page signs anyone in, so there should be no session
   to persist, but the client still constructs and reads storage.
2. **Do the Vercel scripts set cookies?** Vercel documents both as cookieless.
   The scripts are served at runtime and are not in this repository.
3. **Does Vercel Web Analytics record the URL query string?** `<Analytics />` at
   `src/pages/_app.tsx:112` is rendered with no props, so it uses the injected
   script's auto-tracking, which reads `window.location`. If the query string is
   included, search terms typed into `/search?query=...` reach Vercel. Passing an
   explicit `path` would strip it.
4. **Which host serves event photos?** `eventOriginalPhotoFullUrl` is feed data.
   `next.config.js:16` names `calstatela-cdn.presence.io`, but that allowlist
   governs `next/image`, which these images do not use.

## 9. Changes made on 2026-09-17

Recorded so this document reads as current rather than aspirational.

- Removed Google Analytics (`react-ga4`), which initialized site-wide from
  `_app.tsx` on mount. Nothing depended on it: no `ReactGA.event` or
  `ReactGA.send` call existed anywhere, so it only ever collected automatic
  pageviews.
- Added `src/pages/api/instagram-image.ts`, so Instagram post images are fetched
  server-side and re-served from this origin instead of being painted directly
  from Meta's CDN. The route restricts fetches to an allowlist of hosts, refuses
  redirects, and caps response size.
- Added a shared-cache header to `src/pages/api/instagram.ts`, since Instagram
  re-signs every `media_url` per Graph API call and the proxy cannot cache
  without stable URLs.
- Removed reCAPTCHA, which loaded on `/contact` at page render. Replaced with a
  per-IP rate limit and a fill-duration floor, alongside the existing honeypot.
- Made the rate limiter non-fatal, so an unreachable Upstash logs and allows
  rather than failing every submission.
- Hashed rate-limit identifiers so Upstash receives a digest rather than an IP
  and email address.

## 10. Possible follow-ups

- Add a Content-Security-Policy in report-only mode (§6).
- Consolidate remote images onto Supabase or `next/image` to reduce the host list
  in §2.
- `src/modules/HeaderWithVideo/HeaderWithVideo.tsx:55-90` autoplays on mount, so
  MUX is contacted without user action. A click-to-play variant would defer it.
  This is a visible design change and belongs to Graffix.
- `src/pages/api/employment.ts:15` holds a feed token in source rather than an
  environment variable.
