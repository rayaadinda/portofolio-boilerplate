# Customization Guide

## Content Model

This project is config-driven.

- Primary content source: `config/site.ts`
- Reusable links: `config/urls.ts`

Avoid hardcoding landing-page copy in section components.

## Add or Edit Projects

Update `siteConfig.projects.projects` in `config/site.ts`.

Project item shape:

```ts
{
  title: string
  description: string
  image?: string
  video?: string
  github?: string
  livePreview?: string
}
```

Use either `image` or `video` for each project item.

## Theme and Colors

Edit `app/globals.css` theme variables.

- Colors use OKLCH
- Keep contrast high for readability
- Keep `focus-ring` utility for keyboard accessibility

## Motion

Use Motion through this import style:

```ts
import * as m from "motion/react-m"
```

Prefer variant-based animations for consistent motion behavior.

## Header and Navigation

Edit `siteConfig.header.nav` and `siteConfig.header.button` in `config/site.ts`.

For external links, use `target="_blank" rel="noopener noreferrer"`.

## SEO and Domain

Set the canonical domain in `config/urls.ts` via `urls.public`.

This value is used by:

- metadata canonical URL
- sitemap
- robots
- structured data

## Image Hosts

If you use a new image CDN, add it to `images.remotePatterns` in `next.config.ts`.
