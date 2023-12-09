'use client'

import * as React from 'react'
import styles from '@/app/page.module.css'
import { RestaurantStateType, RestaurantErrorStateType } from '@/app/lib/definitions'

export default function RestaurantSelection({ restaurantState, setRestaurantState, restaurantErrorState }:
  { restaurantState: RestaurantStateType; setRestaurantState: React.Dispatch<React.SetStateAction<RestaurantStateType>>; restaurantErrorState: RestaurantErrorStateType }) {

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLInputElement;
    setRestaurantState({...restaurantState, [target.id]: !restaurantState[target.id]})
  }

  return (
    <div className={styles.restaurantSelections}>
      <h4>How much do you want to spend on dinner?</h4>
      {restaurantErrorState.priceError && <p className={styles.restaurantError}>{restaurantErrorState.priceError}</p>}
      <div className={styles.restaurantPriceButtons}>
        <button type='button' id='$' name='$' value='$' className={restaurantState.$ ? styles.active : styles.inactive} onClick={(e) => handleClick(e)}>$</button>
        <button type='button' id='$$' name='$$' value='$$' className={restaurantState.$$ ? styles.active : styles.inactive} onClick={(e) => handleClick(e)}>$$</button>
        <button type='button' id='$$$' name='$$$' value='$$$' className={restaurantState.$$$ ? styles.active : styles.inactive} onClick={(e) => handleClick(e)}>$$$</button>
      </div>
    </div>
  )
}