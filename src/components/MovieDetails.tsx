import  { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie, RequestOptions } from "../app/moviesSlice";
import "./movie-details.css";

interface CastDetail {
  id?: number;
  popularity: number;
  known_for_department: string;
  name: string;
}

const token = import.meta.env.VITE_TMDB_BEARER;

const options: RequestOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
}; 

const MovieDetails: FC = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState<Movie>({
    id: "0",
    overview: "",
    poster_path: "",
    release_date: "",
    runtime: 0,
    title: "",
    vote_average: 0,
  });
  const [castDetails, setCastDetails] = useState<CastDetail[]>([]);

  const movieDetailsURL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const castDetailsURL = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w500"; // Base URL for images
  const moviePosterUrl = `${baseImageUrl}${movieDetails.poster_path}`;


  const fetchCastDetails = useCallback( async () => {
    const response = await fetch(castDetailsURL, options);
    const data = await response.json();
    setCastDetails(data.cast);
  } , [castDetailsURL]);

  const fetchMovieDetails = useCallback(async () => {
    const response = await fetch(movieDetailsURL, options);
    const data = await response.json();
    setMovieDetails(data);
  },[movieDetailsURL]);

  const topCast = castDetails
    .filter((cast) => cast.known_for_department === "Acting")
    .sort((cast1, cast2) => {
      return cast2.popularity - cast1.popularity;
    })
    .slice(0, 5);

  const releaseDate = movieDetails.release_date;
  const releaseYear = releaseDate && releaseDate.split("-")[0];

  const runTime = (movieDetails.runtime / 60).toFixed(1) + "hrs";

  const movieInfo = (
    <span className="movie-info">
      {releaseYear} | {runTime} | "Director:"
    </span>
  );

  const castInfo = topCast.map((cast) => cast.name).join(", ");

  useEffect(() => {
    fetchMovieDetails();
    fetchCastDetails();
  }, [fetchCastDetails , fetchMovieDetails ]);

  return (
    <div className="movie-details-container">
      <div className="details-wrapper">
        <div className="image-wrapper">
          <figure>
            <img src={moviePosterUrl} alt={movieDetails.title} />
          </figure>
        </div>
        <div className="details-content">
          <div className="title">
            <h2>{movieDetails.title}</h2>
            <span className="movie-rating">
              ({movieDetails.vote_average})
            </span>
          </div>
          <div>{movieInfo}</div>
          <div>
            <span className="cast-info"> Cast : {castInfo}</span>
          </div>
          <div>
            <p> Description : {movieDetails.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
