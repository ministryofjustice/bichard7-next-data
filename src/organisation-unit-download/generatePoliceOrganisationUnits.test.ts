/* eslint-disable import/no-relative-packages */
import fs from "fs"
import { OrganisationUnit } from "../../output-data/types/types"
import generatePoliceOrganisationUnits from "./generatePoliceOrganisationUnits"
import forces from "../../output-data/data/forces.json"

describe("GeneratePoliceUnits", () => {
  it("should not include empty rows", () => {
    const fileContents = fs.readFileSync("./test-data/input/INC275907.UT400J.FSCODES-short.xlsx")
    const policeData = generatePoliceOrganisationUnits(fileContents, forces)

    expect(policeData).toHaveLength(4)

    expect(policeData[0]).toEqual({
      topLevelName: "Police Service",
      secondLevelName: "London Metropolitan Police",
      thirdLevelName: "PNC SPECIALIST ENQUIRIES (FORMERLY-PNC- POLICY AND PLANNING)",
      bottomLevelName: "",
      topLevelCode: "",
      secondLevelCode: "01",
      thirdLevelCode: "",
      bottomLevelCode: "00",
      thirdLevelPsaCode: ""
    } as OrganisationUnit)

    expect(policeData[1]).toEqual({
      topLevelName: "Police Service",
      secondLevelName: "London Metropolitan Police",
      thirdLevelName: "BELGRAVIA SOUTH WESTMINSTER.OCU",
      bottomLevelName: "",
      topLevelCode: "",
      secondLevelCode: "01",
      thirdLevelCode: "AB",
      bottomLevelCode: "00",
      thirdLevelPsaCode: ""
    } as OrganisationUnit)

    expect(policeData[2]).toEqual({
      topLevelName: "Police Service",
      secondLevelName: "London Metropolitan Police",
      thirdLevelName: "DIRECTORATE PROFESSIONAL STANDARD (DPS) PROSECUTION",
      bottomLevelName: "",
      topLevelCode: "",
      secondLevelCode: "01",
      thirdLevelCode: "AC",
      bottomLevelCode: "00",
      thirdLevelPsaCode: ""
    } as OrganisationUnit)

    expect(policeData[3]).toEqual({
      topLevelName: "Police Service",
      secondLevelName: "London Metropolitan Police",
      thirdLevelName: "BELGRAVIA POLICE STATION PART OF CITY OF WESTMINSTER BOROUGH",
      bottomLevelName: "",
      topLevelCode: "",
      secondLevelCode: "01",
      thirdLevelCode: "AD",
      bottomLevelCode: "00",
      thirdLevelPsaCode: ""
    } as OrganisationUnit)
  })
})
