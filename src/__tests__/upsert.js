import sql from "../sql"
import upsert from "../upsert"
import build from "../build"

it("upsert", () => {
  expect(upsert("t1", "x", {}))
    .toEqual(null)

  expect(() => upsert("t1", "x", {}, "string"))
    .toThrow("expect suffix to be a sql``")

  expect(build(upsert("t1", "x", {a: 1})))
    .toEqual({sql: "insert into t1 (a) values ($1) on conflict (x) do update set a = $2", params: [1, 1]})

  expect(build(upsert("t1", "x", {aB: 1})))
    .toEqual({sql: "insert into t1 (a_b) values ($1) on conflict (x) do update set a_b = $2", params: [1, 1]})

  expect(build(upsert("t1", "x", {a: 1, b: 2})))
    .toEqual({sql: "insert into t1 (a, b) values ($1, $2) on conflict (x) do update set a = $3, b = $4", params: [1, 2, 1, 2]})

  expect(build(upsert("t1", "x", {a: 1}, sql`where true`)))
    .toEqual({sql: "insert into t1 (a) values ($1) on conflict (x) do update set a = $2 where true", params: [1, 1]})
})
