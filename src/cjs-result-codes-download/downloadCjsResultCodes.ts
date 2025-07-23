import getDownloadUrl from "../cjs-download/getDownloadUrl"
import downloadFile from "../lib/downloadFile"
import convertResultCodes from "./convertResultCodes"

const downloadCjsResultCodes = async () => {
  console.log("Downloading CJS Result Codes")
  const downloadLinkRegex = /(https:\/\/.*cjs-result-codes.*\.xlsx?)"/i
  const downloadUrl = await getDownloadUrl(downloadLinkRegex)
  const fileContents = await downloadFile(downloadUrl)
  convertResultCodes(fileContents)
}

export default downloadCjsResultCodes
