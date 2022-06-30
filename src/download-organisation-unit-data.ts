/* eslint-disable no-console */
import fs from "fs"
import forces from "../output-data/data/forces.json"
import consistentSort from "./lib/consistentSort"
import organisationUnitDownload from "./organisation-unit-download"
import generatePoliceOrganisationUnits from "./organisation-unit-download/generatePoliceOrganisationUnits"

const spreadsheetData = fs.readFileSync(
  "input-data/organisation-unit/INC275907.UT400J.FSCODES.xlsx"
)

/* eslint-disable @typescript-eslint/no-unused-vars */
const reGeneratePoliceOrganisationUnits = async () => {
  const policeOrgUnits = generatePoliceOrganisationUnits(spreadsheetData, forces)
  const sortedData = consistentSort(policeOrgUnits)

  await fs.promises.writeFile(
    "input-data/organisation-unit/police-forces.json",
    JSON.stringify(sortedData, null, 2)
  )
}

const main = async () => {
  await reGeneratePoliceOrganisationUnits()
  await organisationUnitDownload()
}

main()
  .then(() => console.log("Organisation Unit data is downloaded"))
  .catch((err) => console.error(err))
