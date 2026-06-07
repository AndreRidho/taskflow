# API Architecture

## Overview

A thin Express REST API over a SQLite database. No ORM, no queue, no cache — just Express route handlers calling `better-sqlite3` directly.

## Request Lifecycle

```
Client → Express → CORS middleware → Route handler → SQLite → JSON response
```

Errors are caught in each route handler and returned as `{ error: "message" }` with an appropriate HTTP status code.

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT    NOT NULL,
  description TEXT,
  completed   INTEGER NOT NULL DEFAULT 0,   -- 0 = false, 1 = true
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);
```

SQLite stores booleans as integers. The API serializes `completed` as a proper JS boolean before sending responses.

## Endpoints — Request & Response Shapes

### GET /tasks
Returns all tasks ordered by creation date descending.

**Response 200**
```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "created_at": "2024-03-15T10:00:00"
  }
]
```

### POST /tasks
**Request body**
```json
{
  "title": "Buy groceries",       // required
  "description": "Milk, eggs"     // optional
}
```
**Response 201** — the created task object.
**Response 400** — if `title` is missing or empty.

### PATCH /tasks/:id
**Request body** — any subset of:
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```
**Response 200** — the updated task object.
**Response 404** — if the task does not exist.

### DELETE /tasks/:id
**Response 204** — no body.
**Response 404** — if the task does not exist.

## Key Decisions

**Why SQLite?**
Zero setup. The database is a single file that gets created on first run. More than sufficient for a course project with one user.

**Why better-sqlite3 over sqlite3?**
The synchronous API eliminates callback/promise boilerplate in route handlers. For a small app with no concurrency requirements, the synchronous driver is simpler and equally fast.

**Why no ORM?**
The schema is one table. Writing raw SQL is faster to read and debug than mapping through an ORM abstraction for three queries.
