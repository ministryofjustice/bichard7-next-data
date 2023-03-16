import https from "https"
import axios from "axios"
import * as fs from "fs"
import { apiUrl, mojOffenceBody } from "./apiConfig"
import { ApiResult, MojOffence } from "../types/StandingDataAPIResult"
import { apiResultSchema } from "../schemas/standingDataAPIResult"

const fakefunction = () => console.log("file created")
const getCjsData = () => {
  axios
    .post(apiUrl, mojOffenceBody, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      auth: {
        username: "pss",
        password: "TreeCupMouse"
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
      const filewriter = () => {
        fs.writeFile("cjscode.json", JSON.stringify(listOfOffences), null, fakefunction)
      }
      filewriter()
      return listOfOffences
    })
    .catch((error) => console.log(error))
}
getCjsData()
