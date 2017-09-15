import camelize from "camelize"
import build from "./build"

export default (client, sqlAndParams) => {
  const {sql,params} = build(sqlAndParams)

  if(!sql)
    return []

  const log = `SQL: ${sql.replace(/\n/g, " ").replace(/[ ]+/g, " ")}
PARAMS: ${JSON.stringify(params)}
`

  console.info(log)

  return client.query(sql,params).then(({rows}) => camelize(rows))
}
