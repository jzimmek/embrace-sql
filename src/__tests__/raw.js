import raw from "../raw"

describe("raw", () => {
  it("should return a wrapped value", () => {
    expect(raw(1)).toEqual({__raw: 1})
  })
})
