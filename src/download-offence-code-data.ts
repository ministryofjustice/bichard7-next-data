import cjsDownload from "./cjs-download"
// import pncDownload from "./pnc-download"
import pnldDownload from "./pnld-download"

const main = async () => {
  await pnldDownload()
  await cjsDownload()
  // await pncDownload()
}

main().then(() => console.log("All data downloaded"))
