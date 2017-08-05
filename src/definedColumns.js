export default function(columns){
  return Object.keys(columns).reduce((memo,key) => {
    if(columns[key] === undefined)
      return memo

    return [...memo, [key, columns[key]]]
  }, [])
}
