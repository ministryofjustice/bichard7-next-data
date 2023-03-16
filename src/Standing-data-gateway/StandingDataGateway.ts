import https from "https"
import axios from "axios"
import { apiUrl, mojOffenceBody } from "./apiConfig"
import { ApiResult, MojOffence } from "../types/StandingDataAPIResult"
import { apiResultSchema } from "../schemas/standingDataAPIResult"

const getCjsData = () => {
  axios
    .post(apiUrl, mojOffenceBody, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })
    .then((result) => {
      const data = result.data.MessageBody.GatewayOperationType.MOJOffenceResponse.MOJOffence
      const listOfOffences = data.map((o: ApiResult): MojOffence => {
        const offences = apiResultSchema.parse(o)
        return offences
      })
      console.log(listOfOffences)
      return listOfOffences
    })
}
getCjsData()
