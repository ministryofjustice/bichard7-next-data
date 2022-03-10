/* eslint-disable no-console */
import pnldDownload from "./pnld-download"
import cjsDownload from "./cjs-download"
import requestedChangesDownload from "./requested-changes-download"

const main = async () => {
  await pnldDownload()
  await cjsDownload()
  await requestedChangesDownload()
}

main()
  .then(() => console.log("All data downloaded"))
  .catch((err) => console.error(err))
