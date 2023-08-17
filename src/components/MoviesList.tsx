import { FC, useEffect } from "react";
import "./movies-list.css"
import MovieCard from "./Movie";
import { useAppDispatch , useAppSelector } from "../hooks";
import { fetchMovies } from "../app/moviesSlice";

const MoviesList:FC = () => {
   const dispatch = useAppDispatch()
   const movies = useAppSelector(state => {
      return state.movies.movies
   })

   useEffect(() => {
      dispatch(fetchMovies())
   }, [])

   return <div className="movie-list-container">
    {
      movies.length > 0 && movies.map(movie => {
         return <MovieCard  movie = {movie}/>
      })
    }
   </div>
}

export default MoviesList