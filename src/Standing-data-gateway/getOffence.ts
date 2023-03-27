import https from "https"
import axios from "axios"
import * as fs from "fs"
import { offenceBody, devApiUrl } from "./apiConfig"
import { ApiOffence } from "../types/StandingDataAPIResult"
import { getOffenceApiResultSchema } from "../schemas/standingDataAPIResult"

// const fileCreatedNotification = () => console.log("file created")
// TODO- apply zod type to file
// TODO after discussions with ben:
// TODO- create a file that replicates the `download-offence-code-data`
// create a map function that calls over every single letter in the AlphaChar param
// ensure consistent sort is used so that you can diff between revisions of files
// create new file in input-data folder to have `standing-data-api.json` file with all offence codes
// TODO- go through missing json data.
const fileCreatedNotification = () => console.log("file created")
const filewriter = (data: any) => {
  fs.writeFile("offencecode.json", JSON.stringify(data, null, 2), null, fileCreatedNotification)
}
const getOffence = (): Promise<ApiOffence[] | Error> => {
  return axios
    .post(devApiUrl, offenceBody, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })
    .then((result) => {
      const parsedApiResult = getOffenceApiResultSchema.parse(result.data)
      const newResult = parsedApiResult.MessageBody.GatewayOperationType.GetOffenceResponse.Offence
      filewriter(newResult)
      return newResult
    })
    .catch((error) => error)
}

getOffence()
