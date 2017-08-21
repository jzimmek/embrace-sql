export default (value) => {
  return Array.isArray(value) && value[0] === "__sql"
}
