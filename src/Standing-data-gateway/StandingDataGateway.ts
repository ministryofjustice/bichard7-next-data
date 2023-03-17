import https from "https"
import axios from "axios"
import * as fs from "fs"
import { devApiUrl, mojOffenceBody } from "./apiConfig"
import { ApiResult, MojOffence } from "../types/StandingDataAPIResult"
import { apiResultSchema } from "../schemas/standingDataAPIResult"

const fileCreatedNotification = () => console.log("file created")

const getDevCjsData = () => {
  axios
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
      const offenceData = result.data.MessageBody.GatewayOperationType.MOJOffenceResponse.MOJOffence
      const listOfOffences = offenceData.map((offence: ApiResult): MojOffence => {
        const parsedOffence = apiResultSchema.parse(offence)
        return parsedOffence
      })
      const filewriter = () => {
        fs.writeFile(
          "devcjscode.json",
          JSON.stringify(listOfOffences),
          null,
          fileCreatedNotification
        )
      }
      filewriter()
      return listOfOffences
    })
    .catch((error) => console.log(error))
}

getDevCjsData()
