import { ResultCode } from "../../output-data/types/types"
import mergeCjsResultCodes from "./mergeCjsResultCodes"

describe("MergeCjsResultCodes", () => {
  it("Merges the downloaded cjs result codes with the existing ones", () => {
    const newData: ResultCode[] = [
      {
        cjsCode: "1001",
        description: "Uncoded text result",
        resultCodeQualifiers: "",
        resultHalfLifeHours: "",
        type: "F"
      },
      {
        cjsCode: "1002",
        description: "Imprisonment",
        recordableOnPnc: "",
        resultCodeQualifiers: "",
        resultHalfLifeHours: "72",
        type: "F"
      }
    ]

    const existingData: ResultCode[] = [
      {
        cjsCode: "1002",
        description: "Imprisonment",
        recordableOnPnc: "",
        resultCodeQualifiers: "",
        resultHalfLifeHours: "72",
        type: "F"
      },
      {
        cjsCode: "1003",
        description: "Detained during HM Pleasure",
        recordableOnPnc: "",
        resultCodeQualifiers: "",
        resultHalfLifeHours: "72",
        type: "F"
      }
    ]

    const expectedData: ResultCode[] = [
      {
        cjsCode: "1002",
        description: "Imprisonment",
        recordableOnPnc: "",
        resultCodeQualifiers: "",
        resultHalfLifeHours: "72",
        type: "F"
      },
      {
        cjsCode: "1003",
        description: "Detained during HM Pleasure",
        recordableOnPnc: "",
        resultCodeQualifiers: "",
        resultHalfLifeHours: "72",
        type: "F"
      },
      {
        cjsCode: "1001",
        description: "Uncoded text result",
        resultCodeQualifiers: "",
        resultHalfLifeHours: "",
        type: "F"
      }
    ]

    const mergedData = mergeCjsResultCodes(newData, existingData)
    expect(mergedData).toEqual(expectedData)
  })
})
