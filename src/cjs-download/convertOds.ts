import * as XLSX from "xlsx"
import { OffenceCode } from "../types/OffenceCode"

export type CjsOffenceCode = {
  "CJS Offence Code": string
  "Offence Title": string
  "Offence Category Code": string
  "Custodial Indicator": string
  "Recordable On PNC Indicator": string
}

export default (data: Buffer): OffenceCode[] => {
  const workbook = XLSX.read(data)

  if (workbook.SheetNames.length !== 1) {
    throw new Error(`Unexpected number of sheets [${workbook.SheetNames.length}] in workbook`)
  }

  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const jsonWorksheet: CjsOffenceCode[] = XLSX.utils.sheet_to_json(worksheet)
  return jsonWorksheet.map((offenceCode) => ({
    cjsCode: offenceCode["CJS Offence Code"],
    offenceTitle: offenceCode["Offence Title"],
    recordableOnPnc: offenceCode["Recordable On PNC Indicator"],
    offenceCategory: offenceCode["Offence Category Code"],
    resultHalfLifeHours: null
  }))
}
