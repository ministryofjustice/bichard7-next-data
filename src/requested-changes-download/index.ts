import config from "./config"
import convertRow from "./convertRow"
import mergeRequests from "./mergeRequests"
import SheetsClient from "./sheetsClient"

export default async () => {
  const allRows = await new SheetsClient(config).retrieveOffenceCodeRows()
  const deduplicatedRows = mergeRequests(allRows)
  const offenceCodes = deduplicatedRows.map(convertRow)

  return offenceCodes
}
