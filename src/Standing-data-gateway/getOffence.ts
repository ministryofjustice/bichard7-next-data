import https from "https"
import axios from "axios"
import { offenceBody, devApiUrl } from "./apiConfig"
import { ApiOffence } from "../types/StandingDataAPIResult"
import { getOffenceApiResultSchema } from "../schemas/standingDataAPIResult"

// TODO- go through missing json data.
// TODO -  diff between revisions of files

// TODO - create new file in input-data folder to have `standing-data-api.json` file with all offence codes

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
      console.log(`success with ${alphaChar}`)
      return newResult
    })
    .catch((error) => {
      console.log(`error with ${alphaChar}`)
      return error
    })
}

// TODO check if zodding inside the axios call is the clean way to do things.
// TODO - check the best way to call in payload config.

export default getOffence
