import * as fs from "fs"
import consistentSort from "../lib/consistentSort"
import convertApiResponse from "./convertApiResponse"
import getOffence from "./getOffence"

export default async () => {
  console.log("Calling Standing Data API")
  const alphaChar = [..."ABCDEFGHIJKLMNOPRSTUVWXYZ"] // "Q" Removed as not a valid request
  const chunks = 5
  const allApiResponses = []
  for (let i = 0; i < alphaChar.length; i += chunks) {
    let tempArray = []
    tempArray = alphaChar.slice(i, i + chunks)
    const promisedTasks = tempArray.map(getOffence)
    // eslint-disable-next-line no-await-in-loop
    allApiResponses.push(await Promise.all(promisedTasks))
  }

  console.log(allApiResponses)
  const offenceCodes = allApiResponses.flat().map(convertApiResponse)
  const data = consistentSort(offenceCodes.flat())
  await fs.promises.appendFile(
    "input-data/offence-code/standing-data-offences.json",
    JSON.stringify(data, null, 2)
  )

  console.log("Standing Data API data successfully retrieved")
}
