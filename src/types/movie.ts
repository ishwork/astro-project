export interface Movie {
  id: string;
  title: string;
  overview: string;
  posterPath: string | null;
  releaseDate: string;
  voteAverage: number;
  genreNames: string[];
}

export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  backdropPath: string | null;
  runtime: number | null;
  genres: MovieGenre[];
}
