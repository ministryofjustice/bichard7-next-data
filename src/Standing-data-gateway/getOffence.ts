import https from "https"
import axios from "axios"
import * as fs from "fs"
import { offenceBody, devApiUrl } from "./apiConfig"

const fileCreatedNotification = () => console.log("file created")
// TODO- apply zod type to file
// TODO after discussions with ben:
// TODO- create a file that replicates the `download-offence-code-data`
// create a map function that calls over every single letter in the AlphaChar param
// ensure consistent sort is used so that you can diff between revisions of files
// create new file in input-data folder to have `standing-data-api.json` file with all offence codes

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
