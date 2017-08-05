export default function(prefix,columns,suffix){

  if(prefix && prefix[0] !== "__sql")
    throw new Error("expect prefix to be a sql``")

  if(suffix && suffix[0] !== "__sql")
    throw new Error("expect prefix to be a sql``")

  if(!suffix)
    suffix = sql``

  const definedColumns = Object.keys(columns).reduce((memo,key) => {
    if(columns[key] === undefined)
      return memo

    return [...memo, [key, columns[key]]]
  }, [])

  if(definedColumns.length === 0)
    return null

  return [
    "__sql",
    prefix,
    definedColumns.map(([column,value], idx, arr) => {
      return [
        "__sql",
        column,
        " = ",
        {__param: value},
        ...(idx < arr.length - 1 ? [", "] : []),
      ]
    }),
    suffix
  ]
}
