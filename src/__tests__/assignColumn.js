import assignColumn from "../assignColumn"

it("returns an array of assignment strings", () => {
  expect([["a", 1]].map(assignColumn)).toEqual([["__sql", "a", " = ", {__param: 1}]])
  expect([["a", 1], ["b", 2]].map(assignColumn)).toEqual([["__sql", "a", " = ", {__param: 1}, ", "], ["__sql", "b", " = ", {__param: 2}]])
})

it("snakeCases columns", () => {
  expect([["aB", 1]].map(assignColumn)).toEqual([["__sql", "a_b", " = ", {__param: 1}]])
})
