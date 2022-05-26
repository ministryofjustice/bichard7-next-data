/* eslint-disable no-console */
/* eslint-disable import/no-relative-packages */
import * as fs from "fs"
import existingOrganisationUnitData from "../../output-data/data/organisation-unit.json"
import getDownloadUrl from "../cjs-download/getDownloadUrl"
import consistentSort from "../lib/consistentSort"
import downloadFile from "../lib/downloadFile"
import generateCourtOrganisationUnits from "./generateCourtOrganisationUnits"
import backFillThirdLevelPsaCode from "./backFillThirdLevelPsaCode"
import { OrganisationUnit } from "../types/OrganisationUnit"
import policeOrganisationUnitData from "../../input-data/organisation-unit/police-forces.json"

export default async () => {
  console.log("Downloading Organisation Unit data")
  const downloadLinkRegex = /(https:\/\/.*cjs-courts-bc-ou-codes.*.xls.xlsx)"/i
  const downloadURL = await getDownloadUrl(downloadLinkRegex)
  const fileContents = await downloadFile(downloadURL)
  const courtOrganisationUnitData = generateCourtOrganisationUnits(fileContents)
  const courtOrganisationUnitDataWithPsaCode = backFillThirdLevelPsaCode(
    courtOrganisationUnitData,
    existingOrganisationUnitData as OrganisationUnit[]
  )
  const allOrganisationUnitData = courtOrganisationUnitDataWithPsaCode.concat(
    policeOrganisationUnitData
  )
  const data = consistentSort(allOrganisationUnitData)
  await fs.promises.writeFile(
    "output-data/data/organisation-unit.json",
    JSON.stringify(data, null, 2)
  )
  console.log("Organisation Unit data successfully downloaded")
}
