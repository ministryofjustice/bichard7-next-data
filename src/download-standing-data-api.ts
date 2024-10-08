import standingDataDownload from "./standing-data-api/index"

const main = async () => {
  await standingDataDownload()
}

main().then(() => console.log("All data downloaded"))
