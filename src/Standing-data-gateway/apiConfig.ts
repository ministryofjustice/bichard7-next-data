import { v4 as uuidv4 } from "uuid"

const myUuid = uuidv4()

export const liveApiUrl =
  "https://pss.clouddev.online/cld_StandingDataReferenceService/service/sdrs/sdrs/sdrsApi"

export const devApiUrl =
  "https://crime-reference-data-api.staging.service.justice.gov.uk/cld_StandingDataReferenceService/service/sdrs/sdrs/sdrsApi"

export const mojOffenceBody = {
  MessageHeader: {
    MessageID: {
      UUID: myUuid,
      RelatesTo: ""
    },
    TimeStamp: new Date(),
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
