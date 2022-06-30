/* eslint-disable no-console */
import * as fs from "fs"
import policeOrganisationUnitData from "../../input-data/organisation-unit/police-forces.json"
import existingOrganisationUnitData from "../../output-data/data/organisation-unit.json"
import getDownloadUrl from "../cjs-download/getDownloadUrl"
import consistentSort from "../lib/consistentSort"
import downloadFile from "../lib/downloadFile"
import generateCourtOrganisationUnits from "./generateCourtOrganisationUnits"
import mergeOrganisationUnits from "./mergeOrganisationUnits"

export default async () => {
  console.log("Downloading Organisation Unit data")
  const downloadLinkRegex = /(https:\/\/.*cjs-courts-bc-ou-codes.*.xls.xlsx)"/i
  const downloadURL = await getDownloadUrl(downloadLinkRegex)
  const fileContents = await downloadFile(downloadURL)
  const courtOrganisationUnitData = generateCourtOrganisationUnits(fileContents)
  const generatedOrganisationUnitData = courtOrganisationUnitData.concat(policeOrganisationUnitData)
  const mergedData = mergeOrganisationUnits(
    generatedOrganisationUnitData,
    existingOrganisationUnitData
  )
  const sortedData = consistentSort(mergedData)
  await fs.promises.writeFile(
    "output-data/data/organisation-unit.json",
    JSON.stringify(sortedData, null, 2)
  )
  console.log("Organisation Unit data successfully downloaded")
}
