import config from "./config"
import SheetsClient from "./sheetsClient"

export default async () => {
  return new SheetsClient(config).retrieveOffenceCodeRows()
}
