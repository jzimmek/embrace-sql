import raw from "./raw"

export default (arr, property="id") => {
  return raw(arr.map(e => property ? e[property] : e).join(","))
}
