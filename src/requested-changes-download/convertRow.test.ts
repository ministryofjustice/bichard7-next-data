import convertRow from "./convertRow"
import type { OffenceCodeRow } from "./sheetsClient"
import type { OffenceCode } from "../types/OffenceCode"

describe("convertRow", () => {
  it("Should parse an offence code out of a well-formed row", () => {
    const row = <OffenceCodeRow>{
      recordableOnPnc: "Yes",
      cjsCode: "BC12345",
      category: "CE",
      title: "Wearing a silly hat",
      submitted: new Date()
    }

    const offenceCode = convertRow(row)

    expect(offenceCode).toEqual(<OffenceCode>{
      cjsCode: "BC12345",
      description: "BC12345",
      homeOfficeClassification: undefined,
      notifiableToHo: undefined,
      offenceCategory: "CE",
      offenceTitle: "Wearing a silly hat",
      recordableOnPnc: "Y",
      resultHalfLifeHours: null
    })
  })

  it("Should reject long offence categories", () => {
    const row = <OffenceCodeRow>{
      recordableOnPnc: "Yes",
      cjsCode: "BC12345",
      category: "LONGCATEGORY",
      title: "Wearing a silly hat"
    }

    expect(() => convertRow(row)).toThrowError(/^Invalid offence category/)
  })
})
