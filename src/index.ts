/* eslint-disable no-console */
import pnldDownload from "./pnld-download"

const main = async () => {
  await pnldDownload()
}

main()
  .then(() => console.log("All data downloaded"))
  .catch((err) => console.log(err))
