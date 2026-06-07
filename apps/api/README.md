# TaskFlow — API

The backend for TaskFlow. A REST API built with Express and SQLite. Handles all CRUD operations for tasks.

## Stack

- [Node.js 18+](https://nodejs.org/)
- [Express 4](https://expressjs.com/)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — synchronous SQLite driver
- [cors](https://www.npmjs.com/package/cors) — cross-origin support for the frontend

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

The database file (`taskflow.db`) is created automatically on first run. No migration step needed.

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Port the server listens on | `3000` |
| `CLIENT_URL` | Allowed CORS origin | `http://localhost:5173` |

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/tasks` | Return all tasks |
| POST | `/tasks` | Create a new task |
| PATCH | `/tasks/:id` | Update a task (title, description, completed) |
| DELETE | `/tasks/:id` | Delete a task |

See `ARCHITECTURE.md` for request/response shapes.

## Folder Structure

```
src/
├── db.js           # SQLite connection + table init
├── routes/
│   └── tasks.js    # All /tasks route handlers
└── index.js        # Express app setup + server start
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start with nodemon (auto-restart on change) |
| `npm start` | Start without nodemon (production) |
