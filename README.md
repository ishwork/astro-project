# Trending Movies Explorer

Astro pre-renders movie data from TMDB and hydrates a React UI for interactive searching and filtering.

🔗 **Live:**

- Vercel: [https://movie-nest-mu.vercel.app](https://movie-nest-mu.vercel.app)

## Architecture Features

- Astro pre-renders popular movies from https://api.themoviedb.org (TMDB)
- React search and filter UI (search text, minimum rating, favorites-only, watchlist-only)
- Zustand global state for favorites, watchlist, and filters
- Favorites and watchlist are persisted with Zustand `persist`
- Dynamic movie details pages at `/movies/[id]`
- Front page cards include title, year, rating, and genres

## Detailed Architecture

- Build-time data fetching: `src/pages/index.astro` calls `getTrendingMovies()` from `src/lib/getTrendingMovies.ts` to pre-render the home page with TMDB popular movies and mapped genres.
- Static routing layer: Astro renders `/` with `src/components/Home.astro` and generates dynamic paths for `/movies/[id]` in `src/pages/movies/[id].astro` via `getStaticPaths()`.
- Interactive UI island: `src/components/MovieExplorer.tsx` is hydrated with `client:load`, then handles search, rating filter, favorites-only, and watchlist-only filtering on the client.
- Client state management: `src/stores/movieStore.ts` (Zustand + `persist`) stores favorites/watchlist in browser storage and keeps transient filter UI state in memory.
- Shared presentation shell: `src/layouts/Layout.astro` plus style files in `src/styles/` provide global page and component styling for list and detail pages.

### Project Structure

```text
|-- astro.config.mjs        # Astro runtime/build configuration
|-- package.json            # Scripts and dependency manifest
|-- README.md               # Project documentation
|-- tsconfig.json           # TypeScript compiler configuration
|-- public/                 # Static files
|-- src/                    # Application source code
	|-- assets/             # Static assets imported by source files
	|-- components/         # UI building blocks (Astro + React)
	|-- layouts/            # Shared page layout wrappers
	|-- lib/                # API/data-fetching and utility helpers
	|-- pages/              # File-based routes for Astro
	|-- stores/             # Zustand client state stores
	|-- styles/             # SCSS styles for pages/components
	|-- types/              # Shared TypeScript model definitions
```

## Setup

1. Install dependencies:ß

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