import organisationUnitDownload from "./organisation-unit-download"

const main = async () => {
  await organisationUnitDownload()
}

main()
  .then(() => console.log("Organisation Unit data is downloaded"))
  .catch((err) => console.error(err))
