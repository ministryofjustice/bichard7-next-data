import * as XLSX from "xlsx"
import { OrganisationUnit } from "../types/OrganisationUnit"
import isActiveOrganisationUnit from "./isActiveOrganisationUnit"

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

const emptyRow = (row: OrganisationUnit | undefined): Boolean => {
  return (
    row === undefined ||
    (row.topLevelCode === undefined &&
      row.bottomLevelCode === undefined &&
      row.secondLevelCode === undefined &&
      row.thirdLevelCode === undefined &&
      row.topLevelName === undefined &&
      row.bottomLevelName === undefined &&
      row.secondLevelName === undefined &&
      row.thirdLevelName === undefined)
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
      if (isActiveOrganisationUnit(record.I, record.J)) {
        return {
          topLevelCode: String(record.A),
          secondLevelCode: String(record.B),
          thirdLevelCode: String(record.C),
          bottomLevelCode: String(record.D),
          topLevelName: record.E,
          secondLevelName: record.F,
          thirdLevelName: record.G,
          bottomLevelName: record.H
        }
      }
      return undefined
    })
    .filter((record) => !emptyRow(record)) as OrganisationUnit[]
}

export default generateOrganisationUnitObjects
