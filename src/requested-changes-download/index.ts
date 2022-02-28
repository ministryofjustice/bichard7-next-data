import googleSheets from "./sheetsApi"

export default async () => {
  const sheets = googleSheets()
  const spreadsheetId = "1JJh0eZjW8fUOA-_RwMGT9xZlXs6FQFkGgZKUshxr8jU"
  const valuesRange = "Requested changes from form!C:L"

  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: valuesRange })
  return res.data
}
