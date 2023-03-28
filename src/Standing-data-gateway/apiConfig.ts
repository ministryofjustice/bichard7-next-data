import { v4 as uuidv4 } from "uuid"

export const liveApiUrl =
  "https://pss.clouddev.online/cld_StandingDataReferenceService/service/sdrs/sdrs/sdrsApi"

export const devApiUrl =
  "https://crime-reference-data-api.staging.service.justice.gov.uk/cld_StandingDataReferenceService/service/sdrs/sdrs/sdrsApi"

export const mojOffenceBody = {
  MessageHeader: {
    MessageID: {
      UUID: uuidv4(),
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

export const applicationRequestBody = {
  MessageHeader: {
    MessageID: {
      UUID: uuidv4(),
      RelatesTo: ""
    },
    TimeStamp: new Date(),
    MessageType: "GetApplications",
    From: "CONSUMER_APPLICATION",
    To: "SDRS_AZURE"
  },
  MessageBody: {
    GatewayOperationType: {
      GetApplicationRequest: {
        CJSCode: "",
        AllOffences: "ALL",
        ChangedDate: ""
      }
    }
  }
}

export const offenceBody = (alphaChar: string) => {
  return {
    MessageHeader: {
      MessageID: {
        UUID: uuidv4(),
        RelatesTo: ""
      },
      TimeStamp: new Date(),
      MessageType: "GetOffence",
      From: "CONSUMER_APPLICATION",
      To: "SDRS_AZURE"
    },
    MessageBody: {
      GatewayOperationType: {
        GetOffenceRequest: {
          CJSCode: null,
          AlphaChar: alphaChar,
          AllOffences: "ALL",
          ChangedDate: null
        }
      }
    }
  }
}
