# API Security Notes

This project includes a contact endpoint at `app/api/contact/route.ts`.

## Validation

Request body is validated with Zod:

- `name`: 2-80 characters
- `email`: valid email, max 120
- `company`: optional, max 120
- `message`: 10-2000 characters
- `website`: honeypot field, must stay empty

## Rate Limiting

In-memory IP limiter:

- 5 requests per IP
- 10-minute rolling window

On limit exceed, response is HTTP 429.

## Bot Protection

Honeypot field `website` rejects likely bot submissions when filled.

## Email Delivery

Email is sent only when both are configured:

- `RESEND_API_KEY`
- `CONTACT_EMAIL`

If `RESEND_API_KEY` is set but `CONTACT_EMAIL` is missing, API returns HTTP 500 with a configuration error message.

## Production Notes

- For serverless multi-instance deployments, replace in-memory limiter with shared storage (Redis/Upstash/KV).
- Keep `replyTo` value validated and never interpolate untrusted values into headers.
