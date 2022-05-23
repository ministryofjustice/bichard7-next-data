/* eslint-disable no-console */
/* eslint-disable import/no-relative-packages */
import * as fs from "fs"
import existingOrganisationUnitData from "../../output-data/data/organisation-unit.json"
import getDownloadUrl from "../cjs-download/getDownloadUrl"
import consistentSort from "../lib/consistentSort"
import downloadFile from "../lib/downloadFile"
import generateOrganisationUnitObjects from "./generateOrganisationUnitObjects"
import backFillThirdLevelPsaCode from "./backFillThirdLevelPsaCode"
import { OrganisationUnit } from "../types/OrganisationUnit"

export default async () => {
  console.log("Downloading Organisation Unit data")
  const downloadLinkRegex = /(https:\/\/.*cjs-courts-bc-ou-codes.*.xls.xlsx)"/i
  const downloadURL = await getDownloadUrl(downloadLinkRegex)
  const fileContents = await downloadFile(downloadURL)
  const newOrganisationUnitData = generateOrganisationUnitObjects(fileContents)
  const jsonFileContent = backFillThirdLevelPsaCode(
    newOrganisationUnitData,
    existingOrganisationUnitData as OrganisationUnit[]
  )
  const data = consistentSort(jsonFileContent)
  await fs.promises.writeFile(
    "output-data/data/organisation-unit.json",
    JSON.stringify(data, null, 2)
  )
  console.log("Organisation Unit data successfully downloaded")
}
