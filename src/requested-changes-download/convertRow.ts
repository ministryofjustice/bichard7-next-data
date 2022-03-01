import type { OffenceCodeRow } from "./sheetsClient"
import type { OffenceCode } from "../types/OffenceCode"

function formResponseToBooleanishString(formResponse: string): string | undefined {
  switch (formResponse.toLowerCase()) {
    case "y":
    case "yes":
      return "Y"
    case "n":
    case "no":
      return "N"
    default:
      return undefined
  }
}

function validateOffenceCategory(category: string) {
  if (!category.match(/^[A-Z]{2}$/)) {
    throw Error(`Invalid offence category: ${category}`)
  }
}

function convertRow(row: OffenceCodeRow): OffenceCode {
  validateOffenceCategory(row.category)

  return <OffenceCode>{
    cjsCode: row.cjsCode,
    description: row.cjsCode,
    offenceCategory: row.category,
    offenceTitle: row.title,
    recordableOnPnc: formResponseToBooleanishString(row.recordableOnPnc),
    resultHalfLifeHours: null
  }
}

export default convertRow
