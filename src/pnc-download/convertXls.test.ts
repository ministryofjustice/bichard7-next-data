import fs from "fs"
import convertXls from "./convertXls"

describe("convertXls", () => {
  it.only("should convert PNC CCJS file", () => {
    const fileContents = fs.readFileSync("./test-data/INC275907.NPOFFP.CCJS.xlsx", "binary")
    const offenceCodes = convertXls(Buffer.from(fileContents))

    expect(offenceCodes.length).toEqual(18108)
  })
  /*it("should convert PNC ACPO file", () => {
    const offenceCodes = convertXls("./test-data/INC275907.NPOFFP.ACPO.xlsx")

    expect(offenceCodes.length).toEqual(39364)
  })*/
})
