import fs from "fs"
import consistentSort from "../lib/consistentSort"
import convertXls from "./convertXls"
import downloadPncFile from "./downloadPncFile"

const download = async (bucketName: string, bucketKey: string, outputFile: string) => {
  const fileContents = await downloadPncFile(bucketName, bucketKey)
  const offenceCodes = convertXls(fileContents)
  const data = consistentSort(offenceCodes)
  await fs.promises.writeFile(outputFile, JSON.stringify(data, null, 2))
}

export default async () => {
  console.log("Downloading PNC data")
  const bucketName = "bichard-7-si2-standing-data"
  await download(bucketName, "pnc-acpo.xlsx", "input-data/offence-code/pnc-acpo-cjs-offences.json")
  await download(bucketName, "pnc-ccjs.xlsx", "input-data/offence-code/pnc-ccjs-cjs-offences.json")
  console.log("PNC data successfully downloaded")
}
