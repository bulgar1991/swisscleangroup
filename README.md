# Swiss Clean Group

A cleaning-company website: customers browse services and submit a request for the one they want.

- **Frontend**: Angular (`frontend/`) — static SPA, built with `ng build`.
- **Backend**: Node.js serverless functions (`api/`) — no server process, each file becomes an on-demand Vercel Function.
  - `GET /api/services` — returns the list of services.
  - `POST /api/request` — validates a request submission and confirms receipt (no database/email wired up yet).

## Project structure

```
.
├── api/
│   ├── _lib/services-data.js   # shared data (not deployed as an endpoint, "_" prefix)
│   ├── services.js             # GET /api/services
│   └── request.js              # POST /api/request
├── frontend/                   # Angular app
└── vercel.json                 # tells Vercel how to build the frontend + serve /api
```

## Run locally

Install dependencies once:

```bash
cd frontend
npm install
```

To exercise the full app (frontend + API) exactly as it runs on Vercel, use the Vercel CLI from the project root:

```bash
npm i -g vercel   # once
vercel login      # once, links to your Vercel account
vercel dev
```

This serves the Angular build and the `/api` functions together on one local URL.

Alternatively, run just the Angular dev server (`cd frontend && npm start`) — it proxies `/api/*` requests to `http://localhost:3000` (see `frontend/proxy.conf.json`), so pair it with `vercel dev` running in another terminal if you want live-reload on the frontend while still hitting real functions.

## Build

```bash
cd frontend
npm run build
```

Output goes to `frontend/dist/frontend/browser`, which is what `vercel.json` points to.

## Deploy to Vercel

From the project root:

```bash
vercel        # first deploy, follow the prompts (link/create a project)
vercel --prod # promote to production
```

Or import the repo/folder directly in the Vercel dashboard — it will pick up `vercel.json` automatically (build command, output directory, and the `api/` functions need no extra config).

## What to test after deploying

1. Open the deployed URL — the home page should list 6 services (confirms `GET /api/services` works).
2. Click "Choose this service" on any card, fill in the form, and submit (confirms `POST /api/request` works and client-side validation/error messages behave).
3. Try submitting with an invalid email or missing phone to see the 400 validation errors surfaced in the form.
4. Refresh the page while on a `/request/<service-id>` URL — it should still load correctly (this is what the `vercel.json` rewrite to `index.html` is for, since Angular handles routing client-side).

## Extending later

- `api/request.js` currently just validates and acknowledges the request. To actually notify someone, add an email provider (e.g. Resend, SendGrid) or a database write there.
- Service data lives in `api/_lib/services-data.js` — edit that single file to add/change services.
