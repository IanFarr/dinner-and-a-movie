import * as React from 'react';
import styles from '@/app/page.module.css'

interface RestaurantDisplayProps {
  restaurantData: any;
}

export default function RestaurantDisplay({ restaurantData }: RestaurantDisplayProps) {

  if (!restaurantData) return null

  const {
    name,
    cuisine,
    distance_string,
    address,
    web_url,
    description,
  } = restaurantData;

  const stringExists = (string: string) => {
    return string !== null && string !== undefined && string !== '';
  }

  const arrayHasValues = (array: any[]) => {
    return array !== null && array !== undefined && array.length > 0;
  }

  const nameDisplay = stringExists(name) ? name : 'No name available';
  const cuisineDisplay = arrayHasValues(cuisine) ? cuisine[0]['name'] : 'No cuisine available';
  const distanceDisplay = stringExists(distance_string) ? distance_string : 'No distance available';
  const addressDisplay = stringExists(address) ? address : 'No address available';
  const webUrlDisplay = stringExists(web_url) ? web_url : 'No website available';
  const descriptionDisplay = stringExists(description) ? description : 'No description available';

  return (
    <div className={styles.restaurantDisplay}>
      <h2 className={styles.restaurantName}>{nameDisplay}</h2>
      <p className={styles.restaurantDistance}>{`Distance: ${distanceDisplay}`}</p>
      <div className={styles.restaurantDescription}>
        <p>{`Cuisine Type: ${cuisineDisplay}`}</p>
        <p>{`Description: ${descriptionDisplay}`}</p>
        <p className={styles.restaurantAddress}>{`Address: ${addressDisplay}`}</p>
        <a href={webUrlDisplay} target="_blank" rel="noreferrer">website</a>
      </div>
    </div>
  )
}