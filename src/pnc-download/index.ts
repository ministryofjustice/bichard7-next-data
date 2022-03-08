import * as fs from "fs"
import downloadPncFile from "./downloadPncFile"
import convertXls from "./convertXls"
import consistentSort from "../lib/consistentSort"

export default async () => {
  const fileContents = await downloadPncFile("bichard-7-si2-standing-data", "pnc-acpo.xlsx")
  const offenceCodes = convertXls(fileContents)
  const data = consistentSort(offenceCodes)
  await fs.promises.writeFile(
    "input-data/offence-code/pnc-cjs-offences.json",
    JSON.stringify(data, null, 2)
  )
}
