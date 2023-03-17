import https from "https"
import axios from "axios"
import * as fs from "fs"
import { devApiUrl, mojOffenceBody } from "./apiConfig"
import { ApiOffence } from "../types/StandingDataAPIResult"
import { apiResultSchema } from "../schemas/standingDataAPIResult"

const fileCreatedNotification = () => console.log("file created")
const filewriter = (data: any) => {
  fs.writeFile("devcjscode.json", JSON.stringify(data, null, 2), null, fileCreatedNotification)
}

const getDevCjsData = (): Promise<ApiOffence[]> => {
  return axios
    .post(devApiUrl, mojOffenceBody, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })
    .then((result) => {
      const parsedApiResult = apiResultSchema.parse(result.data)
      const offences =
        parsedApiResult.MessageBody.GatewayOperationType.MOJOffenceResponse.MOJOffence
      filewriter(offences)
      return result
    })
    .catch((error) => error)
}

getDevCjsData()
