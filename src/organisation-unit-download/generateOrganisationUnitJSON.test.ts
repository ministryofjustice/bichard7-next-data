import generateOrganisationUnitJSON from "./generateOrganisationUnitJSON"
import fs from "fs"
import { OrganisationUnit } from "../types/OrganisationUnit"


describe("GenerateOrganisationUnitJSON", () => {
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
        startDate: new Date("2004-01-01"),
        endDate: new Date("2014-11-30")
      },
      {
        topLevelCode: "B",
        secondLevelCode: "62",
        thirdLevelCode: "WL",
        bottomLevelCode: "00",
        topLevelName: "Magistrates' Courts",
        secondLevelName: "South Wales",
        thirdLevelName: "Aberdare (County Court, Cwmbach Road)",
        startDate: new Date("2007-11-12"),
        endDate: new Date("2011-07-31")
      },
      {
        topLevelCode: "B",
        secondLevelCode: "62",
        thirdLevelCode: "AB",
        bottomLevelCode: "00",
        topLevelName: "Magistrates' Courts",
        secondLevelName: "South Wales",
        thirdLevelName: "Aberdare Youth Court",
        startDate: new Date("2006-03-28"),
        endDate: new Date("2008-07-07")
      }
    ]

    expect(generateOrganisationUnitJSON(fileContents)).toEqual(expectedContent)
  })
})
