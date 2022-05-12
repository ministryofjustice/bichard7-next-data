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

const valueToDate = (value: any): Date | undefined => {
  let result: Date | undefined

  if (typeof value === "string") {
    result = new Date(value)
  } else if (typeof value === "number") {
    result = new Date((value - (25567 + 2)) * 86400 * 1000)
  }

  if (result instanceof Date && Number.isNaN(result.getTime())) {
    return undefined
  }
  return result
}

const emptyRow = (row: OrganisationUnit): Boolean => {
  return (
    row.topLevelCode === undefined &&
    row.bottomLevelCode === undefined &&
    row.secondLevelCode === undefined &&
    row.thirdLevelCode === undefined &&
    row.topLevelName === undefined &&
    row.bottomLevelName === undefined &&
    row.secondLevelName === undefined &&
    row.thirdLevelName === undefined &&
    row.startDate === undefined &&
    row.endDate === undefined
  )
}

const generateOrganisationUnitObjects = (fileContents: Buffer): OrganisationUnit[] => {
  const workbook = XLSX.read(fileContents)
  const worksheet = workbook.Sheets[workbook.SheetNames[1]]
  const jsonWorksheet: OrganisationUnitData[] = XLSX.utils.sheet_to_json(worksheet, {
    blankrows: false,
    header: "A"
  })
  jsonWorksheet.shift()

  return jsonWorksheet
    .map((record) => {
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
    .filter((record) => !emptyRow(record))
}

export default generateOrganisationUnitObjects
