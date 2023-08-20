import { FC, useEffect, useState } from "react";
import "./movies-list.css";
import MovieCard from "./MovieCard";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchMovies, selectSortedMovies } from "../app/moviesSlice";
import LoadingSpinner from "./Loader";

const MoviesList: FC = () => {
  const dispatch = useAppDispatch();
  const [loading , setLoading] = useState(false)
  const movies = useAppSelector(selectSortedMovies);
  const filter = useAppSelector((state) => state.movies.filter);

  useEffect(() => {
    setLoading(true)
    dispatch(fetchMovies()).then(() => setLoading(false))
  }, [filter, dispatch]);

  return (
    <div>
      {
        loading === true ?  <LoadingSpinner />
        :<div className="movie-list-container">
        {
           movies.map((movie) => {
              return <MovieCard movie={movie} key={movie.id} />;
         })
        }  
      </div>
      }
      
    </div>
  );
};

export default MoviesList;
