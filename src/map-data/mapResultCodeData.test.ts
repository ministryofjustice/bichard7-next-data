import mapResultCodeData from "./mapResultCodeData"

const resultCodeRecord = {
  cjsCode: "1021",
  description: "No Order Made",
  recordableOnPnc: "",
  resultCodeQualifiers: "",
  resultHalfLifeHours: "72",
  type: "F"
}

describe("mapResultCodeData", () => {
  it("it maps truthy strings into native boolean types", () => {
    resultCodeRecord.recordableOnPnc = "y"
    const result = mapResultCodeData([resultCodeRecord])

    expect(Object.keys(result[0]).length).toBe(6)
    expect(result[0].recordableOnPnc).toBe(true)
  })

  it("it maps falsy strings into native boolean types", () => {
    resultCodeRecord.recordableOnPnc = "no"
    const result = mapResultCodeData([resultCodeRecord])

    expect(Object.keys(result[0]).length).toBe(6)
    expect(result[0].recordableOnPnc).toBe(false)
  })
})
