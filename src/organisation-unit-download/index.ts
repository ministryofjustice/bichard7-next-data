/* eslint-disable no-console */
import * as fs from "fs"
import consistentSort from "../lib/consistentSort"
import downloadFile from "../shared/downloadFile"
import generateOrganisationUnitJSON from "./generateOrganisationUnitObjects"

export default async () => {
  console.log("Downloading CJS data")
  const downloadURL =
    "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/1030752/cjs-courts-bc-ou-codes-v32.xls.xlsx"
  const fileContents = await downloadFile(downloadURL)
  const jsonFile = generateOrganisationUnitJSON(fileContents)
  const data = consistentSort(jsonFile)
  await fs.promises.writeFile(
    "output-data/data/organisation-unit.json",
    JSON.stringify(data, null, 2)
  )
  console.log("Organisation Unit data successfully downloaded")
}
