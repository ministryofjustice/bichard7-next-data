/* eslint-disable no-await-in-loop, no-console */
import * as fs from "fs"
import consistentSort from "../lib/consistentSort"
import config from "./config"
import PnldFileDownloader from "./PnldFileDownloader"
import processPnldFiles from "./processPnldFiles"

export default async () => {
  for (let i = 0; i < 5; i++) {
    try {
      console.log("Downloading PNLD data")
      const downloader = new PnldFileDownloader(config)
      const files = await downloader.download()
      const records = await processPnldFiles(files)
      const data = consistentSort(records)
      await fs.promises.writeFile(
        "input-data/offence-code/pnld-offences.json",
        JSON.stringify(data, null, 2)
      )
      console.log("PNLD data successfully downloaded")
      return
    } catch (e) {
      console.error("Error downloading PNLD data")
      console.error(e)
    }
  }
}
