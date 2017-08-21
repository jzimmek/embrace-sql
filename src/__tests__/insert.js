import sql from "../sql"
import insert from "../insert"
import build from "../build"

it("insert", () => {
  expect(insert("t1", {}))
    .toEqual(null)

  expect(() => insert("t1", {}, "string"))
    .toThrow("expect suffix to be a sql``")

  expect(build(insert("t1", {a: 1})))
    .toEqual({sql: "insert into t1 (a) values ($1) returning *", params: [1]})

  expect(build(insert("t1", {a: sql`[${1},${2}]`})))
    .toEqual({sql: "insert into t1 (a) values ([$1,$2]) returning *", params: [1, 2]})

  expect(build(insert("t1", {aB: 1})))
    .toEqual({sql: "insert into t1 (a_b) values ($1) returning *", params: [1]})

  expect(build(insert("t1", {a: 1, b: 2})))
    .toEqual({sql: "insert into t1 (a, b) values ($1, $2) returning *", params: [1, 2]})

  expect(build(insert("t1", {a: 1}, sql`returning id`)))
    .toEqual({sql: "insert into t1 (a) values ($1) returning id", params: [1]})
})
