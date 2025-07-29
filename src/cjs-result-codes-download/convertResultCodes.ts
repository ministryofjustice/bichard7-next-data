import * as XLSX from "xlsx"
import { ResultCode } from "../../output-data/types/types"

export type CjsResultCode = {
  "CJS Result Code": string
  "Result Description": string
  "Result Applicable Qualifier Code": string
  "Bichard7-PNC MaxHoursPriority ": string
  "Result Type Code": string
}

const cleanValue = (value: unknown): string => {
  if (typeof value === "string") return value.trim()
  if (typeof value === "number") return value.toString().trim()
  return ""
}

export default (fileContents: Buffer): ResultCode[] => {
  const workbook = XLSX.read(fileContents)
  const worksheet = workbook.Sheets[workbook.SheetNames[1]]
  const jsonWorksheet: CjsResultCode[] = XLSX.utils.sheet_to_json(worksheet)

  return jsonWorksheet.map((record) => ({
    cjsCode: cleanValue(record["CJS Result Code"]),
    description: cleanValue(record["Result Description"]),
    recordableOnPnc: "",
    resultCodeQualifiers: cleanValue(record["Result Applicable Qualifier Code"]),
    resultHalfLifeHours: cleanValue(record["Bichard7-PNC MaxHoursPriority "]),
    type: cleanValue(record["Result Type Code"])
  }))
}
