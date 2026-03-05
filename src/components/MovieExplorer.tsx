import { useMemo } from 'react';

import { formatYear } from '@/lib/utils';
import { useMovieStore } from '@/stores/movieStore';
import type { Movie } from '@/types/movie';
import '@/styles/movie-explorer.scss';

interface MovieExplorerProps {
  movies: Movie[];
}

const MovieExplorer = ({ movies }: MovieExplorerProps) =>  {
  const {
    favorites,
    watchlist,
    query,
    minRating,
    showFavoritesOnly,
    showWatchlistOnly,
    setQuery,
    setMinRating,
    setShowFavoritesOnly,
    setShowWatchlistOnly,
    toggleFavorite,
    toggleWatchlist,
  } = useMovieStore();

  const visibleMovies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return movies.filter((movie) => {
      const matchesQuery =
        !normalizedQuery ||
        movie.title.toLowerCase().includes(normalizedQuery) ||
        movie.overview.toLowerCase().includes(normalizedQuery);
      const matchesRating = movie.voteAverage >= minRating;
      const matchesFavorites = !showFavoritesOnly || favorites.includes(movie.id);
      const matchesWatchlist = !showWatchlistOnly || watchlist.includes(movie.id);

      return matchesQuery && matchesRating && matchesFavorites && matchesWatchlist;
    });
  }, [favorites, minRating, movies, query, showFavoritesOnly, showWatchlistOnly, watchlist]);

  const firstPosterMovieId = visibleMovies.find((movie) => movie.posterPath)?.id;

  if (!movies.length) {
    return (
      <div className="movie-empty-state">
        <p>No movie data available right now. Please try again in a moment.</p>
      </div>
    );
  }

  return (
    <section className="movie-explorer" aria-label="Movie explorer">
      <div className="movie-controls">
        <label className="movie-controls-field">
          <span>Search movies</span>
          <input
            type="search"
            placeholder="Search by title or overview"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <label className="movie-controls-field">
          <span>Minimum rating: {minRating.toFixed(1)}</span>
          <input
            type="range"
            min={0}
            max={10}
            step={0.5}
            value={minRating}
            onChange={(event) => setMinRating(Number(event.target.value))}
          />
        </label>

        <label className="movie-controls-check">
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={(event) => setShowFavoritesOnly(event.target.checked)}
          />
          Favorites only
        </label>

        <label className="movie-controls-check">
          <input
            type="checkbox"
            checked={showWatchlistOnly}
            onChange={(event) => setShowWatchlistOnly(event.target.checked)}
          />
          Watchlist only
        </label>
      </div>

      <p className="movie-summary">
        Showing {visibleMovies.length} of {movies.length} movies · {favorites.length} favorites ·{' '}
        {watchlist.length} in watchlist
      </p>

      <ul className="movie-grid">
        {visibleMovies.map((movie) => {
          const posterSrc = movie.posterPath;
          const isPrimaryImage = movie.id === firstPosterMovieId;
          const isFavorite = favorites.includes(movie.id);
          const inWatchlist = watchlist.includes(movie.id);

          return (
            <li className="movie-card" key={movie.id}>
              {posterSrc ? (
                isPrimaryImage ? (
                  <a href={`/movies/${movie.id}`} className="movie-card-poster-link">
                    <img
                      src={posterSrc}
                      alt={`${movie.title} poster`}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="movie-card-poster"
                    />
                  </a>
                ) : (
                  <a href={`/movies/${movie.id}`} className="movie-card-poster-link">
                    <img
                      src={posterSrc}
                      alt={`${movie.title} poster`}
                      loading="lazy"
                      decoding="async"
                      className="movie-card-poster"
                    />
                  </a>
                )
              ) : (
                <div className="movie-card-poster movie-card-poster-fallback">No poster</div>
              )}

              <div className="movie-card-body">
                <div className="movie-card-title-row">
                  <h2>
                    <a href={`/movies/${movie.id}`} className="movie-card-title-link">
                      {movie.title}{' '}
                      <span className="movie-card-year">({formatYear(movie.releaseDate)})</span>
                    </a>
                  </h2>
                  <span className="movie-card-rating">★ {movie.voteAverage.toFixed(1)}</span>
                </div>
                <p className="movie-card-genres">
                  {movie.genreNames.length ? movie.genreNames.join(', ') : 'Genre unavailable'}
                </p>

                <div className="movie-card-actions">
                  <button type="button" onClick={() => toggleFavorite(movie.id)}>
                    {isFavorite ? '★ Favorited' : '☆ Favorite'}
                  </button>
                  <button type="button" onClick={() => toggleWatchlist(movie.id)}>
                    {inWatchlist ? '✓ In Watchlist' : '+ Watchlist'}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default MovieExplorer;
