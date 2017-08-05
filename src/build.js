import flattenDeep from "lodash/fp/flattenDeep"

export function stripSqlIdentifier(arr){
  return arr.filter(e => e !== "__sql")
}

export function filterParams(arr){
  return arr.filter(e => e && typeof(e) === "object" && e.hasOwnProperty("__param")).map(e => e.__param)
}

export function format(arr){
  let varIdx = 1
  return arr.map(e => typeof(e) === "string" ? e : `$${varIdx++}`).join("")
}

export default (sqlArr) => {
  const sqlArrFlatten = stripSqlIdentifier(flattenDeep(sqlArr))
  return {
    sql: format(sqlArrFlatten),
    params: filterParams(sqlArrFlatten)
  }
}
