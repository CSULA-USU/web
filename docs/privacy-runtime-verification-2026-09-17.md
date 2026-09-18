# Runtime privacy verification

**Purpose:** confirm what the deployed site actually does in a browser, so the
privacy policy describes reality rather than intent.

**Companion to:** `docs/third-party-data-inventory.md`, which is static analysis
only. Its "Open questions" section lists what source code cannot settle; the
checks below are how each one gets answered.

**Who fills this in:** anyone with DevTools. No special access needed.
**Time:** about an hour.
**Output:** the results tables, handed to whoever is reviewing the policy draft.

---

## Why this exists

A privacy policy makes factual claims: _we do not use cookies_, _we share data
with these vendors_, _we do not store anything in your browser_. Each of those
is either accurate or it is not, and publishing one that is not is worse than
publishing nothing — so each gets checked before it ships.

Static analysis got us most of the way. It cannot answer what a third-party
script does at runtime, because that script is fetched when the page loads and
is not in this repository. Everything below is one of those cases.

**Each check maps to one sentence the draft policy either can or cannot make.**
That is the only reason any of them are here.

---

## Setup — get this right or the results are worthless

1. **Test a Vercel deployment, not `localhost`.** `/_vercel/insights` only
   exists on Vercel, and edge caching behaves differently, so a local run
   produces a clean result that means nothing.

   **A preview deployment is the right target**, not production. Push the branch
   and Vercel builds one automatically; it runs on the same infrastructure, so
   storage, cookies, third-party hosts and third-party scripts all behave as
   they will once merged — without deploying anything to students.

   Production is the _wrong_ target until the branch lands, because production
   is still serving the pre-remediation code. Testing it would document Google
   Analytics, reCAPTCHA and the direct Meta CDN loads that this work removed.

   One exception: check 3 depends on the analytics beacon actually firing, and
   whether that happens on preview deployments varies. If no beacon request
   appears, do checks 1, 2, 4 and 5 on the preview and defer check 3 until the
   branch is merged.

2. **Use a fresh incognito / private window.** Cookies and storage from earlier
   visits will otherwise look like things the site just set.

3. **Disable ad blockers, uBlock, Privacy Badger, and any privacy extension**,
   including in incognito. This is the one people get wrong: a blocker will stop
   exactly the requests you are trying to observe, and hand you a false all-clear.

4. **Open DevTools before loading the page**, and in the Network tab tick
   **Preserve log** so navigating does not wipe what you captured.

5. Note the **date and the deployed commit** you tested, so the results can be
   tied to a known state of the site.

---

## Check 1 — Does anything write to browser storage?

**The claim this tests:** "We do not store information in your browser."

**Why it is in doubt:** `src/lib/supabase.ts:9` calls `createClient` with no
options, so `persistSession: true` and `autoRefreshToken: true` apply by default
and the client binds `globalThis.localStorage` when it constructs. No public
page ever signs a visitor in, so there should be no session to persist — but the
client still constructs, reads storage, and opens a `BroadcastChannel` on every
public page that loads meeting documents or CMS content. Whether that results in
a key actually being written is not knowable from source.

**How:**

1. Load the homepage.
2. DevTools → **Application** → **Storage** → **Local Storage** → the site origin.
3. Record every key present, or write "none".
4. Repeat for **Session Storage** and **IndexedDB**.
5. Repeat on `/board-of-directors/public-documents`, which reads Supabase from a
   public page.

**Look for:** anything beginning `sb-`, or containing `supabase` or `auth-token`.

| Page                                   | localStorage keys | sessionStorage keys | IndexedDB databases |
| -------------------------------------- | ----------------- | ------------------- | ------------------- |
| `/`                                    |                   |                     |                     |
| `/board-of-directors/public-documents` |                   |                     |                     |
| `/ccc/gsrc`                            |                   |                     |                     |

**If empty everywhere:** the policy can state plainly that the site stores
nothing in the visitor's browser, which is a strong and simple thing to be able
to say.
**If a key appears:** it must be named and explained in the policy.

---

## Check 2 — Are any cookies set?

**The claim this tests:** "This site does not use cookies" — or, if it does, which.

**Why it is in doubt:** the codebase writes no cookies; a search for
`document.cookie`, `Set-Cookie`, `js-cookie`, `cookies-next`, and `nookies`
returns nothing. But `@vercel/analytics` and `@vercel/speed-insights` load their
scripts at runtime from the site's own origin, and those scripts are not in this
repo. Vercel documents both as cookieless. That is their documentation, not a
verified fact about your deployment.

**How:**

1. In the incognito window, load the homepage and wait for it to settle.
2. DevTools → **Application** → **Cookies** → the site origin.
3. Record every cookie: name, domain, expiry, `Secure`, `HttpOnly`, `SameSite`.
4. Repeat on `/contact` and `/ccc/gsrc`.
5. Do **not** visit `/backoffice` — NextAuth sets session cookies there, and
   those are a separate, staff-only story the policy handles differently.

| Cookie name | Domain | Expiry | Secure | HttpOnly | SameSite |
| ----------- | ------ | ------ | ------ | -------- | -------- |
|             |        |        |        |          |          |

**Expected:** none at all on public pages. Anything that appears needs naming.

---

## Check 3 — Does Vercel Analytics record the URL query string?

**The claim this tests:** whether search terms a visitor types leave the site.

**Why it matters:** `/search` reads its query from the URL
(`src/pages/search/index.tsx:101`). The in-page box does not push to the URL, but
arriving at `/search?query=...` from a link or bookmark is normal. If Vercel's
beacon records the full URL, whatever a student searched for — which may be
personal — reaches Vercel.

**Why it is in doubt:** `<Analytics />` at `src/pages/_app.tsx:112` is rendered
with **no props**, so it falls through to the injected script's auto-tracking,
which reads `window.location` at runtime. That script is served from
`/_vercel/insights/script.js` and is not in this repo, so there is no way to
read its behavior from source.

**How:**

1. Navigate to `/search?query=zzverifytest` (a distinctive, harmless string).
2. In the **Network** tab, filter for `insights`.
3. Find the request to `/_vercel/insights/view` (or similar).
4. Inspect its **Payload** / **Request** body.
5. Search that payload for `zzverifytest`.

**Record:** present, or absent.

| Question                         | Result |
| -------------------------------- | ------ |
| Beacon request observed          |        |
| Query string included in payload |        |
| Full URL or path only            |        |

**If present:** the policy must disclose that page URLs including search terms
are sent to Vercel. There is also a code fix available — passing an explicit
`path` to `<Analytics />` strips the query — worth doing regardless.
**If absent:** no disclosure needed, and the `/search` concern raised in the
audit is closed.

---

## Check 4 — What third-party hosts does the browser actually contact?

**The claim this tests:** the vendor list in the policy is complete and correct.

**Why it is in doubt:** two of the remaining hosts come from API responses at
runtime rather than from source. Event photo URLs arrive in the CampusGroups
feed; `next.config.js:16` names `calstatela-cdn.presence.io`, but that allowlist
governs `next/image`, which these images do not use. The actual hostname needs
observing.

**How:**

1. **Preserve log** on, load each page below in turn.
2. Network tab → sort by **Domain**.
3. Record every domain that is **not** `calstatelausu.org`.

Pages to cover, chosen because each pulls a different class of media:

- [ ] `/` — event photos, Supabase backgrounds
- [ ] `/ccc/gsrc` — Instagram feed, resource center page
- [ ] `/contact` — previously the reCAPTCHA page
- [ ] `/events` — event photos at volume
- [ ] `/operations` — MUX video
- [ ] `/ccc/cultural-grads/[any id]` — JotForm grad photos, Imgur headers
- [ ] `/search?query=zzverifytest` — check 3

| Third-party domain | Which pages | What it serves |
| ------------------ | ----------- | -------------- |
|                    |             |                |

**Two specific things to confirm:**

- **No request to `cdninstagram.com` or `fbcdn.net` on `/ccc/gsrc`.** Instagram
  images should now come from `/api/instagram-image` on your own origin. If a
  Meta domain appears, the proxy is not working and that is a regression.
- **No request to `google.com`, `gstatic.com`, or `googletagmanager.com`
  anywhere.** These should be entirely gone.

---

## Check 5 — Confirm no third-party JavaScript

**The claim this tests:** "We do not use third-party analytics, advertising, or
tracking scripts" — the strongest sentence the policy can contain.

**Why verify something already checked:** the audit confirmed this by reading
source. A dependency could still inject a script at runtime that no grep would
catch. This claim is load-bearing enough to be worth observing rather than
inferring.

**How:**

1. Network tab → filter **JS**.
2. Read the domain on every entry.
3. Everything should be `calstatelausu.org` or `/_next/` / `/_vercel/` paths on
   your own origin.

| Any script from a domain that is not yours? |     |
| ------------------------------------------- | --- |
| If yes, which                               |     |

---

## Reconciling with the policy draft

The draft is already with the lawyer, so the job here is confirming or correcting
specific sentences rather than deciding what to write. Take the draft and mark
each of these:

- [ ] **Cookie claim** — does the draft say anything about cookies? Does check 2
      support it exactly as worded?
- [ ] **Storage claim** — if the draft says nothing is stored in the browser,
      does check 1 back that up?
- [ ] **Vendor list** — does every domain from check 4 appear in the draft? The
      server-side processors will not show up in a network log and must be
      carried over from the audit's §1D: JotForm, Resend, Upstash, Notion,
      Supabase, CampusGroups, Handshake, AOA, Azure AD.
- [ ] **Search terms** — does check 3 require a sentence the draft does not have?
- [ ] **Anything the draft claims that no check above covers** — flag it, because
      an unverified claim in a published policy is the specific risk this whole
      exercise exists to avoid.

---

## Results summary

|                                  |     |
| -------------------------------- | --- |
| Date tested                      |     |
| Deployment tested (preview URL)  |     |
| Deployed commit                  |     |
| Tested by                        |     |
| Cookies found                    |     |
| Storage keys found               |     |
| Third-party JS found             |     |
| Third-party domains contacted    |     |
| Query string transmitted         |     |
| Meta CDN absent from `/ccc/gsrc` |     |
| Google domains absent sitewide   |     |
