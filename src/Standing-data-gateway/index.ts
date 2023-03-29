import * as fs from "fs"
import consistentSort from "../lib/consistentSort"
import convertApiResponse from "./convertApiResponse"
import getOffence from "./getOffence"

export default async () => {
  console.log("Calling Standing Data API")

  const subListOfAlphaChar = [..."ABCDEFGHI"]
  const promisedTasks = subListOfAlphaChar.map((char) => getOffence(char))
  const apiResponses = await Promise.all(promisedTasks)

  // handle error
  const offenceCodes = apiResponses.map((apiResponse) => {
    return convertApiResponse(apiResponse)
  })
  const data = consistentSort(offenceCodes)
  await fs.promises.appendFile(
    "input-data/offence-code/standing-data-offences.json",
    JSON.stringify(data, null, 2)
  )
}
