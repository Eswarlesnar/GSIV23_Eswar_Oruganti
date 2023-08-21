// src/features/movies/moviesSlice.ts
import { createSlice, PayloadAction , createAsyncThunk  , createSelector    } from '@reduxjs/toolkit';
// import {createSelector} from "reselect"
import { RootState } from './store';

export interface Movie {
  id: string;
  overview: string;
  title: string;
  vote_average: number;
  poster_path: string;  
  release_date : string;
  runtime : number
}

interface MoviesState {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  filter : string
}

const initialState: MoviesState = {
  movies: [],
  isLoading: false,
  error: null,
  filter : ""
};

export interface RequestOptions {
    method : string,
    headers : {
       [key : string] : string
    }
 }



export const fetchMovies = createAsyncThunk('movies/fetchMovies' ,async (currentPage , {getState , rejectWithValue}) => {
    // const {movies} = getState() as { movies : MoviesState }   // dont know what this is found it in stackoverflow
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${currentPage}`
    const token = import.meta.env.VITE_TMDB_BEARER

    const options : RequestOptions = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    try{
        const response = await fetch(url , options)
        const data = await response.json()
        return data.results 
     }catch(err ){
        return rejectWithValue('error in fetching movies')
     }
})

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setFilter(state , action : PayloadAction<string>) { 
       state.filter = action.payload
    }
  },
  extraReducers : (builder)=> {
    builder.addCase(fetchMovies.pending  , state => {
        state.isLoading = true
        state.error = null
    })
    .addCase(fetchMovies.rejected , (state , action ) => {
        state.isLoading = false 
        state.error = action.payload && typeof(action.payload) ===  'string' ? action.payload : ""
    })
    .addCase(fetchMovies.fulfilled , (state , action) => {
        state.isLoading =  false
        state.movies = action.payload
    })
  
  }
  
});

export const {
  setFilter
} = moviesSlice.actions;  

const selectMoviesState = (state : RootState) => state.movies;
export const selectMovies = (state :RootState) => selectMoviesState(state).movies;
export const selectFitleredMovies = (state : RootState) => {
   return  [...state.movies.movies].filter(movie => movie.title.toLowerCase().includes(state.movies.filter.toLowerCase()))
}


export const selectSortedMovies = createSelector(selectFitleredMovies  , (movies) => {
    const sortedMovies = [...movies].sort( (a , b) => {
        const dateA = new Date(a.release_date)
        const dateB = new Date(b.release_date)
        return dateA.valueOf() - dateB.valueOf()
     })

   return sortedMovies
})




export default moviesSlice.reducer;
