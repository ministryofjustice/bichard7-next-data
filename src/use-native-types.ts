/* eslint-disable import/no-relative-packages */

import fs from "fs"
import mapCrestDisposalData from "./map-data/mapCrestDisposalData"
import { CrestDisposal } from "./types/CrestDisposal"
import crestDisposalData from "../output-data/data/crest-disposal.json"

const crestDisposal: CrestDisposal[] = mapCrestDisposalData(crestDisposalData)

const main = async () => {
  await fs.promises.writeFile(
    "output-data/data/crest-disposal.json",
    JSON.stringify(crestDisposal, null, 2)
  )
}

main()
  .then(() => console.log("Map static data into native types"))
  .catch((err) => console.error(err))
