import { FC, useEffect, useState } from "react";
import "./movies-list.css"
import MovieCard from "./Movie";

interface RequestOptions {
   method : string,
   headers : {
      [key : string] : string
   }
}

export interface Movie {
   id : string ,
   overview : string , 
   title : string , 
   vote_average : number,
   poster_path : string
}

const MoviesList:FC = () => {
   const [movies , setMovies] = useState<Movie[]>([])
   const token = import.meta.env.VITE_TMDB_BEARER
   const url = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=3"
   const options : RequestOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization : `Bearer ${token}`
    }
   }

   useEffect(() => {
      async function fetchMovies(){
         try{
            const response = await fetch(url , options)
            const data = await response.json()
            console.log(data , "data")
            setMovies(data.results)
            console.log(movies)
         }catch(err){
            console.log(err)
         }
      }
      fetchMovies()
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