export function makeImagePath(id:string | undefined, format?:string) {
  return `https://image.tmdb.org/t/p/${format? format : "original"}${id}`
 }

 export function makeMoviePath(key?:string) {
  return `https://www.youtube.com/embed/${key}`
 }