# Deployment

This is a course project and is not expected to be deployed to production. This document describes how you *would* deploy it if needed.

## Local (Development)

```bash
npm install
cp .env.example .env
npm run dev
```

Runs on `http://localhost:3000`. The SQLite database file (`taskflow.db`) is created in the project root automatically.

## Production (Manual VPS)

1. SSH into your server.
2. Clone the repo and `cd apps/api`.
3. Run `npm install --omit=dev`.
4. Set environment variables (copy `.env.example` → `.env` and fill in values).
5. Start the server with a process manager:

```bash
npm install -g pm2
pm2 start src/index.js --name taskflow-api
pm2 save
pm2 startup   # follow the printed instructions to auto-start on reboot
```

## Environment Variables (Production)

| Variable | Value |
|---|---|
| `PORT` | `3000` (or whatever your reverse proxy forwards to) |
| `CLIENT_URL` | Your frontend's production URL, e.g. `https://taskflow.example.com` |

## Notes

- The SQLite `.db` file is not committed to git. Back it up manually if the data matters.
- For a real production app, replace SQLite with PostgreSQL and use a managed database service.
- Serve the frontend's build output (`apps/web/dist`) from a static host (Vercel, Netlify, or Nginx) and point `VITE_API_URL` at the deployed API.
