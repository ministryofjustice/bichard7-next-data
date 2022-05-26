/* eslint-disable no-console */
/* eslint-disable import/no-relative-packages */
import fs from "fs"
import organisationUnitDownload from "./organisation-unit-download"
import forces from "../output-data/data/forces.json"
import consistentSort from "./lib/consistentSort"
import generatePoliceOrganisationUnits from "./organisation-unit-download/generatePoliceOrganisationUnits"

const spreasheetData = fs.readFileSync("input-data/organisation-unit/INC275907.UT400J.FSCODES.xlsx")

/* eslint-disable @typescript-eslint/no-unused-vars */
const reGeneratePoliceOrganisationUnits = async () => {
  const policeOrgUnits = generatePoliceOrganisationUnits(spreasheetData, forces)
  const sortedData = consistentSort(policeOrgUnits)

  await fs.promises.writeFile(
    "input-data/organisation-unit/police-forces.json",
    JSON.stringify(sortedData, null, 2)
  )
}

const main = async () => {
  // await reGeneratePoliceOrganisationUnits()
  await organisationUnitDownload()
}

main()
  .then(() => console.log("Organisation Unit data is downloaded"))
  .catch((err) => console.error(err))
