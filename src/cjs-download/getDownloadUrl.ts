import axios from "axios"

const dataStandardsUrl =
  "https://www.gov.uk/guidance/criminal-justice-system-data-standards-forum-guidance"
const downloadLinkRegex = /(https:\/\/.*cjs.*offence.*index.*ods)"/i

export default (): Promise<string> =>
  axios({
    url: dataStandardsUrl,
    method: "GET",
    responseType: "text"
  })
    .then((response) => response.data)
    .then((xhtml) => {
      const regexResult = downloadLinkRegex.exec(xhtml)
      if (regexResult) {
        return regexResult[1]
      }
      throw new Error("Could not find download URL")
    })
