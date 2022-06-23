import fs from "fs"
import forces from "../output-data/data/forces.json"
import consistentSort from "./lib/consistentSort"
import generatePoliceOrganisationUnits from "./organisation-unit-download/generatePoliceOrganisationUnits"

const spreadsheetData = fs.readFileSync(
  "input-data/organisation-unit/INC275907.UT400J.FSCODES.xlsx"
)

const main = async () => {
  const policeOrgUnits = generatePoliceOrganisationUnits(spreadsheetData, forces)
  const sortedData = consistentSort(policeOrgUnits)

  await fs.promises.writeFile(
    "input-data/organisation-unit/police-forces.json",
    JSON.stringify(sortedData, null, 2)
  )
}

main()
  .then(() => console.log("Police Organisation Units are generated"))
  .catch((err) => console.error(err))
