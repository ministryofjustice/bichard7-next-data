/* eslint-disable import/no-relative-packages */

import fs from "fs"
import mapCrestDisposalData from "./map-data/mapCrestDisposalData"
import mapResultCodeData from "./map-data/mapResultCodeData"
import { CrestDisposal } from "./types/CrestDisposal"
import { ResultCode } from "./types/ResultCode"
import crestDisposalData from "../output-data/data/crest-disposal.json"
import resultCodeData from "../output-data/data/result-code.json"

const crestDisposal: CrestDisposal[] = mapCrestDisposalData(crestDisposalData)
const resultCode: ResultCode[] = mapResultCodeData(resultCodeData)

const main = async () => {
  await fs.promises.writeFile(
    "output-data/data/crest-disposal.json",
    JSON.stringify(crestDisposal, null, 2)
  )

  await fs.promises.writeFile(
    "output-data/data/result-code.json",
    JSON.stringify(resultCode, null, 2)
  )
}

main()
  .then(() => console.log("Map static data into native types"))
  .catch((err) => console.error(err))
