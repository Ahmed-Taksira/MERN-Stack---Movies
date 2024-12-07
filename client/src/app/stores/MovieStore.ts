import { create } from "zustand";
import { Movie } from "../interfaces/Movie.interface";

interface MovieStore {
  didFetch: boolean;
  movies: Movie[];
  setDidFetch: (val: boolean) => void;
  setMovies: (movies: Movie[]) => void;
  addMovie: (movie: Movie) => void;
  editMovie: (updatedMovie: Movie) => void;
}

const useMovieStore = create<MovieStore>((set) => ({
  didFetch: false,

  movies: [],

  setDidFetch: (val) => set({ didFetch: val }),

  setMovies: (movies) => set({ movies }),

  addMovie: (movie) =>
    set((state) => ({
      movies: [...state.movies, movie],
    })),

  editMovie: (updatedMovie) =>
    set((state) => ({
      movies: state.movies.map((movie) =>
        movie._id === updatedMovie._id ? updatedMovie : movie
      ),
    })),
}));

export default useMovieStore;
