/* eslint-disable no-console */
import pnldDownload from "./pnld-download"
import requestedChangesDownload from "./requested-changes-download"

const main = async () => {
  await pnldDownload()
  const res = await requestedChangesDownload()
  console.log(res)
}

main()
  .then(() => console.log("All data downloaded"))
  .catch((err) => console.error(err))
