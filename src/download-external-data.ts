/* eslint-disable no-console */
import cjsDownload from "./cjs-download"
import organisationUnitDownload from "./organisation-unit-download"
// import pncDownload from "./pnc-download"
import pnldDownload from "./pnld-download"
import requestedChangesDownload from "./requested-changes-download"

const main = async () => {
  await pnldDownload()
  await cjsDownload()
  // await pncDownload()
  await requestedChangesDownload()
  await organisationUnitDownload()
}

main().then(() => console.log("All data downloaded"))
