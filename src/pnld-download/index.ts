import * as fs from "fs"
import consistentSort from "../lib/consistentSort"
import PnldFileDownloader from "./PnldFileDownloader"
import processPnldFiles from "./processPnldFiles"
import config from "./config"

export default async () => {
  const downloader = new PnldFileDownloader(config)
  const files = await downloader.download()
  const records = await processPnldFiles(files)
  const data = consistentSort(records)
  await fs.promises.writeFile("input-data/offence-code/pnld-offences.json", JSON.stringify(data, null, 2))
}
