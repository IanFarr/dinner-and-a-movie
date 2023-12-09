import * as React from 'react';
import styles from '@/app/page.module.css'

interface MovieDisplayProps {
  movieData: any;
}

export default function MovieDisplay({ movieData }: MovieDisplayProps) {

  if (!movieData) return null

  const {
    title,
    overview,
    imdbRating,
  } = movieData;

  const streamingService = Object.keys(movieData?.streamingInfo)[0];

  const moviePicture = movieData?.posterURLs?.original;

  const stringExists = (string: string) => {
    return string !== null && string !== undefined && string !== '';
  }

  const titleDisplay = stringExists(title) ? title : 'No title available';
  const descriptionDisplay = stringExists(overview) ? overview : 'No description available';
  const ratingDisplay = stringExists(imdbRating) ? imdbRating : 'No rating available';

  return (
    <div className={styles.movieDisplay}>
      <div className={styles.movieTitle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={moviePicture} alt={`Poster of ${title}`} height={200} width={140} />
        <h2>{`${titleDisplay}`}</h2>
        <p>{`Watch it on: ${streamingService}`}</p>
      </div>
      <div className={styles.movieDescription}>
        <p>{descriptionDisplay}</p>
        <p className={styles.imdbRating}>{`IMDB Rating: ${ratingDisplay}`}</p>
      </div>
    </div>
  )
}