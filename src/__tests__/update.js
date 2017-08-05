import sql from "../sql"
import update from "../update"
import build from "../build"

it("update", () => {
  expect(update("t1", {}))
    .toEqual(null)

  expect(build(update("t1", {a: 1})))
    .toEqual({sql: "update t1 set a = $1", params: [1]})

  expect(() => update("t1", {}, "string"))
    .toThrow("expect suffix to be a sql``")

  expect(build(update("t1", {a: 1}, sql`where true`)))
    .toEqual({sql: "update t1 set a = $1 where true", params: [1]})

  expect(build(update("t1", {a: 1, b: 2})))
    .toEqual({sql: "update t1 set a = $1, b = $2", params: [1, 2]})

  expect(build(update("t1", {a: 1, b: 2}, sql`where true`)))
    .toEqual({sql: "update t1 set a = $1, b = $2 where true", params: [1, 2]})
})
