# Copilot Instructions for rayaadinda

## Project Overview

This is a Next.js 16 portfolio site (App Router) using React 19, TypeScript, Tailwind CSS v4, and Motion.
The project follows a config-driven, single-page architecture for landing content.

## Architecture

### Config-Driven Content

All portfolio content is centralized in `config/site.ts` under `siteConfig`.
Do not hardcode landing content in section components.

Use `siteConfig` for:
- hero copy and CTAs
- projects, experience, and activities
- header navigation and social links
- SEO metadata

### Component Boundaries

- Landing sections: `components/landing/`
- UI primitives: `components/ui/` (shadcn-style)
- Shared providers: `components/providers/`
- App routes and APIs: `app/`

### Client vs Server Components

Default to Server Components. Add `"use client"` only for hooks, local state, or browser APIs.

## Build and Validation

Run these from the repo root:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

No dedicated automated test suite is currently defined in `package.json`.

## Conventions

### Motion

- Import motion as `import * as m from "motion/react-m"`
- Use `m.div`, `m.section`, etc. (not `motion.div`)
- Keep animation patterns variant-based and reusable

### Styling

- Tailwind CSS v4 with theme variables in `app/globals.css`
- Keep colors in OKLCH where theme variables are defined
- Use the shared `focus-ring` utility for focus states
- Use `cn()` from `lib/utils.ts` for class merging

### Links and Accessibility

- External links must include `target="_blank" rel="noopener noreferrer"`
- Preserve keyboard-visible focus styles

### Content and Data

- Projects should use either `image` or `video`, not both
- Update navigation/content through `config/site.ts`
- Keep reusable URLs centralized in `config/urls.ts`

## API Notes

`app/api/contact/route.ts` includes:
- Zod validation
- rate limiting (5 requests / 10 minutes / IP)
- honeypot field (`website`)
- optional Resend integration via `RESEND_API_KEY`

## Common Pitfalls

- Hardcoding text in components instead of using `siteConfig`
- Importing Motion from the wrong entrypoint
- Adding `"use client"` to components that can remain server-rendered
- Forgetting to add new image host patterns in `next.config.ts` when introducing a new CDN

## Key Files

- `config/site.ts`: Source of truth for portfolio content and metadata
- `app/page.tsx`: Main landing composition
- `app/projects/[slug]/page.tsx`: Project detail routing + metadata generation
- `app/api/contact/route.ts`: Contact endpoint security and validation
- `components/contact-dialog.tsx`: Responsive dialog/drawer interaction pattern
- `components/providers/providers.tsx`: Provider composition order
