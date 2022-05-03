import mapCrestDisposalData from "./mapCrestDisposalData"

const crestDisposalRecord = {
  amountInResult: "",
  amountInResultType: "",
  dateInResult: "",
  disposalCode: "ALTRTSS",
  duration: "",
  durationType: "",
  durationUnit: "",
  exception: " ",
  hoQualifiers: "BA",
  hoResultCode: "3110",
  id: "22",
  needsMapping: "",
  numberInResult: "",
  numberInResultType: "",
  qData: "*",
  qDilSeqNo: "*",
  rData: "Y",
  rDilSeqNo: "320",
  template: "1",
  timeInResult: ""
}

describe("mapCrestDisposalData", () => {
  it("it maps truthy strings into native boolean types", () => {
    crestDisposalRecord.needsMapping = "y"
    crestDisposalRecord.exception = "y"
    const result = mapCrestDisposalData([crestDisposalRecord])

    expect(Object.keys(result[0]).length).toBe(20)
    expect(result[0].needsMapping).toBe(true)
    expect(result[0].exception).toBe(true)
  })

  it("it maps falsy strings into native boolean types", () => {
    crestDisposalRecord.needsMapping = "n"
    crestDisposalRecord.exception = " no"
    const result = mapCrestDisposalData([crestDisposalRecord])

    expect(Object.keys(result[0]).length).toBe(20)
    expect(result[0].needsMapping).toBe(false)
    expect(result[0].exception).toBe(false)
  })
})
