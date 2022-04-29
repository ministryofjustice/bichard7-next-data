import mapOffenceCodeData from "./mapOffenceCodeData"

const offenceCodeRecord = {
  cjsCode: "0101TA007",
  description: "0101TA007",
  homeOfficeClassification: "000/00",
  notifiableToHo: "N",
  offenceCategory: "CE",
  offenceTitle: "",
  recordableOnPnc: "Y",
  resultHalfLifeHours: null
}

describe("mapOffenceCodeData", () => {
  it("it maps truthy strings into native boolean types", () => {
    offenceCodeRecord.recordableOnPnc = "y"
    offenceCodeRecord.notifiableToHo = "y"
    const result = mapOffenceCodeData([offenceCodeRecord])

    expect(Object.keys(result[0]).length).toBe(8)
    expect(result[0].recordableOnPnc).toBe(true)
    expect(result[0].notifiableToHo).toBe(true)
  })

  it("it maps falsy strings into native boolean types", () => {
    offenceCodeRecord.recordableOnPnc = "n"
    offenceCodeRecord.notifiableToHo = " "
    const result = mapOffenceCodeData([offenceCodeRecord])

    expect(Object.keys(result[0]).length).toBe(8)
    expect(result[0].recordableOnPnc).toBe(false)
    expect(result[0].notifiableToHo).toBe(false)
  })
})
