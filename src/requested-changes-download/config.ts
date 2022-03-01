export type RequestedChangesConfig = {
  credentialsFile: string
  spreadsheetId: string
  valuesRange: string
}

if (!process.env.GOOGLE_API_CREDENTIALS) {
  throw Error("GOOGLE_API_CREDENTIALS environment variable is not set")
}

const config: RequestedChangesConfig = {
  credentialsFile: process.env.GOOGLE_API_CREDENTIALS,
  spreadsheetId: process.env.SPREADSHEET_ID || "1FjhX66V4RcoeRddmSxNx6mJJrywISrI3hUAP1IvGLkI",
  valuesRange: process.env.VALUES_RANGE || "offenceCodeData"
}

export default config
