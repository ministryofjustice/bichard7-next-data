/* eslint-disable no-console */
import pnldDownload from "./pnld-download"
import cjsDownload from "./cjs-download"
import pncDownload from "./pnc-download"
import requestedChangesDownload from "./requested-changes-download"

const main = async () => {
  await pnldDownload()
  await cjsDownload()
  await pncDownload()
  await requestedChangesDownload()
}

main()
  .then(() => console.log("All data downloaded"))
  .catch((err) => console.error(err))
