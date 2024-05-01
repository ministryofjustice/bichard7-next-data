import fs from "fs"
import offenceCodeB7CategoryOverrides from "../input-data/offence-code/b7-overrides.json"
import cjsOffenceCodes from "../input-data/offence-code/cjs-offences.json"
import pncOffenceCodes from "../input-data/offence-code/pnc-ccjs-cjs-offences.json"
import pnldOffenceCodes from "../input-data/offence-code/pnld-offences.json"
import currentOffenceCodes from "../output-data/data/offence-code.json"
import consistentSort from "./lib/consistentSort"
import HomeOfficeClassifictionPriority from "./merge/HomeOfficeClassificationPriority"
import NotifiableToHOPriority from "./merge/NotifiableToHOPriority"
import OffenceCategoryPriority from "./merge/OffenceCategoryPriority"
import OffenceCodeMerger from "./merge/OffenceCodeMerger"
import OffenceTitlePriority from "./merge/OffenceTitlePriority"
import RecordableOnPncPriority from "./merge/RecordableOnPncPriority"

const main = async () => {
  const hoClassification = new HomeOfficeClassifictionPriority(
    currentOffenceCodes,
    pnldOffenceCodes
  )

  const notifiableToHo = new NotifiableToHOPriority(currentOffenceCodes, pnldOffenceCodes)

  const offenceCategory = new OffenceCategoryPriority(
    currentOffenceCodes,
    cjsOffenceCodes,
    offenceCodeB7CategoryOverrides,
    pnldOffenceCodes,
    pncOffenceCodes
  )

  const offenceTitle = new OffenceTitlePriority(
    currentOffenceCodes,
    pnldOffenceCodes,
    cjsOffenceCodes,
    pncOffenceCodes
  )

  const recordableOnPnc = new RecordableOnPncPriority(
    currentOffenceCodes,
    pnldOffenceCodes,
    pncOffenceCodes
  )

  const currentOffenceCodeKeys = currentOffenceCodes.map((oc) => oc.cjsCode)
  const pnldOffenceCodeKeys = pnldOffenceCodes.map((oc) => oc.cjsCode)
  const cjsOffenceCodeKeys = cjsOffenceCodes.map((oc) => oc.cjsCode)
  const pncOffenceCodeKeys = pncOffenceCodes.map((oc) => oc.cjsCode)

  const allOffenceCodeKeys = currentOffenceCodeKeys.concat(
    pnldOffenceCodeKeys,
    cjsOffenceCodeKeys,
    pncOffenceCodeKeys
  )
  const offenceCodeKeys = Object.keys(
    allOffenceCodeKeys.reduce((acc: { [k: string]: boolean }, key) => {
      acc[key.trim()] = true
      return acc
    }, {})
  )

  const merger = new OffenceCodeMerger(
    offenceCodeKeys,
    hoClassification,
    notifiableToHo,
    offenceCategory,
    offenceTitle,
    recordableOnPnc
  )
  const mergedData = merger.merge()
  const sortedData = consistentSort(mergedData)
  await fs.promises.writeFile(
    "output-data/data/offence-code.json",
    JSON.stringify(sortedData, null, 2)
  )
}

main()
  .then(() => console.log("Offence code data merged"))
  .catch((err) => console.error(err))
