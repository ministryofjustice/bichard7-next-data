import * as XLSX from "ts-xlsx"
import { OffenceCode } from "../types/OffenceCode"

export type CjsOffenceCode = {
  "CJS Offence Code": string,
  "Offence Title": string,
  "Offence Category Code": string,
  "Custodial Indicator": string,
  "Recordable On PNC Indicator": string
}

export async function convertOds(data: Buffer): Promise<Array<OffenceCode>> {
  const offenceCodes: OffenceCode[] = []
  const workbook = XLSX.read(data)

  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName]
    const jsonWorksheet = XLSX.utils.sheet_to_json(worksheet)
    jsonWorksheet.forEach((cjsOffenceCode) => {
      const offenceCode = cjsOffenceCode as CjsOffenceCode

      offenceCodes.push({
        cjsCode: offenceCode["CJS Offence Code"],
        offenceTitle: offenceCode["Offence Title"],
        recordableOnPnc: offenceCode["Recordable On PNC Indicator"],
        offenceCategory: offenceCode["Offence Category Code"],
        resultHalfLifeHours: null
      })
    })
  })

  return offenceCodes
}
