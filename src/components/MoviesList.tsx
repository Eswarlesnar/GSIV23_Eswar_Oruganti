import { FC, useEffect } from "react";
import "./movies-list.css"
import MovieCard from "./MovieCard";
import { useAppDispatch , useAppSelector } from "../hooks";
import { fetchMovies, selectSortedMovies } from "../app/moviesSlice";

const MoviesList:FC = () => {
   const dispatch = useAppDispatch()
   const movies = useAppSelector(selectSortedMovies)

   useEffect(() => {
      dispatch(fetchMovies())
   }, [])

   return <div className="movie-list-container">
    {
      movies.length > 0 && movies.map(movie => {
         return <MovieCard  movie = {movie} key = {movie.id}/>
      })
    }
   </div>
}

export default MoviesList