import execSql from "./execSql"

export default (...args) => {
  return execSql(...args).then(rows => rows[0])
}
