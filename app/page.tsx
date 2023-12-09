'use client'

import * as React from 'react'
import styles from '@/app/page.module.css'
import MovieSelection from '@/app/ui/movieSelection'
import MovieDisplay from '@/app/ui/movieDisplay'
import RestaurantSelection from '@/app/ui/restaurantSelection'
import RestaurantDisplay from '@/app/ui/restaurantDisplay'
import fetchMovie from '@/app/api/movieService'
import fetchRestaurant from '@/app/api/restaurantService'
import { MovieResultType, RestaurantResultType } from '@/app/lib/definitions'
// import { testMovieResult, testRestaurantResult } from '@/app/ui/utils/testData'

export default function Home() {

  const movieSelections: {
    [key: string] : string,
    service: string,
    genre: string,
   } = {
    service: '',
    genre: '',
   }

   const restaurantSelections: {
    [key: string] : boolean,
    $: boolean,
    $$: boolean,
    $$$: boolean,
  } = {
    $: false,
    $$: false,
    $$$: false,
  }

  const movieSelectionsError: {
    [key: string] : string,
    serviceError: string,
    genreError: string,
   } = {
    serviceError: '',
    genreError: '',
   }

   const restaurantSelectionsError: {
    [key: string] : string,
    priceError: string,
  } = {
    priceError: '',
  }

  const [movieState, setMovieState] = React.useState(movieSelections)
  const [restaurantState, setRestaurantState] = React.useState(restaurantSelections)
  const [movieErrorState, setMovieErrorState] = React.useState(movieSelectionsError)
  const [restaurantErrorState, setRestaurantErrorState] = React.useState(restaurantSelectionsError)
  const [showSelections, setShowSelections] = React.useState(true)
  const [fetchingResults, setFetchingResults] = React.useState(false)
  const [movieResult, setMovieResult] = React.useState<MovieResultType | null>(null)
  const [restaurantResult, setRestaurantResult] = React.useState<RestaurantResultType | null>(null)

  React.useEffect(() => {
    if (fetchingResults) {
      setShowSelections(false)
    } else if (!movieResult || !restaurantResult) {
      setShowSelections(true)
    } else {
      setShowSelections(false)
    }
  }, [fetchingResults, movieResult, restaurantResult])

  const validateInput = () => {
    let valid = true
    const movieErrors = {...movieErrorState}
    if (!movieState.service) {
      movieErrors.serviceError = 'Please select a service'
      valid = false
    } else {
      movieErrors.serviceError = ''
    }
    if (!movieState.genre) {
      movieErrors.genreError = 'Please select a genre'
      valid = false
    } else {
      movieErrors.genreError = ''
    }
    setMovieErrorState({...movieErrorState, ...movieErrors})
    if (!restaurantState.$ && !restaurantState.$$ && !restaurantState.$$$) {
      setRestaurantErrorState({...restaurantErrorState, priceError: 'Please select a price'})
      valid = false
    } else {
      setRestaurantErrorState({...restaurantErrorState, priceError: ''})
    }
    console.log('movieErrorState', movieErrorState)
    console.log('restaurantErrorState', restaurantErrorState)
    console.log('valid', valid)
    return valid
  }

  const getResults = async () => {
    if (!validateInput()) return
    setFetchingResults(true)

    try {
      const movieResult = await fetchMovie(movieState)
        .then((movieResult) => {
          setMovieResult(movieResult)
        })
      const restaurantResult = await fetchRestaurant(restaurantState)
        .then((restaurantResult) => {
          setRestaurantResult(restaurantResult)
        })
    } catch (error) {
      console.error(error)
    } finally {
      setFetchingResults(false)
    }
  }

  const reset = () => {
    setMovieState(movieSelections)
    setRestaurantState(restaurantSelections)
    setShowSelections(true)
    setFetchingResults(false)
    setMovieResult(null)
    setRestaurantResult(null)
  }

  const display = () => {
    if (showSelections && !fetchingResults) {
      return (
        <div className={styles.selectionsDisplay}>
          <MovieSelection movieState={movieState} setMovieState={setMovieState} movieErrorState={movieErrorState} />
          <RestaurantSelection restaurantState={restaurantState} setRestaurantState={setRestaurantState} restaurantErrorState={restaurantErrorState} />
          <button className={styles.submitButton} onClick={() => getResults()}>Submit</button>
        </div>
      )
    } else if (!showSelections && !fetchingResults) {
      return (
        <div className={styles.resultsDisplay}>
          <MovieDisplay movieData={movieResult} />
          <RestaurantDisplay restaurantData={restaurantResult} />
          <button className={styles.submitButton} onClick={() => reset()}>Reset</button>
        </div>
      )
    } else {
      return (
        <div className={styles.loadingDisplay}>
          <div className={styles.loading}>Loading...</div>
        </div>
      )
    }
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.pageTitle}>Dinner And A Movie</h1>
      {display()}
    </div>
  )
}
