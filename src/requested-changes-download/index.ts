import config from "./config"
import googleSheets from "./sheetsApi"

export default async () => {
  const sheets = googleSheets(config)
  const spreadsheetId = "1JJh0eZjW8fUOA-_RwMGT9xZlXs6FQFkGgZKUshxr8jU"
  const valuesRange = "offenceCodeData" // Named range from the sheet

  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: valuesRange })
  return res.data
}
