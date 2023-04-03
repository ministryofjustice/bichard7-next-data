import https from "https"
import axios from "axios"
import { devApiUrl, mojOffenceBody } from "./apiConfig"
import { ApiMojOffence } from "../types/StandingDataAPIResult"
import { getMojOffenceApiResultSchema } from "../schemas/standingDataAPIResult"

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
      const parsedApiResult = getMojOffenceApiResultSchema.parse(result.data)
      return parsedApiResult.MessageBody.GatewayOperationType.MOJOffenceResponse.MOJOffence
    })
    .catch((error) => error)
}

getDevCjsData()
