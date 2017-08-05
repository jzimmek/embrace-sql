import snakeCase from "lodash/fp/snakeCase"

import sql from "./sql"
import definedColumns from "./definedColumns"
import assignColumn from "./assignColumn"

export default (tableName, conflict, columns, suffix) => {

  if(suffix && suffix[0] !== "__sql")   throw new Error("expect suffix to be a sql``")

  if(!suffix)
    suffix = sql``

  columns = definedColumns(columns)

  if(columns.length === 0)
    return null

  return [
    "__sql",
    "insert into ",
    tableName,
    " (",
    columns.map(e => snakeCase(e[0])).join(", "),
    ") values (",
    ...columns.reduce((memo, e, idx, arr) => {
      memo = [...memo, {__param: e[1]}]

      if(idx < arr.length - 1)
        memo = [...memo, ", "]

      return memo
    }, []),
    ") on conflict (",
    snakeCase(conflict),
    ") do update set ",
    columns.map(assignColumn),
    ...(suffix.length === 1 ? "" : " "),
    suffix,
  ]
}
