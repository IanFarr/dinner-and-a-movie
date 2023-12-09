const axios = require('axios').default;

const requestData = {
  method: "GET",
    url: "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng",
    params: {
      latitude: `${37.7749}`,
      longitude: `${122.4194}`,
      limit: "50",
      currency: "USD",
      restaurant_dining_options: "delivery",
      prices_restaurants: '$',
      distance: "3",
      open_now: "false",
      lunit: "km",
      lang: "en_US",
      offset: "0",
    },
    headers: {
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RESTAURANT_SERVICE_API_KEY,
    },
}

const mockResponse = {
    "location_id": "19735606",
    "name": "Homestyle By Lakelands",
    "latitude": "43.48434",
    "longitude": "-80.52553",
    "num_reviews": "0",
    "timezone": "America/Toronto",
    "location_string": "Waterloo, Region of Waterloo, Ontario",
    "awards": [],
    "doubleclick_zone": "na.can.ont.waterloo",
    "preferred_map_engine": "default",
    "distance": "2.1619729135522214",
    "distance_string": "2.2 km",
    "bearing": "north",
    "is_closed": false,
    "is_long_closed": false,
    "price_level": "",
    "description": "",
    "web_url": "https://www.tripadvisor.com/Restaurant_Review-g181736-d19735606-Reviews-Homestyle_By_Lakelands-Waterloo_Region_of_Waterloo_Ontario.html",
    "write_review": "https://www.tripadvisor.com/UserReview-g181736-d19735606-Homestyle_By_Lakelands-Waterloo_Region_of_Waterloo_Ontario.html",
    "ancestors": [
        {
            "subcategory": [
                {
                    "key": "city",
                    "name": "City"
                }
            ],
            "name": "Waterloo",
            "abbrv": null,
            "location_id": "181736"
        },
        {
            "subcategory": [
                {
                    "key": "district",
                    "name": "District"
                }
            ],
            "name": "Region of Waterloo",
            "abbrv": null,
            "location_id": "154993"
        },
        {
            "subcategory": [
                {
                    "key": "province",
                    "name": "Province"
                }
            ],
            "name": "Ontario",
            "abbrv": null,
            "location_id": "154979"
        },
        {
            "subcategory": [
                {
                    "key": "country",
                    "name": "Country"
                }
            ],
            "name": "Canada",
            "abbrv": null,
            "location_id": "153339"
        }
    ],
    "category": {
        "key": "restaurant",
        "name": "Restaurant"
    },
    "subcategory": [],
    "parent_display_name": "Waterloo",
    "is_jfy_enabled": false,
    "nearest_metro_station": [],
    "reviews": [
        null
    ],
    "address_obj": {
        "street1": "401 Weber St N",
        "street2": null,
        "city": "Waterloo",
        "state": null,
        "country": "Canada",
        "postalcode": "N2J 3J2"
    },
    "address": "401 Weber St N, Waterloo, Ontario N2J 3J2 Canada",
    "is_candidate_for_contact_info_suppression": false,
    "cuisine": [],
    "dietary_restrictions": [],
    "establishment_types": [
        {
            "key": "10591",
            "name": "Restaurants"
        }
    ]
}

const setGeolocation = async () => {
  const response = await axios.get('https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572');
  const { latitude, longitude } = response.data;
  requestData.params.latitude = latitude;
  requestData.params.longitude = longitude;
}

export default async function fetchRestaurant(restaurantParams: any) {

  const priceSelections = Object.keys(restaurantParams).filter((key) => restaurantParams[key] === true);
  const prices_restaurants = priceSelections.join(',');
  requestData.params.prices_restaurants = prices_restaurants;

  await setGeolocation();

  console.log(requestData);

  try {
    const pageResponse = await axios.request(requestData);
    const numResults = pageResponse.data.paging.total_results;
    const randomOffset = Math.floor(Math.random() * numResults);
    const response = await axios.request({...requestData, params: {...requestData.params, offset: randomOffset}});
    const restaurant = response.data.data[0];
    console.log(restaurant);
    return restaurant;

    // setTimeout(() => {
    //     console.log(mockResponse);
    //     return mockResponse;
    // }, 3000);
  } catch (error) {
    console.error(error);
  }
}