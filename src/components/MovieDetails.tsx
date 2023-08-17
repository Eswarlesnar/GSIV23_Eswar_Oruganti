import { FC } from "react"
import { useParams } from "react-router-dom"


const MovieDetails:FC = () => {
    const {id} = useParams()
    return <>Here is the movie id {id}</>
}


export default MovieDetails