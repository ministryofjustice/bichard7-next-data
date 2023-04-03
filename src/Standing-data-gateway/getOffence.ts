import axios from "axios"
import https from "https"
import { getOffenceApiResultSchema } from "../schemas/standingDataAPIResult"
import { ApiOffence } from "../types/StandingDataAPIResult"
import { devApiUrl, offenceBody } from "./apiConfig"

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
      console.log(result.data.MessageBody.GatewayOperationType.GetOffenceResponse.Offence)
      const newResult = parsedApiResult.MessageBody.GatewayOperationType.GetOffenceResponse.Offence
      console.log(`success with ${alphaChar}`)
      return newResult
    })
    .catch((error) => {
      console.log(`error with ${alphaChar}`)
      return error
    })
}
getOffence("A")

export default getOffence
