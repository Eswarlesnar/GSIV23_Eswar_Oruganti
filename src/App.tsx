import { BrowserRouter, Routes , Route  } from "react-router-dom"
import MoviesList from "./components/MoviesList"
import MovieDetails from "./components/MovieDetails"
import PageNotFound from "./components/PageNotFound"

function App() {
 
  return (
    <BrowserRouter>
       <Routes>
         <Route path = "/" element = {<MoviesList /> } />
         <Route path = "details/:id" element = { <MovieDetails />} />
         <Route path = "*" element = { <PageNotFound />}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
