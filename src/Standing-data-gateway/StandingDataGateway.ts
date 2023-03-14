import { v4 as uuidv4 } from "uuid"

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const axios = require("axios")

const myUuid = uuidv4()

const config = {
  Accept: "application/json",
  "Content-Type": "application/json"
}

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
    .post(url, body, config)
    .then((res: any) =>
      console.log(res.data.MessageBody.GatewayOperationType.MOJOffenceResponse.MOJOffence)
    )
}

getCjsData()
