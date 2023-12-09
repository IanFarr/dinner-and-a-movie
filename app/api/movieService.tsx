import { getRandomPage, getRandomResponse } from "@/app/api/utils";

const axios = require('axios').default;

const requestData = {
  method: "GET",
    url: "https://streaming-availability.p.rapidapi.com/search/basic",
    params: {
      country: "us",
      // string of comma seperated values. eg: hbo,hulu.addon.hbo,prime.addon.hbomaxus
      service: 'netflix',
      order_by: "original_title",
      genre: '35',
      page: 1,
      language: "en",
      output_language: "en",
      type: "movie",
    },
    headers: {
      "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_MOVIE_SERVICE_API_KEY,
    },
}

const genreCodes: {
  [key: string] : string,
  adventure: string,
  action: string,
  comedy: string,
  drama: string,
  horror: string,
  thriller: string,
} = {
  adventure: '12',
  action: '28',
  comedy: '35',
  drama: '18',
  horror: '27',
  thriller: '53',
}

const mockResponse = {
    "imdbID": "tt7924798",
    "tmdbID": "502616",
    "imdbRating": 58,
    "imdbVoteCount": 1377,
    "tmdbRating": 62,
    "backdropPath": "/iSXQUA7hDANAiqGL2SROm0hmcTy.jpg",
    "backdropURLs": {
        "300": "https://image.tmdb.org/t/p/w300/iSXQUA7hDANAiqGL2SROm0hmcTy.jpg",
        "780": "https://image.tmdb.org/t/p/w780/iSXQUA7hDANAiqGL2SROm0hmcTy.jpg",
        "1280": "https://image.tmdb.org/t/p/w1280/iSXQUA7hDANAiqGL2SROm0hmcTy.jpg",
        "original": "https://image.tmdb.org/t/p/original/iSXQUA7hDANAiqGL2SROm0hmcTy.jpg"
    },
    "originalTitle": "Fred Armisen: Standup for Drummers",
    "genres": [
        35
    ],
    "countries": [
        "US"
    ],
    "year": 2018,
    "runtime": 65,
    "cast": [
        "Fred Armisen",
        "Tre Cool",
        "Sheila E.",
        "Stella Mozgawa"
    ],
    "significants": [
        "Lance Bangs"
    ],
    "title": "Fred Armisen: Standup for Drummers",
    "overview": "For an audience of drummers, comedian Fred Armisen shares and demonstrates his thoughts on musical genres, drummer quirks, regional accents and more.",
    "tagline": "I don't want to work, I just want to bang on the drum all day.",
    "video": "GAhvJMcLShU",
    "posterPath": "/4hGsGr7TLiG4vd2rHmPol984YBG.jpg",
    "posterURLs": {
        "92": "https://image.tmdb.org/t/p/w92/4hGsGr7TLiG4vd2rHmPol984YBG.jpg",
        "154": "https://image.tmdb.org/t/p/w154/4hGsGr7TLiG4vd2rHmPol984YBG.jpg",
        "185": "https://image.tmdb.org/t/p/w185/4hGsGr7TLiG4vd2rHmPol984YBG.jpg",
        "342": "https://image.tmdb.org/t/p/w342/4hGsGr7TLiG4vd2rHmPol984YBG.jpg",
        "500": "https://image.tmdb.org/t/p/w500/4hGsGr7TLiG4vd2rHmPol984YBG.jpg",
        "780": "https://image.tmdb.org/t/p/w780/4hGsGr7TLiG4vd2rHmPol984YBG.jpg",
        "original": "https://image.tmdb.org/t/p/original/4hGsGr7TLiG4vd2rHmPol984YBG.jpg"
    },
    "age": 4,
    "streamingInfo": {
        "netflix": {
            "us": {
                "link": "https://www.netflix.com/title/80159028/",
                "added": 1600283847,
                "leaving": 0
            }
        }
    },
    "originalLanguage": "en"
}

export default async function fetchMovie(movieParams: any) {

  const genreSelection = movieParams.genre;
  const genre = genreCodes[genreSelection]

  requestData.params.service = movieParams.service;
  requestData.params.genre = genre;

  try {
    const pageResponse = await axios.request(requestData);
    const page = getRandomPage(pageResponse.data.total_pages);
    const response = await axios.request({...requestData, params: {...requestData.params, page}});
    const movie = getRandomResponse(response.data.results);
    console.log(movie);
    return movie;

    // setTimeout(() => {
    //   console.log(mockResponse);
    //   return mockResponse;
    // }, 3000);
  } catch (error) {
    console.error(error);
  }
}