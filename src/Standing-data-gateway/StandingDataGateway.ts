import { v4 as uuidv4 } from "uuid"
import https from "https"

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
    .then((res: any) => {
      const data = res.data.MessageBody.GatewayOperationType.MOJOffenceResponse.MOJOffence
      return console.log(data)
    })
}

getCjsData()
