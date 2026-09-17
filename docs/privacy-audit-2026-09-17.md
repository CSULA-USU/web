# Privacy audit — cookies, tracking, and third-party data transmission

**Date:** 2026-09-17
**Scope:** `CSULA-USU/web` @ `6392cbe5` (branch `staging`)
**Method:** static analysis of the repository only. No runtime capture (no DevTools
network trace, no `document.cookie` dump against a deployed build).
**Driver:** California Invasion of Privacy Act exposure and the contractual
indemnification obligation on undisclosed third-party transmission. This report does
**not** frame anything as a CCPA/CPRA gap — the U-SU is a 501(c)(3) auxiliary, not a
"business" under that statute.

## What static analysis cannot settle

Called out here once so the limits are not restated in every row:

1. **Exact collection endpoints for Google Analytics.** `gtag.js` is fetched at runtime
   and picks its own beacon host (`www.google-analytics.com/g/collect`, or a
   region-sharded variant such as `region1.google-analytics.com`). The repo pins the
   loader URL only. Confirming the beacon host needs a network trace.
2. **Cookie names, expiries, and flags for third-party cookies.** `_ga`, `_GRECAPTCHA`
   and friends are written by vendor JavaScript, not by this codebase. Every attribute
   in §3 marked _(vendor-set)_ is from vendor documentation and general knowledge, not
   from anything readable in this repo. Treat those rows as "verify at runtime."
3. **The Instagram CDN hostname.** Image URLs come from the Graph API response body at
   runtime (`src/pages/api/instagram.ts:92`). Meta serves these from
   `scontent-*.cdninstagram.com` / `*.fbcdn.net`, but the literal host is not in the
   repo.
4. **Whether `supabase-js` actually writes to `localStorage` on public pages.** The
   client defaults to `persistSession: true`, but nothing on a public page signs in.
   See §3 for the specific uncertainty.
5. **Event photo CDN host.** `eventOriginalPhotoFullUrl` is feed data. The allowlist at
   `next.config.js:16` names `calstatela-cdn.presence.io`, which is strong evidence but
   not proof of what the feed emits today.

---

## 1. Third-party destinations

The critical distinction throughout this report: a **server-side** call is made by the
Vercel function, so the visitor's browser never contacts the vendor and the vendor never
sees the visitor's IP. A **browser-side** call discloses the visitor's IP address,
User-Agent, and (for subresources) the `Referer` header naming the page they were on.
Only browser-side calls create CIPA exposure. The repo does a lot of proxying correctly,
which materially shrinks the surface.

### 1A. Browser-executed third-party JavaScript

| Domain                                                             | Purpose                                                     | Loaded by (file:line)                                                                                                 | Which pages                                                              | When it fires                                                                                                                              | Category                               |
| ------------------------------------------------------------------ | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| `www.googletagmanager.com`                                         | GA4 loader (`gtag/js?id=…`)                                 | `src/pages/_app.tsx:50-61` → `react-ga4` injects the tag at `node_modules/react-ga4/dist/ga4.js:102-121`              | **All pages** (`_app.tsx` is site-wide)                                  | `useEffect` on first mount — before any user interaction                                                                                   | analytics                              |
| `www.google-analytics.com` (host runtime-determined, see caveat 1) | GA4 hit collection                                          | consequence of the above; not referenced in repo source                                                               | All pages                                                                | Immediately after `gtag.js` evaluates                                                                                                      | analytics                              |
| `www.google.com` (`/recaptcha/api.js`)                             | reCAPTCHA v2 checkbox                                       | `src/pages/contact/index.tsx:433-440`; URL built at `node_modules/react-google-recaptcha/lib/recaptcha-wrapper.js:19` | `/contact` only                                                          | `componentDidMount` (`node_modules/react-async-script/lib/async-script-loader.js:81`) — **on page load, before the user touches the form** | essential (anti-spam), Google-operated |
| `www.gstatic.com`                                                  | reCAPTCHA payload, styles, and frames pulled in by `api.js` | transitive from the row above                                                                                         | `/contact` only                                                          | With reCAPTCHA init                                                                                                                        | essential, Google-operated             |
| `login.microsoftonline.com`                                        | Azure AD OAuth redirect                                     | `src/pages/api/auth/[...nextauth].js:7-11`                                                                            | `/backoffice/signin` and the guarded routes in `src/middleware.ts:46-53` | Only when a staff member signs in                                                                                                          | essential                              |

**`next/script` is not used anywhere in this repo** — the search returned zero matches,
so there are no `strategy` values to review. All third-party JS arrives via
`document.createElement('script')` inside vendor packages.

### 1B. Vercel first-party-path telemetry

Both Vercel packages are mounted site-wide at `src/pages/_app.tsx:126-127`. In
production they load from the **site's own origin**, not a vendor domain:

| Path                                | Purpose              | Source of truth                                                                                                         | Category  |
| ----------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------- |
| `/_vercel/insights/script.js`       | Vercel Web Analytics | `node_modules/@vercel/analytics/dist/react/index.mjs:84` (line 79 is the `debug`-only `va.vercel-scripts.com` fallback) | analytics |
| `/_vercel/speed-insights/script.js` | Core Web Vitals      | `node_modules/@vercel/speed-insights/dist/react/index.js`                                                               | analytics |

No third-party **domain** is contacted, so there is no cross-origin disclosure. Vercel
still receives pageview and performance data as a processor — relevant to the disclosure
gap in §6, not to CIPA's third-party-interception theory.

### 1C. Browser-loaded third-party media (no JS, but IP + User-Agent + Referer disclosed)

This is the largest and least obvious category. **`components/Image` is a plain
`<img>`**, not `next/image` — see `src/components/Image/Image.tsx:124` (`styled('img')`)
and the render paths at lines 214 and 250. The same applies to every CSS
`background: url(...)`. So these URLs are fetched **directly by the visitor's browser**;
the `images.domains` allowlist at `next.config.js:15-22` does not govern them.

`next/image` is used in exactly two files — `src/components/Gallery/Gallery.tsx:141` and
`src/components/GridGallery/GridGallery.tsx:156` — and only `/keep-the-u-open` consumes
them. Those two paths _are_ proxied through `/_next/image` and therefore first-party.

| Domain                                                                                                                                            | Purpose                                                      | Loaded by (file:line)                                                                                                                                                                                                                                                                                | Which pages                                                                                                 | When it fires                                                                             | Category              |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------- |
| `bubqscxokeycpuuoqphp.supabase.co`                                                                                                                | Page background images, hosted assets                        | `src/pages/ccc/gsrc/index.tsx:114`, `src/pages/ccc/apisrc/index.tsx:79`, `src/pages/ccc/pasrc/index.tsx:72`, `src/pages/ccc/clsrc/index.tsx:38`, `src/pages/contact/index.tsx:242`, `src/pages/search/index.tsx:194,200`, `src/pages/keep-the-u-open/index.tsx:140,383`, and ~320 further references | Most pages                                                                                                  | On paint                                                                                  | media                 |
| Meta CDN — `scontent-*.cdninstagram.com` / `*.fbcdn.net` (caveat 3)                                                                               | Instagram post thumbnails, rendered as a CSS background      | `src/sections/InstagramFeed/InstagramFeed.tsx:28` (`background: url(${props.src})`), fed from `media_url`/`thumbnail_url` at lines 136-158                                                                                                                                                           | `/about`, `/ccc`, `/ccc/apisrc`, `/ccc/clsrc`, `/ccc/gsrc`, `/ccc/pasrc`, `/csi`, `/graffix`, `/recreation` | After `/api/instagram` resolves on mount (`InstagramFeed.tsx:96`) — no interaction needed | media (Meta-operated) |
| `calstatela-cdn.presence.io` (caveat 5)                                                                                                           | Event photos as CSS background                               | `src/modules/EventCard/EventCard.tsx:172` → `src/modules/EventCard/ModEventCard.tsx:134`, `src/modules/EventCard/SplitEventCard.tsx:86`                                                                                                                                                              | Homepage, `/events`, any page with event cards                                                              | On paint                                                                                  | media                 |
| `image.mux.com`                                                                                                                                   | Video poster frames                                          | `src/pages/about/u-krew/index.tsx:224`, `src/pages/operations/index.tsx:274`, `src/pages/graffix/web-team/index.tsx:168`                                                                                                                                                                             | Those 3 pages                                                                                               | On paint                                                                                  | media                 |
| `stream.mux.com`                                                                                                                                  | HLS video segments                                           | `videos/u-krew-header-video.mp4.json:17`, `videos/mobile-u-krew-header-video.mp4.json:17`, played via `src/modules/HeaderWithVideo/HeaderWithVideo.tsx:7`                                                                                                                                            | Those 3 pages                                                                                               | On mount — the component **autoplays** (`HeaderWithVideo.tsx:55-90`)                      | media                 |
| `res.cloudinary.com`                                                                                                                              | U-Awards gallery photos                                      | `src/data/uAwardsGallery.json`, `src/data/uAwards.json`, transformed at `src/modules/UAwards/UAwardsGallery.tsx:43-46`                                                                                                                                                                               | U-Awards gallery                                                                                            | On paint                                                                                  | media                 |
| `i.imgur.com`                                                                                                                                     | Cultural grads header art                                    | `src/pages/ccc/cultural-grads/[id].tsx:88,96,98`                                                                                                                                                                                                                                                     | `/ccc/cultural-grads/[id]`                                                                                  | On paint, plus `<link rel="preload">` at line 193                                         | media                 |
| `www.jotform.com`                                                                                                                                 | Graduate-submitted photos (`img` field from JotForm answers) | `src/pages/api/jotform.ts:88,119,150,181` supplies the URL; rendered through `components/Image`                                                                                                                                                                                                      | `/ccc/cultural-grads/[id]`                                                                                  | On paint                                                                                  | media                 |
| `dl.dropboxusercontent.com`, `media.giphy.com`, `photos.smugmug.com`, `images.unsplash.com`, `wallpapers.com`, `*.public.blob.vercel-storage.com` | Assorted images                                              | scattered across `src/data/*.json` and page files                                                                                                                                                                                                                                                    | Various                                                                                                     | On paint                                                                                  | media                 |

`www.dropbox.com` appears ~205 times but almost entirely as `href` document links
(`src/services/index.ts:250-263` rewrites them) — navigation, not a subresource load.

### 1D. Server-side only — the browser never contacts these

Listed to document the data flow, not as browser exposure.

| Domain                                    | Purpose                                      | Called from                                                                                                                   |
| ----------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `api.jotform.com`                         | Contact submissions, grad/U-Krew reads       | `src/pages/api/jotformContact.ts:13,135`, `src/pages/api/jotform.ts:30-32`, `src/pages/api/jotformUKrew.ts:21-23`             |
| `www.google.com/recaptcha/api/siteverify` | Token verification                           | `src/pages/api/jotformContact.ts:203-215`                                                                                     |
| `calstatela.campusgroups.com`             | Events RSS                                   | `src/pages/api/events.ts:5,12` — correctly proxied; `src/utils/constants.ts:19` points the client at `/api/events`            |
| `graph.instagram.com`                     | Instagram Graph API                          | `src/pages/api/instagram.ts:92-94`, `src/pages/api/cron/update-ig-tokens.ts:16`                                               |
| `csuaoa.org`                              | AOA job feed                                 | `src/lib/aoaJobFeed.ts:7`                                                                                                     |
| `calstatela.joinhandshake.com`            | Employment RSS                               | `src/pages/api/employment.ts:14-16`                                                                                           |
| Notion API                                | Graphics requests, work orders, name tags    | `src/pages/api/notion.ts`, `src/pages/api/notion/notion-client.ts`, `src/pages/api/work-order.ts`, `src/pages/api/nametag.ts` |
| Upstash Redis                             | Rate limiting                                | `src/lib/ratelimit.ts:4-12`                                                                                                   |
| Resend                                    | Feedback notification + confirmation email   | `src/lib/feedbackNotifications.ts:106-165`                                                                                    |
| Slack incoming webhook                    | Email-failure alert                          | `src/lib/feedbackNotifications.ts:186-199`                                                                                    |
| Supabase (REST)                           | Backoffice allowlist, CMS, meeting documents | `src/lib/supabaseAdmin.ts`, `src/services/index.ts:177+`                                                                      |

### 1E. Configuration review

- **`next.config.js`** — no `headers()`, no `rewrites()`, no `redirects()`, **no CSP and
  no security headers of any kind**. A CSP is the single control that would have made
  every finding above self-enforcing.
- **`src/middleware.ts`** — auth gating only (lines 6-44). Sets no cookies, adds no
  headers, contacts nothing external.
- **`vercel.json`** — one cron entry for Instagram token refresh. Nothing privacy-relevant.
- **Fonts are clean.** All three `next/font/google` call sites — `src/pages/_app.tsx:15`,
  `src/pages/about/brand.tsx:16`, `src/pages/recreation/game-room.tsx:27` — self-host at
  build time. `src/styles/globals.css` has no `@import` and no remote `url()`. **No
  runtime request to `fonts.googleapis.com` or `fonts.gstatic.com`.**
- **No `preconnect` / `dns-prefetch`** anywhere.
- **No stray HTML or JS in `public/`.** The handoff prototype
  (`docs/handoff/design_handoff_keep_the_u_open/Keep the U Open v2.dc.html` plus its
  `support.js`) lives under `docs/`, which Next.js does not serve. No `EDITMODE`,
  `chrome.jsx`, or `tweaks-panel.jsx` leaked into `src/`.

### 1F. Environment variable names referencing third parties

Names only; no values read or reproduced.

`NEXT_PUBLIC_GOOGLE_ANALYTICS`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`,
`AZURE_AD_CLIENT_ID`, `AZURE_AD_CLIENT_SECRET`, `AZURE_AD_TENANT_ID`,
`CONTACT_JOTFORM_API_KEY`, `CONTACT_JOTFORM_FORM_ID`, `JOTFORM_SUBMISSIONS_API_KEY`,
`APIDA_GRAD_FORM_ID`, `BLACK_GRAD_FORM_ID`, `NUESTRA_GRAD_FORM_ID`, `PRIDE_GRAD_FORM_ID`,
`NOTION_GRDB_API_KEY`, `NOTION_NAMETAG_API_KEY`, `NOTION_NAMETAG_DB_ID`,
`NOTION_WORKORDER_API_KEY`, `NOTION_WORKORDER_DB_ID`, `NOTION_GRAPHICS_REQUEST_API_KEY`,
`NOTION_GRAPHICS_REQUEST_DB_ID`, `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
`FEEDBACK_FROM_EMAIL`, `FEEDBACK_NOTIFY_EMAILS`, `FEEDBACK_LOGO_URL`,
`SLACK_ALERT_WEBHOOK_URL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`,
`MUX_TOKEN_ID`, `MUX_TOKEN_SECRET`, `IG_TOKEN_GRAFFIX` (and the sibling `IG_TOKEN_*` keys
enumerated at `src/pages/api/instagram.ts:11-55`), `NEXTAUTH_SECRET`, `NEXTAUTH_URL`,
`CRON_SECRET`, `VERCEL_BEARER_AUTH`.

**Separate hygiene note, not a privacy finding:** `src/pages/api/employment.ts:15` has a
Handshake feed token hardcoded in source rather than in an environment variable. It is a
public-feed token and server-side only, but it is committed to git history.

---

## 2. High-risk flags

### Classes that are absent — confirmed by targeted search

These were searched for explicitly across all `.ts`/`.tsx`/`.js`/`.jsx` in `src/` and
returned **no implementation**:

| Class                           | Searched for                                                                                                                                            | Result                                                                                                                                                                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Advertising / conversion pixels | `fbq`, `connect.facebook.net`, `ttq`, `doubleclick`, `googleadservices`, `googlesyndication`, `adsbygoogle`, `snaptr`, `_linkedin`, `licdn`, `bat.bing` | **None.** The only Meta/TikTok strings are outbound profile links in `src/modules/Footer/Footer.tsx:314`, `src/pages/ccc/apisrc/index.tsx:224`, `src/pages/graffix/index.tsx:291` — `href`s, which transmit nothing until clicked. |
| Session replay                  | `hotjar`, `clarity`, `fullstory`, `logrocket`, `smartlook`                                                                                              | **None.**                                                                                                                                                                                                                          |
| Chat widgets                    | `intercom`, `drift`, `tawk`, `zendesk`, `crisp`, `livechat`                                                                                             | **None.**                                                                                                                                                                                                                          |
| Product analytics / CDP         | `_hsq`, `hubspot`, `segment`, `mixpanel`, `amplitude`, `posthog`, `matomo`, `plausible`                                                                 | **None.**                                                                                                                                                                                                                          |

There are also **zero `<iframe>` elements in the entire codebase**, which removes the
whole embed-based exposure class (§4).

That is a genuinely good baseline. The findings below are what remains.

### HIGH — Google Analytics 4 runs site-wide with no consent gate

**`src/pages/_app.tsx:50-61`**

```
ReactGA.initialize(measurementId);
```

- **Fires before any user interaction?** **Yes.** It is a `useEffect` with an empty
  dependency array in `_app.tsx`, so it runs on mount of every page — the visitor has
  done nothing but arrive.
- **What is transmitted:** page URL (including any query string), `document.referrer`,
  screen and viewport dimensions, language, User-Agent, IP address, and a GA `client_id`
  persisted in a first-party cookie. That `client_id` is a durable pseudonymous
  identifier for the returning visitor.
- **Why this is the primary CIPA exposure:** GA4 is the single most-named technology in
  California wiretapping/pen-register demand letters. The plaintiff theory is that
  contents of the visitor's communication with the site are routed to Google in real
  time, without consent, and that Google is free to use them for its own purposes. The
  combination that draws letters is exactly this one — third-party analytics, on by
  default, with no disclosure. There is no privacy policy on this site (§6), so there is
  no consent of any kind, express or implied.
- **Aggravating detail:** `ReactGA.initialize` is called with no options object, so
  `anonymize_ip` is not set (`react-ga4` supports it — the field mapping is at
  `node_modules/react-ga4/dist/ga4.js:135`). GA4 truncates IPs server-side by default,
  but nothing in this configuration asks for it.
- **Mitigating detail:** no custom events are ever sent. `ReactGA.event` and
  `ReactGA.send` appear nowhere in the codebase — the only `ReactGA` references are the
  import at line 5 and the `initialize` at line 54. There is also no `router.events`
  listener, so client-side route changes do **not** send additional pageviews. The
  exposure is the initial pageview plus whatever `gtag.js` collects automatically.

### HIGH — Search terms can reach Google Analytics via the URL

**`src/pages/search/index.tsx:101-110`**

The search page reads its query from the URL (`router.query.query`). The in-page input
does **not** push to the URL — `handleOnSubmit` calls `preventDefault()` and does nothing
else (lines 127-131), and filtering is local via Fuse.js (line 120). So typing in the box
is not itself transmitted.

But any arrival at `/search?query=<terms>` — a shared link, a bookmark, an external
referral, or any future code that starts pushing the query into the URL — produces a GA4
pageview whose `page_location` contains the visitor's search terms verbatim. Whatever a
student types about a personal or sensitive matter then sits in a Google property.

**Fires before interaction?** Yes — it is the standard pageview, at mount.

This is a latent defect rather than a currently-exercised path. I could not find a caller
that constructs `/search?query=…` inside this repo, so today it depends on an external or
hand-typed URL. It is one line of future code away from becoming routine.

### MEDIUM-HIGH — reCAPTCHA loads on `/contact` before the user touches the form

**`src/pages/contact/index.tsx:433-440`**

`react-google-recaptcha` injects `https://www.google.com/recaptcha/api.js` from
`componentDidMount` (`node_modules/react-async-script/lib/async-script-loader.js:81`), so
it runs the instant `/contact` renders.

- **Fires before any user interaction?** **Yes.**
- **What is transmitted:** reCAPTCHA v2 is a behavioral risk scorer. It observes mouse
  movement, touch events, timing, browser and device characteristics, and reads the
  visitor's existing Google cookies where present — all to score whether the visitor is
  human, before they have decided to submit anything.
- **Severity is below GA only because there is a real purpose.** Spam protection on a
  public feedback form is a legitimate operational need, and this is the one third-party
  call on the site with a plausible "necessary to provide the service" story. It is also
  the only third-party call anywhere on the site that **is** disclosed to the visitor —
  `src/pages/contact/index.tsx:455-470` names reCAPTCHA and links Google's privacy policy
  and terms. That disclosure is doing real work.
- **The gap:** it loads on page view, not on form focus or submit. A visitor who opens
  `/contact` to read the phone numbers in the sidebar — which is most of what that page
  is (`src/pages/contact/index.tsx:265-290`) — is scored by Google without ever intending
  to interact with the form.

### MEDIUM — Instagram images disclose visitors to Meta on nine pages

**`src/sections/InstagramFeed/InstagramFeed.tsx:28`**

```
background: ${(props) => `url(${props.src}) no-repeat`};
```

`props.src` is Meta's own CDN URL, taken straight from the Graph API response
(lines 136-158). The browser therefore issues a direct request to Meta infrastructure,
sending the visitor's IP, User-Agent, and a `Referer` naming the exact U-SU page.

- **Fires before any user interaction?** **Yes** — `useEffect` at line 96, on mount.
- **Pages affected:** `/about`, `/ccc`, `/ccc/apisrc`, `/ccc/clsrc`, `/ccc/gsrc`,
  `/ccc/pasrc`, `/csi`, `/graffix`, `/recreation`.
- **Why this matters more than an ordinary CDN:** several of these are identity-based
  resource center pages. The `Referer` header tells Meta that this IP visited the Gender
  and Sexuality Resource Center page, or the Pan-African Resource Center page. That is
  the inference, not just the visit, and it lands at an advertising company that can join
  it to a logged-in profile via existing cookies.
- **This is not a tracking pixel** — it is image hosting, and it carries no JavaScript.
  Calling it a Meta pixel in any external communication would be wrong. But it is a
  Meta-operated endpoint receiving identifiable traffic tied to sensitive page topics,
  which is squarely the pattern demand letters describe.
- The API token stays server-side (`src/pages/api/instagram.ts:92`) — correctly. Only the
  image fetch is client-side.

### MEDIUM — Visitor IP and email address are used as an Upstash rate-limit key

**`src/pages/api/jotformContact.ts:93-123`** and **`src/lib/ratelimit.ts:6-12`**

```
const identifier = email ? `${ip}:${email}` : ip;
await jotformContactRatelimit.limit(identifier);
```

The composite `IP:email` string is sent to Upstash Redis as the rate-limit key, and
`analytics: true` (`src/lib/ratelimit.ts:10`) tells `@upstash/ratelimit` to retain
per-identifier counters in its analytics store rather than only holding an expiring
window.

- **Fires before interaction?** No — only on contact form submit.
- **Server-side, so no CIPA interception theory applies.** The issue is a
  directly-identifying pair (IP plus email) persisting with a vendor who is not named in
  any disclosure, for longer than the rate-limit window needs.
- Rate limiting itself is correct and worth keeping. Hashing the identifier would
  preserve every bit of the functionality.

### LOW — No Content-Security-Policy

**`next.config.js:4-36`** defines no `headers()`. There is no CSP, so nothing
structurally prevents a future dependency, a compromised package, or a well-meaning
commit from adding a tracker that no one notices. Every finding in this report was
findable only by reading source; a CSP would make the next one fail loudly instead.

---

## 3. Cookies and client storage

### The codebase itself writes nothing

Searched across all `.ts`/`.tsx` in `src/` for `document.cookie`, `Set-Cookie`,
`js-cookie`, `cookies-next`, `nookies`, `setCookie`, `localStorage`, `sessionStorage`,
and `indexedDB`. **Every one returned zero matches.** No cookie library is in
`package.json`. `src/middleware.ts` sets no cookies — it only redirects (lines 24-40).

So every row below is written by a dependency, not by application code. That is why the
attributes are marked _(vendor-set)_: they are from vendor documentation, and **this
repo cannot confirm them**. A runtime check against the deployed site is required before
any of this goes into a published policy.

| Name                                                           | Set by (file:line or domain)                                                 | First/third party                          | Expiry                                                                        | Secure / HttpOnly / SameSite                                               | Category              |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------- |
| `_ga`                                                          | `www.googletagmanager.com` JS, triggered by `src/pages/_app.tsx:54`          | First-party cookie, third-party controller | 2 years _(vendor-set)_                                                        | Not HttpOnly — readable by any JS on the page _(vendor-set)_               | analytics             |
| `_ga_<MEASUREMENT_ID>`                                         | same                                                                         | First-party cookie, third-party controller | 2 years _(vendor-set)_                                                        | Not HttpOnly _(vendor-set)_                                                | analytics             |
| `_GRECAPTCHA`                                                  | `www.google.com` (reCAPTCHA), triggered by `src/pages/contact/index.tsx:433` | **Third party**                            | ~6 months _(vendor-set)_                                                      | `Secure`; `SameSite=None` required for the cross-site frame _(vendor-set)_ | essential (anti-spam) |
| `next-auth.session-token` / `__Secure-next-auth.session-token` | NextAuth, `src/pages/api/auth/[...nextauth].js:50`                           | First party                                | Session / 30 days _(NextAuth default — not overridden anywhere in this repo)_ | `HttpOnly`, `SameSite=Lax`, `Secure` in production _(NextAuth default)_    | essential             |
| `next-auth.csrf-token`, `next-auth.callback-url`               | NextAuth, same file                                                          | First party                                | Session _(default)_                                                           | `HttpOnly`, `SameSite=Lax` _(default)_                                     | essential             |

**No `cookies` block is configured in `[...nextauth].js`** — the file sets only
`providers`, `secret`, and a `signIn` callback (lines 5-48). All NextAuth cookie
attributes are library defaults. These appear only for authenticated backoffice staff,
not for public visitors.

### Client storage

| Mechanism                                        | Written by                                                         | Status                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------ | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `localStorage` key `sb-<project-ref>-auth-token` | `@supabase/supabase-js` via `src/lib/supabase.ts:9`                | **Uncertain — needs a runtime check.** `createClient` is called with no options, so `persistSession: true` and `autoRefreshToken: true` apply (`node_modules/@supabase/supabase-js/dist/main/lib/constants.js:27-28`), and `GoTrueClient` binds `globalThis.localStorage` on construction (`node_modules/@supabase/auth-js/dist/main/GoTrueClient.js:161-167`). The base storage key constant is `supabase.auth.token` (`.../lib/constants.js:15`). This client is imported by `src/services/index.ts:2` and used on public pages for meeting documents and CMS reads. **No public page ever calls `supabase.auth.signIn`**, so there should be no session to persist — but the client does construct, read storage, and open a `BroadcastChannel` (`GoTrueClient.js:182-184`). Whether a key is actually written on a public pageview is not determinable from source. |
| `sessionStorage`                                 | —                                                                  | No writes anywhere.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| IndexedDB                                        | —                                                                  | No writes anywhere.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Vercel Analytics / Speed Insights                | `/_vercel/insights/script.js`, `/_vercel/speed-insights/script.js` | Vercel documents both as cookieless. Not verifiable from this repo; include in the runtime check.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

---

## 4. Embeds and media

**There are no `<iframe>` elements anywhere in this codebase.** The search returned zero
matches across all `.ts`/`.tsx`. That means:

- **No YouTube embeds** — so the `youtube-nocookie.com` swap, normally the highest-value
  quick win in an audit like this, **does not apply here**. There is nothing to change.
- **No X/Twitter, Spotify, or Google Maps embeds.**
- **No official Instagram embed** (`instagram.com/embed.js` is absent).

What exists instead:

| Media                                                                                   | Implementation                                                                                                                                                       | Privacy-preserving variant available?                                                                                                                                                                                                                                                                                     | Where the change would go                                                                                                                                                                        |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Instagram feed                                                                          | Custom — server-side Graph API call (`src/pages/api/instagram.ts:92`) rendering Meta CDN URLs as CSS backgrounds (`src/sections/InstagramFeed/InstagramFeed.tsx:28`) | **Yes.** The API token is already server-side; only the images leak. Proxy the image bytes through a first-party route, or run the URLs through `next/image` with the Meta CDN host added to `next.config.js:15-22`. Either removes the browser→Meta connection entirely.                                                 | `src/sections/InstagramFeed/InstagramFeed.tsx:28` plus a new handler or `next.config.js` allowlist entry                                                                                         |
| MUX video                                                                               | `next-video` playing HLS from `stream.mux.com`, poster from `image.mux.com` (`videos/*.mp4.json:17,21`)                                                              | **Partially.** Video streaming must reach MUX — that is the product. But the component **autoplays** on mount (`src/modules/HeaderWithVideo/HeaderWithVideo.tsx:55-90`), so the connection opens with no user action. A poster-first, click-to-play variant would defer it. The poster image itself could be self-hosted. | `src/modules/HeaderWithVideo/HeaderWithVideo.tsx:55-90`; poster URLs at `src/pages/about/u-krew/index.tsx:224`, `src/pages/operations/index.tsx:274`, `src/pages/graffix/web-team/index.tsx:168` |
| Remote images (Cloudinary, Imgur, Giphy, SmugMug, Unsplash, Dropbox, JotForm, Presence) | Plain `<img>` and CSS backgrounds via `src/components/Image/Image.tsx:124`                                                                                           | **Yes.** Routing them through `next/image` proxies the fetch through `/_next/image` on Vercel, making it first-party. Requires each host in `next.config.js:15-22`.                                                                                                                                                       | `src/components/Image/Image.tsx`, `next.config.js:15-22`                                                                                                                                         |

---

## 5. Forms and data flow

### Public forms

| Route                                          | Fields collected                                                                                                                                                   | Submission destination                                                                  | Third-party handler?           | Field values reaching analytics?                                                                 |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------ |
| `/contact` (`src/pages/contact/index.tsx:295`) | `subject`, `category`, `email`, `message`, `firstName`, `lastInitial`, plus `website` honeypot (line 422) and `captchaToken` — type at `src/types/Contact.ts:3-12` | `POST /api/jotformContact` (`src/services/index.ts:139`)                                | **Yes, four** — see flow below | **No.** No `ReactGA.event`/`send` call exists anywhere; nothing reads form state into a tracker. |
| `/search` (`src/pages/search/index.tsx:203`)   | Free-text query                                                                                                                                                    | **Nowhere.** Local Fuse.js only (line 120); `handleOnSubmit` is a no-op (lines 127-131) | No                             | **Not directly** — but see the HIGH finding in §2 on `?query=` reaching GA via the pageview URL  |

### `/contact` server-side fan-out

`src/pages/api/jotformContact.ts`, in order:

1. **Honeypot short-circuit** (line 89) — a filled `website` field returns a fake success
   and transmits nothing. Good.
2. **IP extraction** (lines 93-97) from `x-forwarded-for`.
3. **Google** — `POST https://www.google.com/recaptcha/api/siteverify` with the token
   (lines 203-215). Server-side.
4. **Upstash Redis** — rate-limit key `${ip}:${email}` (lines 120-123). See §2 MEDIUM.
5. **JotForm** — `POST https://api.jotform.com/form/<id>/submissions` with name, email,
   subject, category, and message mapped to numbered fields (lines 135-155).
6. **Resend** — two emails (`src/lib/feedbackNotifications.ts:116-165`): one to U-SU staff
   with the submitter's email as `replyTo`, one confirmation to the submitter.
7. **Slack** — only if Resend fails, an alert containing the submitter's email
   (`src/lib/feedbackNotifications.ts:186-199`).
8. **Vercel logs** — on email failure, a `[FEEDBACK_EMAIL_FAILED]` entry containing the
   submitter's email, subject, and category (`src/pages/api/jotformContact.ts:176-188`).

So one contact submission is copied to **JotForm, Resend, Upstash, and potentially Slack
plus Vercel logs** — five processors, none named to the visitor.

The `/contact` page does carry a plain-language data-use notice at lines 444-448
("We use the information you submit only to review your feedback… We do not sell your
information, and we only share it with the service providers that help us operate this
form"). That sentence is accurate as far as it goes. It names no processor, and the
sentence that would have linked a policy is commented out at line 449-450.

### Authenticated forms

All backoffice forms (`src/modules/Backoffice/**`, `src/pages/backoffice/**`) post to
first-party `/api/backoffice/*` routes behind the `src/middleware.ts:16-41` session gate.
No third-party handler. Not public-facing; out of scope for CIPA exposure.

### Forms hosted entirely off-site

`src/modules/Footer/Footer.tsx:199` links `https://form.jotform.com/210416532268047`.
This is a **navigation away** from the site, not an embed — the visitor knowingly lands
on a JotForm page. Lower concern, but it is still a U-SU-directed data collection whose
handling is undisclosed.

---

## 6. Privacy policy gap

### There is no published privacy policy

This is the finding. Searched exhaustively:

- **No route.** No `src/pages/privacy*`, `terms*`, `legal*`, or `cookie*` — `find` over
  `src/pages/` and `public/` returned nothing.
- **No static file.** `public/` contains only images, icons, `robots.txt`, `sitemap.xml`,
  and department asset folders.
- **No footer link.** `src/modules/Footer/Footer.tsx` links Cal State LA, ASI, clubs,
  employment, events, Digital Accessibility (line 237), and public documents (line 268).
  There is no privacy or terms link.
- **The codebase already knows.** `src/pages/contact/index.tsx:24-26`:

  ```
  // TODO: replace '#' with Cal State LA's privacy policy URL (confirm the exact
  // link with the campus privacy office) or a U-SU privacy page once one exists.
  // const PRIVACY_POLICY_URL = '#';
  ```

  and the link that would have used it is commented out at lines 449-450. Someone
  reached this exact conclusion and stopped, correctly, rather than shipping a dead link.

### What this means for the audit

The brief said to assume nothing is disclosed unless the published privacy policy says
it is. With no policy, **every item in §§1-5 is undisclosed**. A discrepancy table
comparing stated versus actual behavior cannot be built, because there are no statements
to compare against.

The complete set of privacy disclosures on calstatelausu.org today is two paragraphs on
one page:

| Disclosure        | Location                              | What it covers                                                                                                                                  | What it leaves out                                                                                             |
| ----------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Data-use sentence | `src/pages/contact/index.tsx:444-448` | Contact form data is used to review feedback and improve services; not sold; shared with "the service providers that help us operate this form" | Does not name JotForm, Resend, Upstash, or Slack. Does not mention retention. Scoped to the contact form only. |
| reCAPTCHA notice  | `src/pages/contact/index.tsx:455-470` | reCAPTCHA is in use; links Google's privacy policy and terms                                                                                    | Accurate and adequate **for reCAPTCHA**. Covers nothing else.                                                  |

Both appear only on `/contact`. A visitor to any of the other ~60 routes receives no
privacy information at all.

### Undisclosed items, ranked by exposure

Every row is a gap. Ordered by how a plaintiff's firm or an indemnification counterparty
would rank it:

| #   | Undisclosed behavior                                                                    | Where                                                            | Why it ranks here                                                                                                     |
| --- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1   | GA4 collects browsing data on every page and sets a persistent pseudonymous identifier  | `src/pages/_app.tsx:50-61`                                       | Site-wide, pre-interaction, third-party, persistent ID. The canonical CIPA fact pattern.                              |
| 2   | Browsing data goes to Meta CDN on nine pages, including identity-based resource centers | `src/sections/InstagramFeed/InstagramFeed.tsx:28`                | Sensitive-topic inference disclosed to an advertising company.                                                        |
| 3   | Vercel receives pageview and performance telemetry site-wide                            | `src/pages/_app.tsx:126-127`                                     | Lower legal risk (first-party path) but a wholly undisclosed processor.                                               |
| 4   | Contact submissions are copied to JotForm, Resend, Upstash, and sometimes Slack         | `src/pages/api/jotformContact.ts:120-190`                        | Named-individual data to four processors. Partly gestured at by the line 444-448 sentence, but no processor is named. |
| 5   | Visitor IP plus email persist in Upstash with analytics retention                       | `src/lib/ratelimit.ts:10`, `src/pages/api/jotformContact.ts:120` | Directly identifying pair, undisclosed vendor, retention beyond the functional need.                                  |
| 6   | reCAPTCHA profiles visitors on page load, not at submit                                 | `src/pages/contact/index.tsx:433-440`                            | The _existence_ is disclosed (the only thing that is). The _timing_ is not.                                           |
| 7   | Cookies are set at all; no cookie inventory exists                                      | GA, reCAPTCHA, NextAuth                                          | No cookie disclosure of any kind anywhere on the site.                                                                |
| 8   | Event, gallery, and grad photos load from Presence, Cloudinary, Imgur, SmugMug, JotForm | §1C                                                              | Routine CDN exposure, but still undisclosed third-party connections.                                                  |
| 9   | Backoffice authentication via Microsoft Azure AD                                        | `src/pages/api/auth/[...nextauth].js:7-11`                       | Staff-only; lowest exposure. Listed for completeness.                                                                 |

### One thing worth stating plainly

The absence of a policy is what converts otherwise-ordinary engineering choices into
exposure. GA4 with a clear disclosure and a documented lawful basis is a normal thing for
a university auxiliary to run. GA4 with no disclosure anywhere is the thing that gets a
letter. **The cheapest risk reduction available here is not a code change — it is
publishing a policy that describes what §§1-5 documents.**

---

## 7. Recommendations, ranked by risk reduction per unit of effort

Read the flags first: **"Just delete it"** means an engineer can do it today with no
approval. **"Needs a decision"** means someone other than the person writing the code has
to agree, and that person is named.

### Tier 1 — highest return

| #   | Action                                                                                                                                                                                                                                             | Effort                          | Flag                                                                                                                                                                                                                                                      |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Publish a privacy policy** covering §§1-5, and link it from `Footer.tsx` and from `src/pages/contact/index.tsx:449-450` (the link is already written and commented out).                                                                         | Days, mostly writing and review | **Needs a decision** — Executive Director, and Cal State LA's campus privacy office. The `contact/index.tsx:24-25` TODO already identifies them as the right approvers. Possible shortcut: adopt the campus policy by reference if it covers auxiliaries. |
| 2   | **Decide whether GA4 stays.** If it is not being read, delete `react-ga4`, the import at `_app.tsx:5`, and the `useEffect` at lines 50-61 — the top CIPA exposure disappears in one commit, and Vercel Analytics already provides traffic numbers. | Minutes to delete               | **Needs a decision** — whoever reads the GA dashboard. Ask first: has anyone opened it in the last year? If no, it is "just delete it."                                                                                                                   |
| 3   | **Proxy Instagram images.** Serve the bytes through a first-party route, or add the Meta CDN host to `next.config.js:15-22` and render via `next/image`. Removes browser→Meta on nine pages with no visible change.                                | ~half a day                     | **Just do it** — no external approval.                                                                                                                                                                                                                    |

### Tier 2 — meaningful, still cheap

| #   | Action                                                                                                                                                                                                                                                                                                                            | Effort              | Flag                                                                              |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------- |
| 4   | **Hash the rate-limit identifier** at `src/pages/api/jotformContact.ts:120`. A SHA-256 of `${ip}:${email}` rate-limits identically while removing identifying data from Upstash. Consider `analytics: false` at `src/lib/ratelimit.ts:10` unless those dashboards are used.                                                       | ~1 hour             | **Just do it.**                                                                   |
| 5   | **Defer reCAPTCHA to first form interaction** rather than mount, so people reading the phone numbers are not scored. Mount `<ReCAPTCHA>` behind a focus or first-keystroke flag.                                                                                                                                                  | ~2 hours            | **Just do it** — behavior on submit is unchanged.                                 |
| 6   | **Add a Content-Security-Policy** via `headers()` in `next.config.js`. Report-only first. Makes every future tracker fail loudly.                                                                                                                                                                                                 | ~1 day incl. tuning | **Just do it**, but ship report-only first and read the reports before enforcing. |
| 7   | **Run the runtime verification pass** this audit could not: load the deployed site, capture the network log and cookie jar, confirm the GA beacon host, the actual cookie attributes, whether `supabase-js` writes `localStorage` on public pages, and whether Vercel's scripts are genuinely cookieless. Feeds directly into #1. | ~2 hours            | **Just do it.** Do this before the policy is finalized, not after.                |

### Tier 3 — worth doing, lower return

| #   | Action                                                                                                                                                                                                         | Effort      | Flag                                                                                     |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------- |
| 8   | **Make video click-to-play** instead of autoplay (`HeaderWithVideo.tsx:55-90`), so MUX is contacted only on intent. Self-host the three poster images.                                                         | ~half a day | **Needs a decision** — this is a visible design change; Graffix owns the hero treatment. |
| 9   | **Consolidate remote images** onto Supabase or `next/image`, retiring the Imgur, Giphy, SmugMug, Unsplash, and `wallpapers.com` references. Fewer third parties, and less dependence on hosts no one controls. | Incremental | **Just do it**, file by file.                                                            |
| 10  | **Move the Handshake feed token** at `src/pages/api/employment.ts:15` into an environment variable. Hygiene, not privacy — and it stays in git history regardless, so rotate it if it is rotatable.            | ~15 min     | **Just do it.**                                                                          |

### Explicitly out of scope for this pass

Per the brief: no consent management platform is recommended, no cookie banner is
proposed, and no code was modified. Worth noting for whoever picks this up — if
recommendation #2 removes GA4 and #3 proxies the Instagram images, the remaining
browser-side third-party surface is reCAPTCHA on one page and media CDNs. That is a
posture where a banner may not be necessary at all, which is a better outcome than
building consent infrastructure around trackers nobody is reading.

---

## Appendix — verification commands

Re-runnable from the repo root. Each returns nothing if the corresponding class is still
absent.

```bash
# Ad pixels, session replay, chat widgets
grep -rnE "fbq|connect\.facebook|ttq|doubleclick|googleadservices|adsbygoogle|snaptr|_linkedin|licdn|hotjar|clarity|fullstory|logrocket|smartlook|intercom|drift\.com|tawk|zendesk" --include=*.ts --include=*.tsx src/

# Cookies and client storage written by app code
grep -rnE "document\.cookie|js-cookie|cookies-next|nookies|localStorage|sessionStorage|indexedDB" --include=*.ts --include=*.tsx src/

# Iframes and injected scripts
grep -rn "iframe" --include=*.tsx src/
grep -rn "createElement('script')" --include=*.ts --include=*.tsx src/

# Every external host referenced in source
grep -rhoE "https?://[a-zA-Z0-9._-]+" --include=*.ts --include=*.tsx --include=*.json src/ \
  | sed -E 's#https?://##' | sort | uniq -c | sort -rn
```
