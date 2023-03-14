import { v4 as uuidv4 } from "uuid"
import https from "https"
// import { MojOffence } from "../types/StandingDataAPIResult"

const axios = require("axios")

const myUuid = uuidv4()

const body = {
  MessageHeader: {
    MessageID: {
      UUID: myUuid,
      RelatesTo: ""
    },
    TimeStamp: "2023-03-014T00:00:00Z",
    MessageType: "GetMojOffence",
    From: "CONSUMER_APPLICATION",
    To: "SDRS_AZURE"
  },
  MessageBody: {
    GatewayOperationType: {
      GetMojOffenceRequest: {
        CJSCode: "",
        AllOffences: "ALL",
        ChangedDate: ""
      }
    }
  }
}

const url =
  "https://crime-reference-data-api.staging.service.justice.gov.uk/cld_StandingDataReferenceService/service/sdrs/sdrs/sdrsApi"
// map through each line.
const transform = (apiResponse: any): MojOffence => {
  return {
    // TODO - figure out
    apiResponse.map((response) => ({
      cjsCode: response.Code,
      offenceCategory: response.OffenceType,
      offenceTitle: response.OffenceWording,
      recordableOnPnc: response.Recordable

    }))
  }
}

const getCjsData = () => {
  axios
    .post(url, body, {
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
      console.log(data[0].code)
      // return transform(data)
    })
}

getCjsData()
