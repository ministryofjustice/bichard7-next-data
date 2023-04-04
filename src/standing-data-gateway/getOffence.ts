import axios from "axios"
import https from "https"
import { v4 as uuidv4 } from "uuid"
import { getOffenceApiResultSchema } from "../schemas/standingDataAPIResult"
import { ApiOffence } from "../types/StandingDataAPIResult"
import config from "./config"

const getOffence = async (alphaChar: string): Promise<ApiOffence[] | Error> => {
  return axios
    .post(
      config.endPoint,
      {
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
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        auth: {
          username: config.username,
          password: config.password
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      }
    )
    .then((result) => {
      const parsedApiResult = getOffenceApiResultSchema.parse(result.data)
      const newResult = parsedApiResult.MessageBody.GatewayOperationType.GetOffenceResponse.Offence
      return newResult
    })
    .catch((error) => {
      console.log(`error with ${alphaChar}`)
      return error
    })
}

export default getOffence
