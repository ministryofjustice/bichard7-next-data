import * as fs from "fs"
import consistentSort from "../lib/consistentSort"
import convertApiResponse from "./convertApiResponse"
import getOffence from "./getOffence"

export default async () => {
  console.log("Calling Standing Data API")

  const listofChar = [..."ABCDEFGHI"]
  const promisedTasks = listofChar.map((char) => getOffence(char))
  const apiResponses = await promisedTasks

  // handle error
  apiResponses.map(async (apiResponse) => {
    const offenceCodes = convertApiResponse(await apiResponse)
    const data = consistentSort(offenceCodes)

    await fs.promises.appendFile(
      "input-data/offence-code/standing-data-offences.json",
      JSON.stringify(data, null, 2)
    )
  })
}
