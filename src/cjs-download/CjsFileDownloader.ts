import axios from "axios"
import cjsIndexFileLocation from "./config"

export default class CjsFileDownloader {
  static async download(): Promise<Buffer> {
    const response = await axios({
      url: cjsIndexFileLocation,
      method: "GET",
      responseType: "arraybuffer",
    })

    if (response.status === 200) {
      console.log("Downloaded file successfully")
      return Buffer.from(response.data)
    }

    throw Error(`Unexpected status code [${response.status}]`)
  }
}
