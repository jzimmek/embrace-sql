import build, {stripSqlIdentifier, filterParams, format} from "../build"

it("removes all __sql entries in an array", () => {
  expect(stripSqlIdentifier([])).toEqual([])
  expect(stripSqlIdentifier(["__sql"])).toEqual([])
  expect(stripSqlIdentifier(["__sql", 1])).toEqual([1])
  expect(stripSqlIdentifier(["__sql", 1, 2])).toEqual([1, 2])
})

it("returns an array containing only sql params", () => {
  expect(filterParams([])).toEqual([])
  expect(filterParams([1])).toEqual([])
  expect(filterParams([{__param: 1}])).toEqual([1])
  expect(filterParams([0, {__param: 1}])).toEqual([1])
  expect(filterParams([{__param: 1}, 2])).toEqual([1])
  expect(filterParams([{__param: 1}, 2, {__param: 3}])).toEqual([1, 3])
})

it("return a formatted sql query string", () => {
  expect(format(["select 1"])).toEqual("select 1")
  expect(format([{__param: 1}])).toEqual("$1")
  expect(format(["select ", {__param: 1}])).toEqual("select $1")
  expect(format(["select ", {__param: 1}, " as id"])).toEqual("select $1 as id")
  expect(format(["select ", {__param: 1}, " as id, ", {__param: 2}, " as id2"])).toEqual("select $1 as id, $2 as id2")
})

it("returns an {sql,params} object", () => {
  expect(build(["__sql", "select 1"])).toEqual({sql: "select 1", params: []})
  expect(build(["__sql", "select ", {__param: 1}])).toEqual({sql: "select $1", params: [1]})
})
