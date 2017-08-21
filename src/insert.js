import snakeCase from "lodash/fp/snakeCase"

import sql from "./sql"
import definedColumns from "./definedColumns"
import assignColumn from "./assignColumn"
import isSql from "./isSql"

export default (tableName, columns, suffix) => {
  if(suffix && suffix[0] !== "__sql")   throw new Error("expect suffix to be a sql``")

  if(!suffix)
    suffix = sql`returning *`

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
      memo = [...memo, isSql(e[1]) ? e[1] : {__param: e[1]}]

      if(idx < arr.length - 1)
        memo = [...memo, ", "]

      return memo
    }, []),
    ")",
    ...(suffix.length === 1 ? "" : " "),
    suffix
  ]
}
