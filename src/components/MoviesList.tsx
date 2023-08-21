import { FC, useEffect, useState } from "react";
import "./movies-list.css";
import MovieCard from "./MovieCard";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchMovies, selectSortedMovies } from "../app/moviesSlice";
import LoadingSpinner from "./Loader";
import MoviesPagination from "./Pagination";

const MoviesList: FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const movies = useAppSelector(selectSortedMovies);
  const filter = useAppSelector((state) => state.movies.filter);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchMovies(page)).then(() => setLoading(false));
  }, [filter, dispatch, page]);

  return (
    <div>
      {loading === true ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="movie-list-container">
            {movies.map((movie) => {
              return <MovieCard movie={movie} key={movie.id} />;
            })}
          </div>
          <MoviesPagination
            page={page}
            onPageChange={handlePageChange}
            pageCount={5} // Replace with the actual number of pages
          />
        </div>
      )}
    </div>
  );
};

export default MoviesList;
