import * as fs from "fs"
import consistentSort from "../lib/consistentSort"
import config from "./config"
import convertRow from "./convertRow"
import mergeRequests from "./mergeRequests"
import SheetsClient from "./sheetsClient"

export default async () => {
  const allRows = await new SheetsClient(config).retrieveOffenceCodeRows()
  const deduplicatedRows = mergeRequests(allRows)
  const offenceCodes = deduplicatedRows.map(convertRow)
  const data = consistentSort(offenceCodes)
  await fs.promises.writeFile("input-data/offence-code/requested-changes.json", JSON.stringify(data, null, 2))
  console.log("Requested changes data written")
}
