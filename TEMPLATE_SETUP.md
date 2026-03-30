# Template Setup

Use this checklist to turn the template into your own portfolio.

## 1) Install

```bash
npm install
npm run dev
```

## 2) Configure URLs

Edit `config/urls.ts`:

- `public`: your deployed domain, for example `https://yourname.dev`
- `bookCall`: scheduling link
- `resume`: public resume URL
- `github` and `linkedin`: your profile URLs

## 3) Update Content

Edit `config/site.ts`:

- metadata and SEO copy
- hero section text and actions
- projects array
- experience entries
- activity entries
- connect section email and socials

## 4) Replace Assets

Replace these files with your own visuals:

- `public/avatar.jpg`
- `public/hero.jpg`

## 5) Configure Contact API

Create `.env.local` from `.env.example`.

- Set `RESEND_API_KEY` to enable email delivery
- Set `CONTACT_EMAIL` as recipient address

If `RESEND_API_KEY` is not set, the endpoint still validates and accepts requests but does not send emails.

## 6) Verify

```bash
npm run lint
npm run build
```

## 7) Deploy

Deploy to Vercel or your preferred host, then confirm `urls.public` matches the deployed domain.
