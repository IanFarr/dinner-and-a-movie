export type RestaurantStateType = {
  [key: string]: boolean;
    $: boolean;
    $$: boolean;
    $$$: boolean;
}

export type MovieStateType = {
  [key: string]: string;
  service: string;
  genre: string;
}

export type MovieResultType = {
  title: string;
  overview: string;
  imdbRating: number;
  streamingService: string;
  moviePicture: string;
}

export type RestaurantResultType = {
  name: string;
  address: string;
  rating: number;
  price: string;
  restaurantPicture: string;
}

export type MovieErrorStateType = {
  serviceError: string;
  genreError: string;
}

export type RestaurantErrorStateType = {
  priceError: string;
}