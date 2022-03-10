import fs from "fs"
import downloadPncFile from "./downloadPncFile"
import convertXls from "./convertXls"
import consistentSort from "../lib/consistentSort"

const download = async (bucketName: string, bucketKey: string, outputFile: string) => {
  const fileContents = await downloadPncFile(bucketName, bucketKey)
  const offenceCodes = convertXls(fileContents)
  const data = consistentSort(offenceCodes)
  await fs.promises.writeFile(outputFile, JSON.stringify(data, null, 2))
}

export default async () => {
  const bucketName = "bichard-7-si2-standing-data"
  download(bucketName, "pnc-acpo.xlsx", "input-data/offence-code/pnc-acpo-cjs-offences.json")
  download(bucketName, "pnc-ccjs.xlsx", "input-data/offence-code/pnc-ccjs-cjs-offences.json")
}
