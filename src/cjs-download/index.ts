import * as fs from "fs"
import consistentSort from "../lib/consistentSort"
import convertOds from "./convertOds"
import downloadCjsFile from "./downloadCjsFile"
import getDownloadUrl from "./getDownloadUrl"

export default async () => {
  const downloadLocation = await getDownloadUrl()
  const fileContents = await downloadCjsFile(downloadLocation)
  const offenceCodes = convertOds(fileContents)
  const data = consistentSort(offenceCodes)
  await fs.promises.writeFile(
    "input-data/offence-code/cjs-offences.json",
    JSON.stringify(data, null, 2)
  )
}
