'use client'

import * as React from 'react'
import styles from '@/app/page.module.css'
import { MovieStateType, MovieErrorStateType } from '@/app/lib/definitions'

export default function MovieSelection({ movieState, setMovieState, movieErrorState }: 
  { movieState: MovieStateType; setMovieState: React.Dispatch<React.SetStateAction<MovieStateType>>; movieErrorState: MovieErrorStateType }) 
  {

  const handleServiceUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLInputElement;
    setMovieState({...movieState, service: target.value})
  }

  const handleGenreUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLInputElement;
    setMovieState({...movieState, genre: target.value})
  }

  return (
    <div className={styles.movieSelections}>
      <div className={styles.movieServiceSelections}>
        <h4 className={styles.movieSelectionSubtitle}>Pick a Streaming Service</h4>
        {movieErrorState.serviceError && <p className={styles.movieError}>{movieErrorState.serviceError}</p>}
        <div className={styles.movieServiceButtons}>
          <button type='button' id='netflix' name='netflix' value='netflix' className={movieState.service === 'netflix' ? styles.active : styles.inactive} onClick={(e) => handleServiceUpdate(e)}>Netflix</button>
          <button type='button' id='prime' name='prime' value='prime' className={movieState.service === 'prime' ? styles.active : styles.inactive} onClick={(e) => handleServiceUpdate(e)}>Amazon Prime</button>
          <button type='button' id='hbo' name='hbo' value='hbo' className={movieState.service === 'hbo' ? styles.active : styles.inactive} onClick={(e) => handleServiceUpdate(e)}>Max</button>
          <button type='button' id='hulu' name='hulu' value='hulu' className={movieState.service === 'hulu' ? styles.active : styles.inactive} onClick={(e) => handleServiceUpdate(e)}>hulu</button>
          <button type='button' id='apple' name='apple' value='apple' className={movieState.service === 'apple' ? styles.active : styles.inactive} onClick={(e) => handleServiceUpdate(e)}>Apple TV</button>
          <button type='button' id='disney' name='disney' value='disney' className={movieState.service === 'disney' ? styles.active : styles.inactive} onClick={(e) => handleServiceUpdate(e)}>Disney+</button>
          <button type='button' id='paramount' name='paramount' value='paramount' className={movieState.service === 'paramount' ? styles.active : styles.inactive} onClick={(e) => handleServiceUpdate(e)}>Paramount+</button>
          <button type='button' id='peacock' name='peacock' value='peacock' className={movieState.service === 'peacock' ? styles.active : styles.inactive} onClick={(e) => handleServiceUpdate(e)}>Peacock</button>
        </div>
      </div>
      <div className={styles.movieGenreSelections}>
        <h4 className={styles.movieSelectionSubtitle}>Pick a Genre</h4>
        {movieErrorState.genreError && <p className={styles.movieError}>{movieErrorState.genreError}</p>}
        <div className={styles.movieGenreButtons}>
          <button type='button' id='action' name='action' value='action' className={movieState.genre === 'action' ? styles.active : styles.inactive} onClick={(e) => handleGenreUpdate(e)}>Action</button>
          <button type='button' id='drama' name='drama' value='drama' className={movieState.genre === 'drama' ? styles.active : styles.inactive} onClick={(e) => handleGenreUpdate(e)}>Drama</button>
          <button type='button' id='comedy' name='comedy' value='comedy' className={movieState.genre === 'comedy' ? styles.active : styles.inactive} onClick={(e) => handleGenreUpdate(e)}>Comedy</button>
          <button type='button' id='horror' name='horror' value='horror' className={movieState.genre === 'horror' ? styles.active : styles.inactive} onClick={(e) => handleGenreUpdate(e)}>Horror</button>
          <button type='button' id='thriller' name='thriller' value='thriller' className={movieState.genre === 'thriller' ? styles.active : styles.inactive} onClick={(e) => handleGenreUpdate(e)}>Thriller</button>
          <button type='button' id='adventure' name='adventure' value='adventure' className={movieState.genre === 'adventure' ? styles.active : styles.inactive} onClick={(e) => handleGenreUpdate(e)}>Adventure</button>
        </div>
      </div>
    </div>
  )
}