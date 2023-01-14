  const API_KEY = "e7a6b4de55b190b9bd44f056560c7e68"
  const BASE_PATH = "https://api.themoviedb.org/3"

  export function getDetail(kind:string, id:number) {
    return fetch(`${BASE_PATH}/${kind}/${id}?api_key=${API_KEY}`).then(
      (response) => response.json()
    )
  }  
  
  export function getNowPlayingMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
      (response) => response.json()
    )
  }

  export function getTopRatedMoives() {
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
      (response) => response.json()
    )
  } 
  export function getUpcomingMovies() {
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
      (response) => response.json()
    )
  }
  export function getLatestMovies() {
    return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then(
      (response) => response.json()
    )
  } 


  export function getAiringTodayShowTv(){
    return fetch("https://api.themoviedb.org/3/tv/airing_today?api_key=e7a6b4de55b190b9bd44f056560c7e68&language=en-US&page=1").then(
      (repsonse) => repsonse.json()
    )
  }
  export function getPopularShowTv(){
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then(
      (response) => response.json()
    )
  }

  export function getTopRatedTv(){
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
      (response) => response.json()
    )
  }
  export function getLatestShowTv(){
    return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`).then(
      (repsonse) => repsonse.json()
    )
  }


export interface IMultiSearch{
  params:string | null;
}  



export const getVideoFunc = async(movieId?:string) => {
  const json = await(
    await fetch (`${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}`))
    .json();
  return json
}

export function getTvStream(tvId?:string) {
  return fetch(`${BASE_PATH}/tv/${tvId}/videos?api_key=${API_KEY}&language=en-US`).then(
    (reponse) => reponse.json()
  )
}

export function getMultiSearch({params}:IMultiSearch){
  return fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&language=en-US&query=${params}`).then(
    (repsponse) => repsponse.json()
  )
}

export function getSearchMovies(keyword?:string) {
  return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`).then(
    (response) => response.json()
  )
}





