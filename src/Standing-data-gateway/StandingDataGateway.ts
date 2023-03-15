import https from "https"
import { apiUrl, mojOffenceBody } from "./apiConfig"
// import { MojOffence } from "../types/StandingDataAPIResult"

const axios = require("axios")

const transform = (apiResponse: any) => {
  const listOfOffences = apiResponse.map((o: any) => {
    return {
      cjsCode: o.code,
      offenceCategory: o.OffenceType,
      offenceTitle: o.OffenceWording,
      recordableOnPnc: o.Recordable,
      resultHalfLifeHours: null
    }
  })
  return listOfOffences
}

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
    .then((result: any) => {
      const data = result.data.MessageBody.GatewayOperationType.MOJOffenceResponse.MOJOffence
      return transform(data)
    })
}

getCjsData()
