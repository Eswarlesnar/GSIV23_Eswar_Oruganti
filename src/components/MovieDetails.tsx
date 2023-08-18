import { FC } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../hooks"


const MovieDetails:FC = () => {
    const {id} = useParams()
    console.log(id , "getting id from navigatorr")
    const movieDetails = useAppSelector(state => {
        const {movies}  = state.movies
        const index = movies.findIndex(movie => {
            return  movie.id == id
        })
        console.log(index, "index")
        return movies[index]
    })

    return <div>
        {
            JSON.stringify(movieDetails)
        }
    </div>
}


export default MovieDetails