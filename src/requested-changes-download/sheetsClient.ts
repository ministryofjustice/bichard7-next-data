import { google, sheets_v4 as sheetsApi } from "googleapis"
import * as fs from "fs"
import type { RequestedChangesConfig } from "./config"

export type OffenceCodeRow = {
  cjsCode: string
  recordableOnPnc: string
  category: string
  title: string
  submitted: Date
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
    const rows = await this.sheetsClient.spreadsheets.values
      .get({ spreadsheetId: this.config.spreadsheetId, range: this.config.valuesRange })
      .then((res) => res.data)

    if (rows.values) {
      console.log(`Retrieved ${rows.values.length} rows of offence data from spreadsheet ${this.config.spreadsheetId}`)
    } else {
      throw Error("Failed to retrieve offence code data from the Google Sheets API")
    }

    return rows.values!.map((row) => {
      return <OffenceCodeRow>{
        cjsCode: row[2],
        recordableOnPnc: row[3],
        category: row[4],
        title: row[5],
        submitted: new Date(row[0])
      }
    })
  }
}
