import React from 'react'
// API
// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config'
// Components
import HeroImage from './HeroImage'
import Grid from './Grid'
import Thumb from './Thumb'
import Spinner from './Spinner'
import SearchBar from './SearchBar'
import Button from './Button'
// Hook
import { useHomeFetch } from '../hooks/useHomeFetch'
// Image
import NoImage from '../images/no_image.jpg'

const Home: React.FC = () => {
  const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } = useHomeFetch()

  const movie = state.results[0]

  if (error) <div>Something went wrong ...</div>
  return (
    <>
      {
        !searchTerm && movie &&
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}`}
          title={movie.original_title}
          text={movie.overview}
        />
      }
        <SearchBar setSearchTerm={setSearchTerm}/>
        <Grid header={searchTerm ? 'Search results' : 'Popular Movies'}>
          {state.results.map((movie) => (
            <Thumb
              key={movie.id}
              clickable
              image={
                movie.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                  : NoImage
              }
              movieId={movie.id}
            />
          ))}
        </Grid>
        { loading && <Spinner /> }
        { !loading && state.page < state.total_pages &&
        (<Button text='Load Movies' callback={() => setIsLoadingMore(true)}/>) }
    </>
  )
}

export default Home
