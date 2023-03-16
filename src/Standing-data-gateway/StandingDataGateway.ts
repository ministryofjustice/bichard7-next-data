import https from "https"
import axios from "axios"
import { apiUrl, mojOffenceBody } from "./apiConfig"

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
      const listOfOffences = data.map((o: any) => {
        return {
          cjsCode: o.code,
          offenceCategory: o.OffenceType,
          offenceTitle: o.OffenceWording,
          recordableOnPnc: o.Recordable,
          resultHalfLifeHours: null
        }
      })
      console.log(listOfOffences)
      return listOfOffences
    })
}

getCjsData()
