import { google } from "googleapis"
import type { RequestedChangesConfig } from "./config"

export default function googleSheets(config: RequestedChangesConfig) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const credentials = require(config.credentialsFile)

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  })
  const sheets = google.sheets({ version: "v4", auth })

  return sheets
}
