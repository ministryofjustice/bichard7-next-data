/* eslint-disable no-console */
import pnldDownload from "./pnld-download"
import cjsDownload from "./cjs-download"

const main = async () => {
  await pnldDownload()
  await cjsDownload()
}

main()
  .then(() => console.log("All data downloaded"))
  .catch((err) => console.log(err))
