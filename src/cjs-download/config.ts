import axios from "axios"

const dataStandardsUrl = "https://www.gov.uk/guidance/criminal-justice-system-data-standards-forum-guidance"
const downloadLinkRegex = /https:\/\/.*cjs-offence-index.*ods/

export default (): Promise<string> => axios({
  url: dataStandardsUrl,
  method: "GET",
  responseType: "text",
})
  .then((response) => response.data)
  .then((xhtml) => downloadLinkRegex.exec(xhtml)![0])
