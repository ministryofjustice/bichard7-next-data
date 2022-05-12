import * as XLSX from "xlsx"
import { OrganisationUnit } from "../types/OrganisationUnit"
import dateToISOString from "./dateToISOString"

export type OrganisationUnitData = {
  A: string
  B: string
  C: string
  D: string
  E: string
  F: string
  G: string
  H: string
  I: string
  J: string
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
        startDate: dateToISOString(record.I),
        endDate: dateToISOString(record.J)
      }
    })
    .filter((record) => !emptyRow(record))
}

export default generateOrganisationUnitObjects
