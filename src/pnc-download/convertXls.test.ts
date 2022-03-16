import fs from "fs"
import convertXls from "./convertXls"

const expectedCCJSOffenceCodesFile = "test-data/expected-output/pnc-ccjs-expected.json"
const expectedACPOOffenceCodesFile = "test-data/expected-output/pnc-acpo-expected.json"

describe("convertXls", () => {
  it("should convert PNC CCJS file", () => {
    const expectedOffenceCodes = JSON.parse(
      fs.readFileSync(expectedCCJSOffenceCodesFile).toString()
    )
    const fileContents = fs.readFileSync("./test-data/input/INC275907.NPOFFP.CCJS.xlsx")
    const offenceCodes = convertXls(Buffer.from(fileContents))

    expect(offenceCodes.length).toEqual(expectedOffenceCodes.length)
  })
  it("should convert PNC ACPO file", () => {
    const expectedOffenceCodes = JSON.parse(
      fs.readFileSync(expectedACPOOffenceCodesFile).toString()
    )
    const fileContents = fs.readFileSync("./test-data/input/INC275907.NPOFFP.ACPO.xlsx")
    const offenceCodes = convertXls(Buffer.from(fileContents))
    expect(offenceCodes.length).toEqual(expectedOffenceCodes.length)
  })
})
