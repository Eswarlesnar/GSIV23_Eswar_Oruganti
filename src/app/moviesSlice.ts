// src/features/movies/moviesSlice.ts
import { createSlice, PayloadAction , createAsyncThunk } from '@reduxjs/toolkit';
import {createSelector} from "reselect"
import { RootState } from './store';

export interface Movie {
  id: string;
  overview: string;
  title: string;
  vote_average: number;
  poster_path: string;  
  release_date : string;
}

interface MoviesState {
  movies: Movie[];
  currentPage: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  currentPage: 1,
  isLoading: false,
  error: null,
};

interface RequestOptions {
    method : string,
    headers : {
       [key : string] : string
    }
 }



export const fetchMovies = createAsyncThunk('movies/fetchMovies' ,async ( _ , {getState , rejectWithValue}) => {
    const {movies} = getState() as { movies : MoviesState }   // dont know what this is found it in stackoverflow
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${movies.currentPage}`
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
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
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
  setCurrentPage,
} = moviesSlice.actions;  

const selectMoviesState = (state : RootState) => state.movies;
const selectMovies = (state :RootState) => selectMoviesState(state).movies;


export const selectSortedMovies = createSelector(selectMovies  , (movies) => {
    const sortedMovies = [...movies].sort( (a , b) => {
        const dateA = new Date(a.release_date)
        const dateB = new Date(b.release_date)
        return dateA.valueOf() - dateB.valueOf()
     })

   return sortedMovies
})


export default moviesSlice.reducer;
