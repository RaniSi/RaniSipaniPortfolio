# Rani Portfolio

Portfolio website for **Rani Sipani** — a designer from Rajasthan, India.

Built with **React 19 + Vite 7 + Tailwind CSS 4**, deployed on **Vercel**.

## Getting started

```bash
npm install
npm run dev
```

## Contact form (Resend)

The contact form is powered by **Resend**, through a small Vercel serverless function in [`api/contact.js`](./api/contact.js).

Requirements:

1. **Add your Resend API key to Vercel** — in your project:
   `Settings → Environment Variables`, add:

   | Variable | Value |
   |---|---|
   | `RESEND_API_KEY` | `re_...` (from https://resend.com/api-keys) |
   | `RESEND_FROM_EMAIL` | `onboarding@resend.dev` (or your verified domain) |
   | `RESEND_TO_EMAIL` | `ranisipani879@gmail.com` (where messages are delivered) |

2. **Deploy** — Vercel automatically detects `api/contact.js` as a serverless function.
   The SPA rewrite in `vercel.json` already excludes `/api/*`.

### Testing locally

Add your Resend credentials to a `.env` file in the project root (already
git-ignored):

```
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=ranisipani879@gmail.com
```

Then run the API dev server and the Vite dev server side by side:

```bash
npm run dev:api    # terminal 1 — serves api/contact.js at http://localhost:3000
npm run dev        # terminal 2 — Vite proxies /api to localhost:3000
```

> **Note:** `npm run dev:api` uses the tiny Node server in
> [`api/dev-server.mjs`](./api/dev-server.mjs), so the Vercel CLI is not
> required. If you prefer, `vercel dev` works too.

> **Note:** with the default `onboarding@resend.dev` sender, Resend only allows
> sending to the email registered on your Resend account. To send to any address,
> add and verify your own domain in Resend and set `RESEND_FROM_EMAIL`.

## Available scripts

- `npm run dev` — start the Vite dev server
- `npm run dev:api` — start the contact-form API at http://localhost:3000
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — ESLint check
