export type RequestedChangesConfig = {
  credentialsFile?: string
  apiKey?: string
  spreadsheetId: string
  valuesRange: string
}

const config: RequestedChangesConfig = {
  spreadsheetId: process.env.SPREADSHEET_ID || "1FjhX66V4RcoeRddmSxNx6mJJrywISrI3hUAP1IvGLkI",
  valuesRange: process.env.VALUES_RANGE || "offenceCodeData"
}

if (process.env.GOOGLE_API_CREDENTIALS) {
  config.credentialsFile = process.env.GOOGLE_API_CREDENTIALS
} else if (process.env.GOOGLE_API_KEY) {
  config.apiKey = process.env.GOOGLE_API_KEY
} else {
  throw Error("One of GOOGLE_API_CREDENTIALS or GOOGLE_API_KEY environment variables must be set")
}

export default config
