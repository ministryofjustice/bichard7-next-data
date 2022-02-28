import { google } from "googleapis"

export default function googleSheets() {
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  if (!credentialsPath) {
    throw new Error("The $GOOGLE_APPLICATION_CREDENTIALS environment variable must be set")
  }
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const credentials = require(credentialsPath)

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  })
  const sheets = google.sheets({ version: "v4", auth })

  return sheets
}
