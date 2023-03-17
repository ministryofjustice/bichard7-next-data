import https from "https"
import axios from "axios"
import * as fs from "fs"
import { offenceBody, devApiUrl } from "./apiConfig"

const fileCreatedNotification = () => console.log("file created")
// TODO- apply zod type to file
const getOffence = () => {
  axios
    .post(devApiUrl, offenceBody, {
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
          "getOffence.json",
          JSON.stringify(result.data, null, 2),
          null,
          fileCreatedNotification
        )
      }
      filewriter()
    })
    .catch((error) => console.log(error))
}

getOffence()
