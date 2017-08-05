import raw from "./raw"
import sql from "./sql"

export default (arr, property="id") => {
  return raw(arr.map((e,idx) => sql`${property ? e[property] : e}${idx < arr.length - 1 ? sql`,` : sql``}`))
}
