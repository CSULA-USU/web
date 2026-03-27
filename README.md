# U-SU Website (Cal State LA)

Official repository for the California State LA University-Student Union (U-SU) website.

This application powers student-facing content including programs, events, services, and campus resources. The project emphasizes accessibility, responsive design, and maintainable component architecture.

## Tech Stack

- Framework: Next.js (React)
- Language: TypeScript
- Package Manager: npm
- Deployment: Vercel

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

Visit:
```bash
http://localhost:3000
```

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

## Maintainers
- U-SU Web Team

## Live Site
```bash
https://www.calstatelausu.org/
```
