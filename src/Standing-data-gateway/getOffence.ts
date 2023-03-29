import https from "https"
import axios from "axios"
import { offenceBody, devApiUrl } from "./apiConfig"
import { ApiOffence } from "../types/StandingDataAPIResult"
import { getOffenceApiResultSchema } from "../schemas/standingDataAPIResult"

// TODO- go through missing json data.
// clarify where recordable on PNC data. Look at the merger file.
//  From invesitgation looking at the `merge-offence-data.ts` cjs-download is not being used to populate recordable on PNC so does it really amtter if its missing from api return? - For Ben.

// TODO -  diff between revisions of files
//  cat input-data/offence-code/current-standing-data-offences.json | jq '..|.cjsCode?' | grep "[A-Z][A-Z]*" | wc -w
//  cat input-data/offence-code/current-standing-data-offences.json | jq '..|.cjsCode?' | grep "[A-Z][A-Z]*" | wc -w | uniq
//  cat input-data/offence-code/all-standing-data-offences.json | jq '..|.cjsCode?' | grep "[A-Z][A-Z]*" | wc -w | uniq
//  cat input-data/offence-code/all-standing-data-offences.json | jq '..|.cjsCode?' | grep "[A-Z][A-Z]*" | wc -w

// TODO - create new file in input-data folder to have `standing-data-api.json` file with all offence codes

// POTENTIAL NEXT STEPS:
// FIND OUT script that generates the output-data.json files.
// Point to standing-data.json rather than cjs-offences.json
// compare output data from standing vs cjs download.
// TODO check assumption with Ben that we are replacing `cjs-offence.json` file with standing data. cjs-offence only has 14k codes, whereas standing data returns 23k...

const getOffence = async (alphaChar: string): Promise<ApiOffence[] | Error> => {
  console.log(`running getOffence() with "${alphaChar}"`)
  return axios
    .post(devApiUrl, offenceBody(alphaChar), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })
    .then((result) => {
      const parsedApiResult = getOffenceApiResultSchema.parse(result.data)
      console.log(result.data.MessageBody.GatewayOperationType.GetOffenceResponse.Offence)
      const newResult = parsedApiResult.MessageBody.GatewayOperationType.GetOffenceResponse.Offence
      console.log(`success with ${alphaChar}`)
      return newResult
    })
    .catch((error) => {
      console.log(`error with ${alphaChar}`)
      return error
    })
}
getOffence("A")

// TODO check if zodding inside the axios call is the clean way to do things.
// TODO - check the best way to call in payload config.

export default getOffence
