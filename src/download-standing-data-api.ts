import standingDataDownload from "./Standing-data-gateway/index"

const main = async () => {
  await standingDataDownload()
}

main().then(() => console.log("All data downloaded"))
