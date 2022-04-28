import mapCrestDisposalData from "./mapCrestDisposalData"

describe("mapCrestDisposalData", () => {
  it("it maps strings into native boolean types", () => {
    const result = mapCrestDisposalData([
      {
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
        needsMapping: "y",
        numberInResult: "",
        numberInResultType: "",
        qData: "*",
        qDilSeqNo: "*",
        rData: "Y",
        rDilSeqNo: "320",
        template: "1",
        timeInResult: ""
      }
    ])
    expect(result[0].needsMapping).toBe(true)
    expect(result[0].exception).toBe(false)
  })
})
