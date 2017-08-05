export default (parts,...vars) => {
  let length = Math.max(parts.length, vars.length)

  return ["__sql", ...Array.from({length}, (v,k) => k).reduce((memo, idx) => {
    if(parts[idx] !== undefined && parts[idx].length > 0)
      memo = memo.concat(parts[idx])

    if(idx < vars.length){
      let varValue = vars[idx]

      if(varValue && varValue.hasOwnProperty("__raw")){
        memo = memo.concat(varValue.__raw)
      } else if(varValue && Array.isArray(varValue) && varValue[0] === "__sql") {
        memo = memo.concat(varValue.slice(1))
      } else {
        memo = memo.concat({__param: varValue === undefined ? null : varValue})
      }
    }

    return memo
  }, [])]
}
