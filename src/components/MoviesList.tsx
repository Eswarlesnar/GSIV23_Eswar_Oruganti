import { FC, useEffect } from "react";
import "./movies-list.css"
import MovieCard from "./MovieCard";
import { useAppDispatch , useAppSelector } from "../hooks";
import { fetchMovies, selectSortedMovies } from "../app/moviesSlice";
import Navbar from "./Navbar";

const MoviesList:FC = () => {
   const dispatch = useAppDispatch()
   const movies = useAppSelector(selectSortedMovies)
   const filter = useAppSelector(state => state.movies.filter)
   useEffect(() => {
      dispatch(fetchMovies())
   }, [filter])

   return <div>
      <div className="movie-list-container">
      
      {
        movies.length > 0 && movies.map(movie => {
           return <MovieCard  movie = {movie} key = {movie.id}/>
        })
      }
     </div>
   </div>
}

export default MoviesList