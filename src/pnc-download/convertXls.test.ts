import convertXls from "./convertXls"

describe("convertXls", () => {
  it("should convert PNC CCJS file", () => {
    const offenceCodes = convertXls("./test-data/INC275907.NPOFFP.CCJS.xlsx")

    expect(offenceCodes.length).toEqual(18108)
  })
  it("should convert PNC ACPO file", () => {
    const offenceCodes = convertXls("./test-data/INC275907.NPOFFP.ACPO.xlsx")

    expect(offenceCodes.length).toEqual(39364)
  })
})
