import * as XLSX from "xlsx"
import organisationUnitDownload from "."
import { OrganisationUnit } from "../types/OrganisationUnit"
import isActiveOrganisationUnit from "./isActiveOrganisationUnit"
import valueToDate from "./valueToDate"

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

const emptyRow = (row: any): Boolean => {
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

  const resovled = jsonWorksheet
    .map((record) => {
      if (isActiveOrganisationUnit(valueToDate(record.I), valueToDate(record.J)) {
         return {
          topLevelCode: record.A,
          secondLevelCode: record.B,
          thirdLevelCode: record.C,
          bottomLevelCode: record.D,
          topLevelName: record.E,
          secondLevelName: record.F,
          thirdLevelName: record.G,
          bottomLevelName: record.H
        } 
      } else {
        return {
          topLevelCode: undefined,
          secondLevelCode: undefined,
          thirdLevelCode: undefined,
          bottomLevelCode: undefined,
          topLevelName: undefined,
          secondLevelName: undefined,
          thirdLevelName: undefined,
          bottomLevelName: undefined
        }  
      }
    }).filter((record) => !emptyRow(record))
  return resovled
}

export default generateOrganisationUnitObjects
