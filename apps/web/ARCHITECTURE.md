# Frontend Architecture

## Overview

The frontend is a single-page application (SPA) built with React and Vite. It is intentionally simple — no global state manager, no router beyond a single page, no component library. Everything is props-down, events-up.

## Data Flow

```
Home.jsx  (owns all state)
│
├── TaskForm.jsx       → calls onSubmit(newTask) → POST /tasks
│
└── TaskList.jsx
    └── TaskCard.jsx   → calls onToggle(id)     → PATCH /tasks/:id
                       → calls onDelete(id)     → DELETE /tasks/:id
```

State lives entirely in `Home.jsx` as a single `tasks` array. Every mutation (create, toggle, delete) hits the API first, then updates local state on success. There is no optimistic updating — simplicity over perceived performance.

## API Layer

All API calls are centralised in `src/services/api.js`. It exports four functions:

| Function | Method | Endpoint |
|---|---|---|
| `getTasks()` | GET | `/tasks` |
| `createTask(data)` | POST | `/tasks` |
| `updateTask(id, data)` | PATCH | `/tasks/:id` |
| `deleteTask(id)` | DELETE | `/tasks/:id` |

The base URL is read from `import.meta.env.VITE_API_URL` so it can be changed per environment without touching code.

## Styling Approach

Tailwind utility classes only — no custom CSS files. A consistent design language is maintained through:

- **Colors:** Slate neutrals for backgrounds, Violet accents for interactive elements
- **Spacing:** 4px base unit (Tailwind's default scale)
- **Radius:** `rounded-2xl` on cards, `rounded-lg` on buttons and inputs
- **Shadows:** `shadow-sm` at rest, `shadow-md` on hover, animated with `transition-shadow`
- **Typography:** System font stack; `font-semibold` for task titles, `text-sm text-slate-500` for metadata

## Key Decisions

**Why no React Router?**
The app has one screen. Adding a router would be complexity with no benefit.

**Why no Redux / Zustand?**
State is shallow and lives in one component. Prop drilling is one level deep. A state manager would add boilerplate for no gain.

**Why Axios over fetch?**
Axios gives automatic JSON parsing, consistent error objects, and easy base URL configuration. The tradeoff (a small bundle addition) is acceptable.
