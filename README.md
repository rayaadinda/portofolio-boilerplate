# rayaadinda

Modern portfolio boilerplate built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Motion.

This template is config-driven: update content in `config/site.ts` and `config/urls.ts` without rewriting layout components.

## Features

- Single-page landing architecture with modular sections
- Dynamic projects index and `/projects/[slug]` detail pages
- Responsive contact dialog (desktop) and drawer (mobile)
- Contact API with Zod validation, honeypot protection, and IP rate limiting
- Motion-powered section transitions with reusable variants
- Tailwind v4 + OKLCH theme variables
- SEO defaults: metadata, structured data, sitemap, robots

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4
- Motion
- Radix UI / shadcn-style components

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build and Lint

```bash
npm run lint
npm run build
npm run start
```

## First Customizations

1. Update personal and social links in `config/urls.ts`.
2. Edit hero, projects, experience, activities, and metadata in `config/site.ts`.
3. Replace `public/avatar.jpg` and `public/hero.jpg` with your own assets.
4. Set environment variables from `.env.example`.

## Environment Variables

Create `.env.local` and copy values from `.env.example`.

- `CONTACT_EMAIL`: recipient for contact form emails
- `RESEND_API_KEY`: optional, enables email delivery through Resend

If `RESEND_API_KEY` is not set, submissions are accepted without sending emails.

## Project Structure

- `app/`: routes, layout, sitemap/robots, and API handlers
- `components/landing/`: landing page sections
- `components/ui/`: UI primitives
- `components/providers/`: app providers
- `config/`: centralized content and URLs
- `lib/`: shared utility helpers

## Additional Docs

- `TEMPLATE_SETUP.md`
- `CUSTOMIZATION_GUIDE.md`
- `API_SECURITY.md`
- `CONTRIBUTING.md`

## Deployment

Deploy on Vercel or any Node-compatible hosting provider.

After deployment, update `urls.public` in `config/urls.ts` to your real domain.

## License

MIT License. See `LICENSE`.
