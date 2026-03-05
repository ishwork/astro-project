import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MovieStore {
  favorites: string[];
  watchlist: string[];
  query: string;
  minRating: number;
  showFavoritesOnly: boolean;
  showWatchlistOnly: boolean;
  setQuery: (query: string) => void;
  setMinRating: (rating: number) => void;
  setShowFavoritesOnly: (enabled: boolean) => void;
  setShowWatchlistOnly: (enabled: boolean) => void;
  toggleFavorite: (movieId: string) => void;
  toggleWatchlist: (movieId: string) => void;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set) => ({
      favorites: [],
      watchlist: [],
      query: '',
      minRating: 0,
      showFavoritesOnly: false,
      showWatchlistOnly: false,
      setQuery: (query) => set({ query }),
      setMinRating: (minRating) => set({ minRating }),
      setShowFavoritesOnly: (showFavoritesOnly) => set({ showFavoritesOnly }),
      setShowWatchlistOnly: (showWatchlistOnly) => set({ showWatchlistOnly }),
      toggleFavorite: (movieId) =>
        set((state) => {
          const exists = state.favorites.includes(movieId);
          return {
            favorites: exists
              ? state.favorites.filter((id) => id !== movieId)
              : [...state.favorites, movieId],
          };
        }),
      toggleWatchlist: (movieId) =>
        set((state) => {
          const exists = state.watchlist.includes(movieId);
          return {
            watchlist: exists
              ? state.watchlist.filter((id) => id !== movieId)
              : [...state.watchlist, movieId],
          };
        }),
    }),
    {
      name: 'movie-store',
      partialize: (state) => ({ favorites: state.favorites, watchlist: state.watchlist }),
    }
  )
);
