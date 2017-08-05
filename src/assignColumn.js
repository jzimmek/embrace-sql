import snakeCase from "lodash/fp/snakeCase"

export default function([column,value], idx, arr){
  return [
    "__sql",
    snakeCase(column),
    " = ",
    {__param: value},
    ...(idx < arr.length - 1 ? [", "] : []),
  ]
}
