import https from "https"
import axios from "axios"
import * as fs from "fs"
import { applicationRequestBody, devApiUrl } from "./apiConfig"

const fileCreatedNotification = () => console.log("file created")

const getAppliationRequest = () => {
  axios
    .post(devApiUrl, applicationRequestBody, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })
    .then((result) => {
      const filewriter = () => {
        fs.writeFile(
          "applicationRequest.json",
          JSON.stringify(result.data, null, 2),
          null,
          fileCreatedNotification
        )
      }
      filewriter()
    })
    .catch((error) => console.log(error))
}

getAppliationRequest()
