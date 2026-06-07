# TaskFlow — Web

The frontend for TaskFlow. Built with React, Vite, and Tailwind CSS. Talks to the API over REST.

## Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v3](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) for API calls

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:3000` |

See `.env.example` for reference.

## Folder Structure

```
src/
├── components/
│   ├── TaskCard.jsx        # Single task display
│   ├── TaskForm.jsx        # Create/edit form
│   └── TaskList.jsx        # List of TaskCards
├── pages/
│   └── Home.jsx            # Main page
├── services/
│   └── api.js              # Axios instance + API calls
├── App.jsx
└── main.jsx
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server at localhost:5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Design Notes

The UI uses a soft neutral palette with subtle shadows and smooth transitions. Tasks are displayed as cards in a two-column grid on desktop, single column on mobile. Completed tasks are visually dimmed with a strikethrough title.
