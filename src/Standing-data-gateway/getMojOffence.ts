import https from "https"
import axios from "axios"
import * as fs from "fs"
import { devApiUrl, mojOffenceBody } from "./apiConfig"
import { ApiMojOffence } from "../types/StandingDataAPIResult"
import { getMojOffenceApiResultSchema } from "../schemas/standingDataAPIResult"

// TODO- figure out when to write files
const fileCreatedNotification = () => console.log("file created")
const filewriter = (data: any) => {
  fs.writeFile("devcjscode.json", JSON.stringify(data, null, 2), null, fileCreatedNotification)
}

const getDevCjsData = (): Promise<ApiMojOffence[] | Error> => {
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
      filewriter(result.data)
      const parsedApiResult = getMojOffenceApiResultSchema.parse(result.data)
      return parsedApiResult.MessageBody.GatewayOperationType.MOJOffenceResponse.MOJOffence
    })
    .catch((error) => error)
}

getDevCjsData()
