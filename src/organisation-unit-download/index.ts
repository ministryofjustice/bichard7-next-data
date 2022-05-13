/* eslint-disable no-console */
import * as fs from "fs"
import getDownloadUrl from "../cjs-download/getDownloadUrl"
import consistentSort from "../lib/consistentSort"
import downloadFile from "../lib/downloadFile"
import generateOrganisationUnitJSON from "./generateOrganisationUnitObjects"

export default async () => {
  console.log("Downloading Organisation Unit data")
  const downloadLinkRegex = /(https:\/\/.*cjs-courts-bc-ou-codes.*.xls.xlsx)"/i
  const downloadURL = await getDownloadUrl(downloadLinkRegex)
  const fileContents = await downloadFile(downloadURL)
  const jsonFile = generateOrganisationUnitJSON(fileContents)
  const data = consistentSort(jsonFile)
  await fs.promises.writeFile(
    "output-data/data/organisation-unit.json",
    JSON.stringify(data, null, 2)
  )
  console.log("Organisation Unit data successfully downloaded")
}
