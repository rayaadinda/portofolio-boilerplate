# Contributing

Thanks for contributing to Orbit Portfolio Template.

## Development

```bash
npm install
npm run dev
```

## Quality Checks

Before opening a PR:

```bash
npm run lint
npm run build
```

## Conventions

- Keep landing content in `config/site.ts`
- Keep reusable links in `config/urls.ts`
- Prefer server components unless client features are required
- Use `motion/react-m` import style
- Keep external links accessible with `noopener noreferrer`

## Pull Requests

- Describe what changed and why
- Include screenshots for visible UI changes
- Keep scope focused and avoid unrelated refactors
