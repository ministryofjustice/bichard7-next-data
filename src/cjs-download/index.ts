import * as fs from "fs"
import downloadCjsFile from "./downloadCjsFile"
import { convertOds } from "./convertOds"
import consistentSort from "../lib/consistentSort"
import getDownloadUrl from "./config"

export default async () => {
  const downloadLocation = await getDownloadUrl()
  console.log(`Download Location :${downloadLocation}`)
  const fileContents = await downloadCjsFile(downloadLocation)
  const offenceCodes = await convertOds(fileContents)
  const data = await consistentSort(offenceCodes)
  await fs.promises.writeFile("input-data/offence-code/cjs-offences.json", JSON.stringify(data, null, 2))
}
