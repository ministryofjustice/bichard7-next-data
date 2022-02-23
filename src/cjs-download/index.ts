import * as fs from "fs"
import CjsFileDownloader from "./CjsFileDownloader"
import { convertOds } from "./convertOds"
import consistentSort from "../lib/consistentSort"

export default async () => {
  const fileContents = await CjsFileDownloader.download()
  const offenceCodes = await convertOds(fileContents)
  const data = await consistentSort(offenceCodes)
  await fs.promises.writeFile("input-data/offence-code/cjs-offences.json", JSON.stringify(data, null, 2))
}
