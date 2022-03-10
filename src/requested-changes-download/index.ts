import * as fs from "fs"
import consistentSort from "../lib/consistentSort"
import config from "./config"
import convertRow from "./convertRow"
import mergeRequests from "./mergeRequests"
import SheetsClient from "./sheetsClient"

export default async () => {
  const allRows = await new SheetsClient(config).retrieveOffenceCodeRows()
  console.log(`Retrieved ${allRows.length} rows of offence code data from spreadsheet ${config.spreadsheetId}`)
  const deduplicatedRows = mergeRequests(allRows)
  console.log(`Deduplicated update requests into ${deduplicatedRows.length} updates`)
  const offenceCodes = deduplicatedRows.map(convertRow)
  console.log("Converted update requests into offence codes")
  const data = consistentSort(offenceCodes)
  const fileName = "input-data/offence-code/requested-changes.json"
  await fs.promises.writeFile(fileName, JSON.stringify(data, null, 2))
  console.log(`Requested changes offence code data written to ${fileName}`)
}
