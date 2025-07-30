import * as fs from "fs"
import getDownloadUrl from "../cjs-download/getDownloadUrl"
import consistentSort from "../lib/consistentSort"
import downloadFile from "../lib/downloadFile"
import convertResultCodes from "./convertResultCodes"

const downloadCjsResultCodes = async () => {
  console.log("Downloading CJS Result Codes")
  const downloadLinkRegex = /(https:\/\/.*cjs-result-codes.*\.xlsx?)"/i
  const downloadUrl = await getDownloadUrl(downloadLinkRegex)
  const fileContents = await downloadFile(downloadUrl)
  const resultCodes = convertResultCodes(fileContents)
  const sortedData = consistentSort(resultCodes)
  await fs.promises.writeFile(
    "input-data/cjs-result-codes/cjs-result-data.json",
    JSON.stringify(sortedData, null, 2)
  )
  console.log("CJS Result Codes successfully downloaded")
}

export default downloadCjsResultCodes
