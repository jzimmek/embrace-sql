import snakeCase from "lodash/fp/snakeCase"
import isSql from "./isSql"

export default function([column,value], idx, arr){
  return [
    "__sql",
    snakeCase(column),
    " = ",
    isSql(value) ? value : {__param: value},
    ...(idx < arr.length - 1 ? [", "] : []),
  ]
}
