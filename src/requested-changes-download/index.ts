import config from "./config"
import SheetsClient from "./sheetsClient"
import convertRow from "./convertRow"

export default async () => {
  const rows = await new SheetsClient(config).retrieveOffenceCodeRows()
  const offenceCodes = rows.map(convertRow)

  return offenceCodes
}
