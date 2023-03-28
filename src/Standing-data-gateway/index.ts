import * as fs from "fs"
import consistentSort from "../lib/consistentSort"
import convertApiResponse from "./convertApiResponse"
import getOffence from "./getOffence"

// const listofChar = [..."ABCDEFGHIJKLMNOPQR"]

export default async () => {
  console.log("Calling Standing Data API")
  //   get the API response == "fileContents"
  const apiResponse = await getOffence("N")
  // handle error
  console.log("Retrieved API response")
  const offenceCodes = convertApiResponse(apiResponse)

  const data = consistentSort(offenceCodes)
  await fs.promises.writeFile(
    "input-data/offence-code/standing-data-offences.json",
    JSON.stringify(data, null, 2)
  )

  //  covertODS- map API response keys to align with input-data keys. == "offenceCodes"
  // consistent sort
  // write to file
  console.log("Standing Data API successfully downloaded")
}
