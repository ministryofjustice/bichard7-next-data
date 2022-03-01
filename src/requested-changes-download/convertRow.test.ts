import convertRow from "./convertRow"
import type { OffenceCodeRow } from "./sheetsClient"
import type { OffenceCode } from "../types/OffenceCode"

describe("convertRow", () => {
  it("Should parse an offence code out of a well-formed row", () => {
    const row = <OffenceCodeRow>{
      recordableOnPnc: "Yes",
      requestFrom: "London",
      cjsCode: "BC12345",
      scope: "National",
      category: "CE",
      startDate: "17/02/2022",
      endDate: undefined,
      title: "Wearing a silly hat",
      legislation: "Wearing a hat that is excessively silly in violation of the Silly Hat Order 2022"
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
      requestFrom: "London",
      cjsCode: "BC12345",
      scope: "National",
      category: "LONGCATEGORY",
      startDate: "01/03/2022",
      endDate: undefined,
      title: "Wearing a silly hat",
      legislation: "Wearing a hat that is excessively silly in violation of the Silly Hat Order 2022"
    }

    expect(() => convertRow(row)).toThrowError(/^Invalid offence category/)
  })
})
