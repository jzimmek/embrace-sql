import definedColumns from "../definedColumns"

it("reduces an object into a array of [key,value] tuples including all entries which value is not undefined", () => {
  expect(definedColumns({})).toEqual([])
  expect(definedColumns({a: 1})).toEqual([["a", 1]])
  expect(definedColumns({a: undefined})).toEqual([])
  expect(definedColumns({a: 1, b: undefined})).toEqual([["a", 1]])
  expect(definedColumns({a: 1, b: 2})).toEqual([["a", 1], ["b", 2]])
})
