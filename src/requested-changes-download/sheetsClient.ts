import { google, sheets_v4 as sheetsApi } from "googleapis"
import * as fs from "fs"
import type { RequestedChangesConfig } from "./config"

export type OffenceCodeRow = {
  recordableOnPnc: string
  requestFrom: string
  cjsCode: string
  scope: string
  category: string
  startDate: string
  endDate?: string
  title: string
  legislation: string
}

export default class SheetsClient {
  config: RequestedChangesConfig

  sheetsClient: sheetsApi.Sheets

  constructor(options: RequestedChangesConfig) {
    this.config = options

    const credentials = JSON.parse(fs.readFileSync(this.config.credentialsFile).toString())
    const requiredProperties = ["client_email", "private_key"]
    requiredProperties.forEach((requiredProperty) => {
      if (!credentials[requiredProperty]) {
        throw Error(`Credentials file must specify ${requiredProperty}`)
      }
    })

    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
    })
    this.sheetsClient = google.sheets({ version: "v4", auth })
  }

  async retrieveOffenceCodeRows(): Promise<OffenceCodeRow[]> {
    const rowsRaw = await this.sheetsClient.spreadsheets.values
      .get({ spreadsheetId: this.config.spreadsheetId, range: this.config.valuesRange })
      .then((res) => res.data)

    if (!rowsRaw.values) {
      throw Error("Failed to retrieve offence code data from the Google Sheets API")
    }

    return rowsRaw.values!.map((row) => {
      return <OffenceCodeRow>{
        recordableOnPnc: row[0],
        requestFrom: row[1],
        cjsCode: row[2],
        scope: row[3],
        category: row[4],
        startDate: row[5],
        endDate: row[6] ? row[6] : undefined,
        title: row[7],
        legislation: row[8]
      }
    })
  }
}
