import fs from "fs"
import { OffenceCode } from "../types/OffenceCode"
import HomeOfficeClassifictionPriority from "./HomeOfficeClassificationPriority"
import NotifiableToHOPriority from "./NotifiableToHOPriority"
import OffenceCategoryPriority from "./OffenceCategoryPriority"
import OffenceCodeMerger from "./OffenceCodeMerger"
import OffenceTitlePriority from "./OffenceTitlePriority"
import RecordableOnPncPriority from "./RecordableOnPncPriority"

describe("OffenceCodeMerger", () => {
  it("should generate the correct set of offence codes", async () => {
    const currentOffenceCodes = JSON.parse(
      fs.readFileSync("output-data/offence-code.json").toString()
    )
    const b7Overrides = JSON.parse(
      fs.readFileSync("input-data/offence-code/b7-overrides.json").toString()
    )
    const unsupportedCodes = JSON.parse(
      fs.readFileSync("input-data/offence-code/unsupported-codes.json").toString()
    )
    const legacyOverrides = JSON.parse(
      fs.readFileSync("input-data/offence-code/legacy-dataset-overrides.json").toString()
    )
    const civilLibraOffenceCodes = JSON.parse(
      fs.readFileSync("input-data/offence-code/civil-libra-codes.json").toString()
    )
    const cjsOffenceCodes = JSON.parse(
      fs.readFileSync("input-data/offence-code/cjs-offences.json").toString()
    )
    const localOffenceCodes = JSON.parse(
      fs.readFileSync("input-data/offence-code/local-offences.json").toString()
    )
    const pncAcpoOffenceCodes = JSON.parse(
      fs.readFileSync("input-data/offence-code/pnc-acpo-cjs-offences.json").toString()
    )
    const pncCCJSOffenceCodes = JSON.parse(
      fs.readFileSync("input-data/offence-code/pnc-ccjs-cjs-offences.json").toString()
    )
    const pncOffenceCodes = pncAcpoOffenceCodes.concat(pncCCJSOffenceCodes)
    console.log(`PNC Offence COdes Size = ${pncOffenceCodes.length}`)
    const pnldOffenceCodes = JSON.parse(
      fs.readFileSync("input-data/offence-code/pnld-offences.json").toString()
    )
    const nrcOffenceCodes: OffenceCode[] = []
    const homeOfficeClassification = new HomeOfficeClassifictionPriority(
      currentOffenceCodes,
      civilLibraOffenceCodes,
      nrcOffenceCodes,
      localOffenceCodes,
      pnldOffenceCodes
    )

    const notifiableToHo = new NotifiableToHOPriority(
      currentOffenceCodes,
      civilLibraOffenceCodes,
      nrcOffenceCodes,
      localOffenceCodes,
      pnldOffenceCodes
    )

    const offenceCategory = new OffenceCategoryPriority(
      currentOffenceCodes,
      b7Overrides,
      civilLibraOffenceCodes,
      nrcOffenceCodes,
      localOffenceCodes,
      pnldOffenceCodes,
      pncOffenceCodes
    )

    const offenceTitle = new OffenceTitlePriority(
      currentOffenceCodes,
      civilLibraOffenceCodes,
      nrcOffenceCodes,
      localOffenceCodes,
      pnldOffenceCodes,
      cjsOffenceCodes,
      pncOffenceCodes
    )

    const recordableOnPnc = new RecordableOnPncPriority(
      currentOffenceCodes,
      civilLibraOffenceCodes,
      nrcOffenceCodes,
      localOffenceCodes,
      pnldOffenceCodes,
      pncOffenceCodes
    )

    const merger = new OffenceCodeMerger(
      currentOffenceCodes,
      unsupportedCodes,
      legacyOverrides,
      homeOfficeClassification,
      notifiableToHo,
      offenceCategory,
      offenceTitle,
      recordableOnPnc
    )

    const mergedCodes = merger.merge()
    await fs.promises.writeFile(
      "/home/si/repos/bichard7-next/bichard-backend/src/main/resources/config-data/merged-offence-codes.json",
      JSON.stringify(mergedCodes, null, 2)
    )
  }, 120000)
})
