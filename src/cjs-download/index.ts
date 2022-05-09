/* eslint-disable no-console */
import * as fs from "fs"
import consistentSort from "../lib/consistentSort"
import convertOds from "./convertOds"
import downloadCjsFile from "./downloadCjsFile"
import getDownloadUrl from "./getDownloadUrl"
import mapOffenceCodeData from "../map-data/mapOffenceCodeData"

type OffenceCodeRecords = {
  cjsCode: string
  description?: string
  homeOfficeClassification?: string | null
  notifiableToHo?: string
  recordCreated?: number[]
  source?: string
  offenceCategory?: string
  offenceTitle?: string
  recordableOnPnc?: string
  resultHalfLifeHours?: string | null
}

export default async () => {
  console.log("Downloading CJS data")
  const downloadLocation = await getDownloadUrl()
  const fileContents = await downloadCjsFile(downloadLocation)
  const offenceCodes = convertOds(fileContents)
  const data = mapOffenceCodeData(consistentSort(offenceCodes) as OffenceCodeRecords[])
  await fs.promises.writeFile(
    "input-data/offence-code/cjs-offences.json",
    JSON.stringify(data, null, 2)
  )
  console.log("CJS data successfully downloaded")
}
