/* eslint-disable func-names */
// import axios from "axios"
import * as https from "https"
import { v4 as uuidv4 } from "uuid"

const axios = require("axios")

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

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
const standingDateURl =
  "https://crime-reference-data-api.staging.service.justice.gov.uk/cld_StandingDataReferenceService/service/sdrs/sdrs/sdrsApi"

async function doPostRequest() {
  const res = await axios.post(standingDateURl, { httpsAgent }, body)

  const data = res
  console.log(data)
}

doPostRequest()
// Axios post request

// const header = {
//   Accept: "application/json",
//   "Content-Type": "application/json"
// }

// const postTask = () => {
//   return axios
//     .post(standingDateURl, {
//       httpsAgent,
//       header,
//       body
//     })
//     .then(function (response) {
//       console.log("response", response.data)
//     })
//     .catch((error) => console.log("error", error))
// }
// Generate UUID
// Capturing the data in JSON format
// const { data } = await axios.post("/user", document.querySelector("#my-form"), {
//   headers: {
//     "Content-Type": "application/json"
//   }
// })

// postTask()
