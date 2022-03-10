import * as XLSX from "xlsx"
import { OffenceCode } from "../types/OffenceCode"
import cjsCodeFilter from "../lib/cjsCodeFilter"
import consistentWhitespace from "../lib/consistentWhitespace"

export type PncOffenceCode = {
  B: string
  C: string
  F: string
}

export default (fileContents: Buffer): OffenceCode[] => {
  const workbook = XLSX.read(fileContents)

  if (workbook.SheetNames.length !== 1) {
    throw new Error(`Unexpected number of sheets [${workbook.SheetNames.length}] in workbook`)
  }

  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const jsonWorksheet: PncOffenceCode[] = XLSX.utils.sheet_to_json(worksheet, { header: "A" })

  return jsonWorksheet
    .map((offenceCode) => ({
      cjsCode: offenceCode.B,
      offenceTitle: consistentWhitespace(offenceCode.C),
      recordableOnPnc: offenceCode.F,
      resultHalfLifeHours: null
    }))
    .filter((offenceCode) => offenceCode.offenceTitle != null)
    .filter((offenceCode) => cjsCodeFilter(offenceCode.cjsCode))
}
