import * as XLSX from "xlsx"
import { OrganisationUnit } from "../types/OrganisationUnit"

export type OrganisationUnitData = {
  A: string
  B: string
  C: string
  D: string
  E: string
  F: string
  G: string
  H: string
  I: Date
  J: Date
}

const generateOrganisationUnitObjects = (fileContents: Buffer): OrganisationUnit[] => {
  const workbook = XLSX.read(fileContents)

  const valueToDate = (value: any): Date | undefined => {
    if (typeof value === "string") {
      return new Date(value)
    }
    if (typeof value === "number") {
      return new Date((value - (25567 + 2)) * 86400 * 1000)
    }
    throw Error("Unknown date type")
  }

  const worksheet = workbook.Sheets[workbook.SheetNames[1]]
  const jsonWorksheet: OrganisationUnitData[] = XLSX.utils.sheet_to_json(worksheet, { header: "A" })
  jsonWorksheet.shift()
  const result = jsonWorksheet.map((record) => {
    return {
      topLevelCode: record.A,
      secondLevelCode: record.B,
      thirdLevelCode: record.C,
      bottomLevelCode: record.D,
      topLevelName: record.E,
      secondLevelName: record.F,
      thirdLevelName: record.G,
      bottomLevelName: record.H,
      startDate: valueToDate(record.I),
      endDate: valueToDate(record.J)
    }
  })
  return result
}

export default generateOrganisationUnitObjects
