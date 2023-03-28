import getOffence from "./getOffence"

// const listofChar = [..."ABCDEFGHIJKLMNOPQR"]

export default async () => {
  console.log("Calling Standing Data API")
  //   get the API response == "fileContents"
  const fileContents = await getOffence("A")
  console.log(fileContents)

  //  covertODS- map API response keys to align with input-data keys. == "offenceCodes"
  // consistent sort
  // write to file
  console.log("Standing Data API successfully downloaded")
}
