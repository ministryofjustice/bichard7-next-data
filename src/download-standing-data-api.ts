import standingDataDownload from "./standing-data-gateway/index"

const main = async () => {
  await standingDataDownload()
}

main().then(() => console.log("All data downloaded"))
