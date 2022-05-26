import * as XLSX from "xlsx"
import { OrganisationUnit } from "../types/OrganisationUnit"
import { Force } from "../types/Force"

export type SheetData = {
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

const emptyOrInvalidRow = (row: OrganisationUnit | undefined): Boolean => {
  return row === undefined || row.thirdLevelName === undefined || row.thirdLevelName === ""
}

const generatePoliceOrganisationUnits = (
  fileContents: Buffer,
  forces: Force[]
): OrganisationUnit[] => {
  const workbook = XLSX.read(fileContents)
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const jsonWorksheet: SheetData[] = XLSX.utils.sheet_to_json(worksheet, {
    blankrows: false,
    header: "A"
  })

  // Remove the first 4 header rows before map
  return jsonWorksheet
    .slice(4)
    .map((record) => {
      return {
        topLevelName: "Police Service",
        secondLevelName:
          forces.find((f) => f.code === record.A?.trim().substring(0, 2))?.name ?? "",
        thirdLevelName: record.C?.trim().replace(/\s+/g, " "),
        secondLevelCode: record.A?.trim().substring(0, 2),
        thirdLevelCode: record.A?.trim().substring(2, 4),
        topLevelCode: "",
        bottomLevelCode: "00",
        bottomLevelName: "",
        thirdLevelPsaCode: ""
      }
    })
    .filter((record) => !emptyOrInvalidRow(record)) as OrganisationUnit[]
}

export default generatePoliceOrganisationUnits
