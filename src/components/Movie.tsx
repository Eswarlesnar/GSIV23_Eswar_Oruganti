import  { FC } from "react";
import { Movie } from "./MoviesList";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => { 
  const baseImageUrl = "https://image.tmdb.org/t/p/w500"; // Base URL for images
  const moviePosterUrl = `${baseImageUrl}${movie.poster_path}`

  return (
    <div className="movie-card" key={movie.id}>
      <div className="card-wrapper">
        <figure>
          <img src= {moviePosterUrl} alt={movie.title}  loading="lazy"/>
        </figure>
        <div className="card-body">
          <div className="title-rating">
            <h2>
              {movie.title.length > 21
                ? `${movie.title.slice(0, 15)}...`
                : movie.title}
            </h2>
            <p>{movie.vote_average}</p>
          </div>
          <p className="card-description">{movie.overview.slice(0, 95) + "..."}</p>
          <a href="#" className="read-more">
            Read more{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
