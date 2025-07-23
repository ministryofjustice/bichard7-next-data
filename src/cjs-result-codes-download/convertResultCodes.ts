import * as XLSX from "xlsx"
import { ResultCode } from "../../output-data/types/types"

export type CjsResultCode = {
  "CJS Result Code": string
  "Result Description": string
  "Bichard7-PNC MaxHoursPriority": string
  "Result Type Code": string
}

export default (fileContents: Buffer): ResultCode[] => {
  const workbook = XLSX.read(fileContents)
  const worksheet = workbook.Sheets[workbook.SheetNames[1]]
  const jsonWorksheet: CjsResultCode[] = XLSX.utils.sheet_to_json(worksheet)

  return jsonWorksheet.map((record) => ({
    cjsCode: record["CJS Result Code"],
    description: record["Result Description"],
    recordableOnPnc: "",
    resultCodeQualifiers: "",
    resultHalfLifeHours: record["Bichard7-PNC MaxHoursPriority"],
    type: record["Result Type Code"]
  }))
}
