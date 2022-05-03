import type { OffenceCodeRow } from "./sheetsClient"
import type { OffenceCode } from "../types/OffenceCode"
import valueToBoolean from "../lib/valueToBoolean"

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
    recordableOnPnc: valueToBoolean(row.recordableOnPnc),
    resultHalfLifeHours: null
  }
}

export default convertRow
