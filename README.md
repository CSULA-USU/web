# U-SU Website (Cal State LA)

![License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-Framework-black)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)

Official repository for the California State LA University-Student Union (U-SU) website.

This application powers student-facing content including programs, events, services, and campus resources. The project emphasizes accessibility, responsive design, and maintainable component architecture.

## Tech Stack

- **Framework:** Next.js (React)
- **Language:** TypeScript
- **Package Manager:** Yarn
- **Deployment:** Vercel

## Getting Started

1. Clone the Repository

```bash
git clone https://github.com/<your-org>/<repo-name>.git
cd <repo-name>
```

2. Use Correct Node Version

```bash
nvm use
```

3. Install Dependencies

```bash
yarn
```

4. Start Development Server

```bash
yarn dev
```

Visit: http://localhost:3000

## Environment Variables

Credentials are injected via a local `.env.local` file (gitignored) and via
Vercel's project settings for deployed environments.

The variables below cover the **contact / feedback form** flow. Other
integrations (Notion, Supabase, Upstash, MUX, Instagram, Azure AD) require
their own variables — this list is not exhaustive.

| Variable                  | Required | Purpose                                                                                                                                 |
| ------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `CONTACT_JOTFORM_API_KEY` | Yes      | JotForm API key used to record contact submissions.                                                                                     |
| `CONTACT_JOTFORM_FORM_ID` | Yes      | JotForm form ID that submissions are posted to.                                                                                         |
| `RECAPTCHA_SECRET_KEY`    | Yes      | Server-side reCAPTCHA secret used to verify the submission token.                                                                       |
| `RESEND_API_KEY`          | Yes      | Resend API key for the feedback notification + confirmation emails.                                                                     |
| `FEEDBACK_FROM_EMAIL`     | No       | From address for feedback emails. Defaults to `U-SU Feedback <noreply@calstatelausu.org>`.                                              |
| `FEEDBACK_NOTIFY_EMAILS`  | No       | Comma-separated admin recipients. Falls back to the in-code default list.                                                               |
| `SLACK_ALERT_WEBHOOK_URL` | No       | Slack incoming-webhook URL. When set, a feedback email failure posts an alert here. Unset = no Slack alert (failures are still logged). |
| `ENABLE_UKREW_API`        | No       | Set to `true` to re-enable `/api/jotformUKrew`. Unset (the default) makes the route return 404.                                         |

## Project Structure

```bash
/pages          → Next.js routes
/modules        → Feature-based modules
/components     → Reusable UI components
/styles         → Theme + global styles
/public         → Static assets
```

## Editing Tenants

Tenants on `/about/tenants` are a single array in `src/pages/about/tenants.tsx`.
Everything on a tenant except `name`, `category`, `schemaType`, `description`,
and `logoSrc` is optional — a card only renders the rows it has data for, so
leaving a field off is safe. Do not fill a field with a placeholder or a guess:
the same values are emitted as schema.org structured data, so a guess is
published to Google as fact.

Cards render in alphabetical order regardless of the order of the array, so a new
tenant can be appended anywhere.

### Location in the building

`locationInBuilding` is where in the U-SU the tenant sits. It appears **in the
modal only** — the card stays a short pitch — and is appended to the street
address in the structured data:

```ts
locationInBuilding: '3rd Floor', // or 'Room 204', 'Level 1, Food Court'
```

That means the value has to read sensibly as part of an address. `'Room 204'`
becomes `5154 State University Dr, Room 204`, which is correct. Wayfinding prose
like `'next to the escalators'` would look fine in the modal but produce nonsense
in the address Google reads — if you want prose as well, it needs a separate
field that stays out of the structured data.

The building's own address stays room-free, since the U-SU is not itself located
in Room 204. Matches the pattern on the `ccc/gsrc` and `csi/fsl` pages.

### Website link text

`website` is the href. By default the link shows the URL with the protocol,
`www.`, and any trailing slash stripped — fine for `sbarro.com`, bad for a long
path that wraps awkwardly on a phone. `websiteText` overrides just the visible
label:

```ts
website: 'https://www.calstatela.edu/deanofstudents/cal-state-la-food-pantry',
websiteText: 'Food Pantry page',
```

Make it say where the link goes. The visible text is what a screen reader
announces, so `'Food Pantry page'` is useful where `'here'` or `'link'` is not.
Only the label changes — `website` is still what gets published to Google as
`url`.

### Header image

`headerImage` is one photo of the space, shown in the modal between the name and
the description:

```ts
headerImage: {
  src: 'https://…/Food%20Pantry%201200x600.jpg',
  alt: 'Food Pantry volunteers distributing food to students at the 3rd floor of the U-SU',
},
```

- **`alt` must be real description.** The logos use `alt=""` because the tenant's
  name sits right beside them, so they are decorative. A photo carries
  information nothing else on the page does, so an empty `alt` would be wrong
  here. The type makes it required.
- **Roughly 2:1 landscape works best.** The banner follows the image's own aspect
  ratio, so a tall or square photo gets cropped to a 320px ceiling.
- **It is published to Google**, appended to the tenant's `image` array after the
  logo. Only use an image meant to be public.
- Supabase-hosted images work — `bubqscxokeycpuuoqphp.supabase.co` is already in
  `images.domains` in `next.config.js`. A host that is not on that list will
  fail.

### Hours

`hours` is stored the way schema.org wants it — full day names, 24-hour times,
ISO dates — and reformatted for display, so the visible hours and the indexed
hours can never disagree.

```ts
hours: [
  {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: '07:00', // 24-hour 'HH:MM'
    closes: '19:00',
    validFrom: '2026-08-24', // 'YYYY-MM-DD'
    validThrough: '2026-12-18',
  },
  {
    days: ['Friday'],
    opens: '07:00',
    closes: '15:30',
    validFrom: '2026-08-24',
    validThrough: '2026-12-18',
  },
],
```

| Field                        | Notes                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `days`                       | Full names (`'Monday'`). Omit a day to mean closed — there is no "closed" entry. |
| `opens` / `closes`           | 24-hour `'HH:MM'`. `'00:00'` is midnight, `'12:00'` is noon.                     |
| `validFrom` / `validThrough` | Optional, independent. Scope each span to the term it covers.                    |

How it renders:

- Spans sharing a validity window group under one caption, so term hours do not
  repeat the dates on every row.
- Consecutive days collapse (`Mon–Thu`); split weeks stay listed (`Mon, Wed, Fri`).
- `:00` is dropped, so `'19:00'` reads as `7 PM`.
- Captions read `Aug 24 – Dec 18, 2026`, `From Jan 20, 2027`, or
  `Through Dec 18, 2026` depending on which bounds are set.
- A span with no dates is labeled `Year-round`, but only when another span on
  that tenant _is_ dated — otherwise captions are dropped entirely.

**Dated hours expire silently.** Once `validThrough` passes, the span still
renders and is still indexed; nothing warns you. Add the next window at each
term rollover.

## Accessibility

Accessibility is a priority for this project. Development follows WCAG best practices, including semantic HTML, keyboard navigation, and regular audits using tools such as WAVE.

## Contributing

This repository is primarily maintained by the U-SU Web Team.

If you are part of the team:

- Follow existing patterns and conventions
- Use meaningful commit messages
- Avoid introducing unused dependencies
- Always follow DRY principles
- Test changes before submitting PRs

## License

This project is licensed under the MIT License.

See the [LICENSE](./LICENSE) file for details.

## Usage Notice

This repository is maintained for internal use by the U-SU Web Team.

While the code is available under the MIT License, external use, modification, or redistribution is not officially supported.

## Maintainers

- U-SU Web Team

## Live Site

https://www.calstatelausu.org/
