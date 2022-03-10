import fs from "fs"
import convertXls from "./convertXls"

describe("convertXls", () => {
  it("should convert PNC CCJS file", () => {
    const fileContents = fs.readFileSync("./test-data/INC275907.NPOFFP.CCJS.xlsx")
    const offenceCodes = convertXls(Buffer.from(fileContents))

    expect(offenceCodes.length).toEqual(18105)
  })
  it("should convert PNC ACPO file", () => {
    const fileContents = fs.readFileSync("./test-data/INC275907.NPOFFP.ACPO.xlsx")
    const offenceCodes = convertXls(Buffer.from(fileContents))
    expect(offenceCodes.length).toEqual(11435)
  })
})
