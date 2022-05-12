import dateToISOString from "./dateToISOString"

describe("dateToISOString", () => {
  it("should return undefined when the date format is invalid", () => {
    expect(dateToISOString("30/10/20014")).toBeUndefined()
  })

  it("should return a valid ISO string date when the date format valid", () => {
    expect(dateToISOString("2014/10/30")).toEqual("2014-10-30T00:00:00.000Z")
    expect(dateToISOString(41973)).toEqual("2014-11-30T00:00:00.000Z")
  })
})
