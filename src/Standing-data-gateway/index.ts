import * as fs from "fs"
import consistentSort from "../lib/consistentSort"
import convertApiResponse from "./convertApiResponse"
import getOffence from "./getOffence"

export default async () => {
  console.log("Calling Standing Data API")

  // const subListOfAlphaChar = [..."AB"]
  const subListOfAlphaChar = [..."ABCDEFGHI"]
  const promisedTasks = subListOfAlphaChar.map((char) => getOffence(char))
  const apiResponses = await Promise.all(promisedTasks)

  // const subListOfAlphaChar2 = [..."CD"]
  const subListOfAlphaChar2 = [..."JKLMNOPR"]
  const promisedTasks2 = subListOfAlphaChar2.map((char) => getOffence(char))
  const apiResponses2 = await Promise.all(promisedTasks2)

  // const subListOfAlphaChar3 = [..."EF"]
  const subListOfAlphaChar3 = [..."STUVWXYZ"]
  const promisedTasks3 = subListOfAlphaChar3.map((char) => getOffence(char))
  const apiResponses3 = await Promise.all(promisedTasks3)

  const allApiResponses = [apiResponses, apiResponses2, apiResponses3].flat()
  console.log(allApiResponses.length)

  const offenceCodes = allApiResponses.map((responses) => convertApiResponse(responses))
  const data = consistentSort(offenceCodes.flat())
  await fs.promises.appendFile(
    "input-data/offence-code/standing-data-offences.json",
    JSON.stringify(data, null, 2)
  )
}
