import https from "https"
import axios from "axios"
// import * as fs from "fs"
import { offenceBody, devApiUrl } from "./apiConfig"
import { ApiOffence } from "../types/StandingDataAPIResult"
import { getOffenceApiResultSchema } from "../schemas/standingDataAPIResult"

// const fileCreatedNotification = () => console.log("file created")

// TODO- create a file that replicates the `download-offence-code-data`
// create a map function that calls over every single letter in the AlphaChar param
// TODO - ensure consistent sort is used so that you can diff between revisions of files
// TODO - create new file in input-data folder to have `standing-data-api.json` file with all offence codes
// TODO- go through missing json data.

// const fileCreatedNotification = () => console.log("file created")
// const filewriter = (data: any) => {
//   fs.appendFile("offencecode.json", JSON.stringify(data, null, 2), fileCreatedNotification)
// }

const getOffence = async (alphaChar: string): Promise<ApiOffence[] | Error> => {
  console.log(`running getOffence() with "${alphaChar}"`)
  return axios
    .post(devApiUrl, offenceBody(alphaChar), {
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
      // filewriter(newResult)
      console.log(`success with ${alphaChar}`)
      return newResult
    })
    .catch((error) => {
      // filewriter(error)
      console.log(`error with ${alphaChar}`)
      return error
    })
}

// const listofChar = [..."ABCDEFGHIJKLMNOPQR"]
// listofChar.map((char) => getOffence(char))

// TODO check if zodding inside the axios call is the clean way to do things.
// TODO - check the best way to call in payload config.

export default getOffence
