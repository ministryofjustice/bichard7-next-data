import * as XLSX from "ts-xlsx"
import { OffenceCode } from "../types/OffenceCode"
import cjsCodeFilter from "../lib/cjsCodeFilter"

export type PncOffenceCode = {
  B: string
  C: string
  F: string
}

export default (fileName: string): OffenceCode[] => {
  const workbook = XLSX.readFile(fileName)

  if (workbook.SheetNames.length !== 1) {
    throw new Error(`Unexpected number of sheets [${workbook.SheetNames.length}] in workbook`)
  }

  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const jsonWorksheet: PncOffenceCode[] = XLSX.utils.sheet_to_json(worksheet, { header: "A" })

  return jsonWorksheet
    .map((offenceCode) => ({
      cjsCode: offenceCode["B"],
      offenceTitle: offenceCode["C"],
      recordableOnPnc: offenceCode["F"],
      resultHalfLifeHours: null
    }))
    .filter((offenceCode) => cjsCodeFilter(offenceCode.cjsCode))
}
