# Contributing — API

## Branching

Same convention as the frontend:

- `main` — stable
- `feat/<name>` — new features
- `fix/<name>` — bug fixes

## Code Style

- No semicolons (configured in ESLint).
- `const` over `let`; never `var`.
- Arrow functions for callbacks; named functions for route handlers (easier stack traces).
- All route handlers must have a `try/catch`. Never let an unhandled rejection crash the server.

## Adding a New Route

1. Add the handler to `src/routes/tasks.js` (or create a new route file for a new resource).
2. Register the route file in `src/index.js`.
3. Document the new endpoint in `ARCHITECTURE.md` — method, path, request body, response shape, error cases.
4. Test it manually with curl or a REST client before opening a PR.

## Error Handling Convention

Always return JSON errors, never plain text:

```js
// Good
res.status(400).json({ error: 'Title is required' })

// Bad
res.status(400).send('Title is required')
```

HTTP status codes to use:

| Situation | Status |
|---|---|
| Missing or invalid input | 400 |
| Resource not found | 404 |
| Unexpected server error | 500 |

## Commit Message Format

```
type: short description

Examples:
feat: add GET /tasks endpoint
fix: return 404 when task not found
chore: add nodemon to devDependencies
```
