import sql from "../sql"
import raw from "../raw"

describe("sql", () => {
  it("returns an array", () => {
    expect(sql`select 1`).toBeInstanceOf(Array)
  })

  it("contains a prepended __sql entry", () => {
    expect(sql`select 1`).toEqual(["__sql", "select 1"])
  })

  it("strips out empty strings", () => {
    expect(sql``).toEqual(["__sql"])
  })

  describe("expressions", () => {
    it("set undefined as null value", () => {
      expect(sql`select ${undefined}`).toEqual(["__sql", "select ", {__param: null}])
    })

    it("replaces expressions into sql placeholders", () => {
      expect(sql`select ${1}`).toEqual(["__sql", "select ", {__param: 1}])
      expect(sql`select ${1}, ${2}`).toEqual(["__sql", "select ", {__param: 1}, ", ", {__param: 2}])
      expect(sql`${1}`).toEqual(["__sql", {__param: 1}])
    })

    it("inlines raw expressions", () => {
      expect(sql`select ${raw(1)}`).toEqual(["__sql", "select ", 1])
      expect(sql`${raw(1)}`).toEqual(["__sql", 1])
    })

    it("inlines nested sql`` expressions", () => {
      expect(sql`select ${sql`1`}`).toEqual(["__sql", "select ", "1"])
      expect(sql`select ${sql`1`} as id`).toEqual(["__sql", "select ", "1", " as id"])
      expect(sql`select ${sql`${1}`} as id`).toEqual(["__sql", "select ", {__param: 1}, " as id"])
      expect(sql`select ${sql`(${1})`} as id`).toEqual(["__sql", "select ", "(", {__param: 1}, ")", " as id"])
    })
  })

})
