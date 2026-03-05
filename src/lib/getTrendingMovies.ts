import type { Movie, MovieDetails, MovieGenre } from '@/types/movie';

interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

interface TmdbPopularResponse {
  results: TmdbMovie[];
}

interface TmdbGenresResponse {
  genres: MovieGenre[];
}

interface TmdbMovieDetailsResponse extends TmdbMovie {
  backdrop_path: string | null;
  runtime: number | null;
  genres: MovieGenre[];
}

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_API_KEY = import.meta.env.TMDB_API_KEY;

export const getTrendingMovies = async (): Promise<Movie[]> => {
  if (!TMDB_API_KEY) return [];

  // TMDB returns 20 movies per page by default for /movie/popular.
  const tmdbPopularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`;
  const tmdbGenresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`;

  try {
    const [popularResponse, genresResponse] = await Promise.all([
      fetch(tmdbPopularUrl),
      fetch(tmdbGenresUrl),
    ]);

    if (!popularResponse.ok || !genresResponse.ok) {
      return [];
    }

    const popularData = (await popularResponse.json()) as TmdbPopularResponse;
    const genresData = (await genresResponse.json()) as TmdbGenresResponse;
    const genreById = new Map(genresData.genres.map((genre) => [genre.id, genre.name]));

    return popularData.results.map((movie) => ({
      id: String(movie.id),
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      genreNames: movie.genre_ids
        .map((genreId) => genreById.get(genreId))
        .filter((genreName): genreName is string => Boolean(genreName)),
    }));
  } catch {
    return [];
  }
};

export const getMovieDetails = async (movieId: string): Promise<MovieDetails | null> => {
  if (!TMDB_API_KEY) return null;

  const tmdbMovieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`;

  try {
    const response = await fetch(tmdbMovieDetailsUrl);

    if (!response.ok) {
      return null;
    }

    const movie = (await response.json()) as TmdbMovieDetailsResponse;

    return {
      id: String(movie.id),
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      genreNames: (movie.genres ?? []).map((genre) => genre.name),
      backdropPath: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
        : null,
      runtime: movie.runtime,
      genres: movie.genres ?? [],
    };
  } catch {
    return null;
  }
};
