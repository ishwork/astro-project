# Trending Movies Explorer

Astro pre-renders movie data from TMDB and hydrates a React UI for interactive searching and filtering.

🔗 **Live:**

- Vercel: [https://movie-nest-mu.vercel.app](https://movie-nest-mu.vercel.app)

## Features

- Astro pre-renders popular movies from https://api.themoviedb.org (TMDB)
- React search and filter UI (search text, minimum rating, favorites-only, watchlist-only)
- Zustand global state for favorites, watchlist, and filters
- Favorites and watchlist are persisted with Zustand `persist`
- Dynamic movie details pages at `/movies/[id]`
- Front page cards include title, year, rating, and genres

## Setup

1. Install dependencies:

```sh
npm install
```

2. Create a `.env` file in the project root and add your TMDB key:

```env
TMDB_API_KEY=your_tmdb_api_key
```

3. Start development server:

```sh
npm run dev
```

## Routes

- `/` → popular movies list with filters, favorites, watchlist
- `/movies/[id]` → movie details page with a back button to home

## Scripts

| Command | Action |
| :-- | :-- |
| `npm run dev` | Start local dev server |
| `npm run build` | Build production site |
| `npm run preview` | Preview production build |
| `npm run format` | Format project files |

## Technologies used

- Astro (static generation + routing)
- React (interactive UI)
- Zustand (global state management)
- TypeScript (typed app models and API helpers)
- Sass (component and layout styling)
- TMDB API (movie and genre data source)