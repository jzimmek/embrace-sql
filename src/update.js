import sql from "./sql"
import definedColumns from "./definedColumns"
import assignColumn from "./assignColumn"

export default (tableName, columns, suffix) => {

  if(suffix && suffix[0] !== "__sql")   throw new Error("expect suffix to be a sql``")

  if(!suffix)
    suffix = sql``

  columns = definedColumns(columns)

  if(columns.length === 0)
    return null

  return [
    "__sql",
    "update ",
    tableName,
    " set ",
    columns.map(assignColumn),
    ...(suffix.length === 1 ? "" : " "),
    suffix
  ]
}
