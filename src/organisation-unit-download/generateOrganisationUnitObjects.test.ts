import fs from "fs"
import generateOrganisationUnitObjects from "./generateOrganisationUnitObjects"
import { OrganisationUnit } from "../types/OrganisationUnit"

describe("GenerateOrganisationUnit", () => {
  it("should generate JSON output from the XLS content", () => {
    const fileContents = fs.readFileSync("./test-data/input/test-ou-codes.xlsx")
    const expectedContent: OrganisationUnit[] = [
      {
        topLevelCode: "B",
        secondLevelCode: "62",
        thirdLevelCode: "AA",
        bottomLevelCode: "00",
        topLevelName: "Magistrates' Courts",
        secondLevelName: "South Wales",
        thirdLevelName: "Aberdare",
        bottomLevelName: undefined,
        startDate: new Date("2004-01-01").toISOString(),
        endDate: new Date("2014-11-30").toISOString()
      },
      {
        topLevelCode: "B",
        secondLevelCode: "62",
        thirdLevelCode: "WL",
        bottomLevelCode: "00",
        topLevelName: "Magistrates' Courts",
        secondLevelName: "South Wales",
        thirdLevelName: "Aberdare (County Court, Cwmbach Road)",
        bottomLevelName: undefined,
        startDate: new Date("2007-11-12").toISOString(),
        endDate: new Date("2011-07-31").toISOString()
      },
      {
        topLevelCode: "B",
        secondLevelCode: "62",
        thirdLevelCode: "AB",
        bottomLevelCode: "00",
        topLevelName: "Magistrates' Courts",
        secondLevelName: "South Wales",
        thirdLevelName: "Aberdare Youth Court",
        bottomLevelName: undefined,
        startDate: new Date("2006-03-28").toISOString(),
        endDate: new Date("2008-07-07").toISOString()
      }
    ]
    expect(generateOrganisationUnitObjects(fileContents)).toEqual(expectedContent)
  })

  it("should not include empty rows", () => {
    const fileContentsWithEmptyRows = fs.readFileSync(
      "./test-data/input/cjs-courts-bc-ou-codes-v32.xls.xlsx"
    )
    expect(generateOrganisationUnitObjects(fileContentsWithEmptyRows)).toHaveLength(1190)
  })

  it.only("should filter records by start and end date", () => {
    const fileContents = fs.readFileSync("./test-data/input/test-ou-codes.xlsx")
    expect(generateOrganisationUnitObjects(fileContents)).toEqual([])
  })
})
