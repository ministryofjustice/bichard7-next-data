import fs from "fs"
import convertResultCodes from "./convertResultCodes"
import expectedCjsResultCodes from "../../test-data/expected-output/cjs-result-codes-expected.json"

describe("convertResultCodes", () => {
  it("converts XLSX buffer into ResultCode[]", () => {
    const fileContent = fs.readFileSync("./test-data/input/cjs-result-codes.xlsx")

    const convertedResultCodes = convertResultCodes(fileContent)

    expect(convertedResultCodes).toEqual(expectedCjsResultCodes)
  })
})
