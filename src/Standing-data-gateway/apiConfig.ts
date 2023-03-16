import { v4 as uuidv4 } from "uuid"

const myUuid = uuidv4()

export const apiUrl =
  "https://pss.clouddev.online/cld_StandingDataReferenceService/service/sdrs/sdrs/sdrsApi"

export const mojOffenceBody = {
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
