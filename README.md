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
