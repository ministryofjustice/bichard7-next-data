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

const GenerateOrganisationUnitJSON = (fileContents: Buffer): OrganisationUnit[] => {
  const workbook = XLSX.read(fileContents, {
    // type: 'binary',
    cellDates: true,
    cellNF: false,
    cellText: false
  })
  
  const valueToDate = (_value: any): Date => {
    return new Date()
  }
  
  const worksheet = workbook.Sheets[workbook.SheetNames[1]]
  console.log(worksheet)
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
      startDate: new Date(valueToDate(record.H)),
      endDate: new Date(valueToDate(record.I))
    }
  })
  return result
}

export default GenerateOrganisationUnitJSON
