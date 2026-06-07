# Contributing — Web

## Branching

- `main` — stable, deployable
- `feat/<name>` — new features
- `fix/<name>` — bug fixes

Open a PR into `main`. Squash merge preferred to keep history clean.

## Code Style

- ESLint + Prettier are configured at the repo root. Run `npm run lint` before pushing.
- Components are function components only — no class components.
- One component per file. File name matches the component name (PascalCase).
- Prefer named exports over default exports, except for page-level components.

## Component Guidelines

- Keep components small. If JSX exceeds ~60 lines, consider splitting.
- No business logic inside JSX. Extract handlers above the return statement.
- Prop types should be documented with JSDoc comments if not using TypeScript.

## Adding a New Feature

1. Create your branch: `git checkout -b feat/my-feature`
2. Build the component(s) in `src/components/`
3. Add or update the API call in `src/services/api.js` if needed
4. Wire it up in `Home.jsx`
5. Run `npm run lint` and fix any issues
6. Open a PR with a short description of what changed and why

## Commit Message Format

```
type: short description

Examples:
feat: add task priority selector
fix: prevent form submit on empty title
chore: update tailwind to v3.4
```
