# TaskFlow

A full-stack task manager built with React and Node.js. Users can create, view, update, and delete tasks.

## Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** SQLite (via better-sqlite3)

## Project Structure

```
taskflow/
├── apps/
│   ├── web/       # React frontend
│   └── api/       # Express backend
└── README.md
```

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Install

```bash
# Install dependencies for both apps
cd apps/api && npm install
cd ../web && npm install
```

### Run

```bash
# Terminal 1 — start the API
cd apps/api && npm run dev

# Terminal 2 — start the frontend
cd apps/web && npm run dev
```

The frontend runs at `http://localhost:5173` and the API at `http://localhost:3000`.

## Features

- Create a task with a title and optional description
- Mark tasks as complete or incomplete
- Delete tasks
- Clean, responsive UI
