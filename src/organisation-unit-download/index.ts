/* eslint-disable no-console */
import downloadFile from "../shared/downloadFile"
import generateOrganisationUnitJSON from "./generateOrganisationUnitObjects"

export default async () => {
  console.log("Downloading CJS data")
  const downloadURL =
    "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/1030752/cjs-courts-bc-ou-codes-v32.xls.xlsx"
  const fileContents = await downloadFile(downloadURL)
  const jsonFile = generateOrganisationUnitJSON(fileContents)
  console.log(jsonFile)
}
