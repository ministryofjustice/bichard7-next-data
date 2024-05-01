import fs from "fs"
import offenceCodeB7CategoryOverrides from "../input-data/offence-code/b7-overrides.json"
import cjsOffenceCodes from "../input-data/offence-code/cjs-offences.json"
import legacyOverrides from "../input-data/offence-code/legacy-dataset-overrides.json"
import pncCcjsOffenceCodes from "../input-data/offence-code/pnc-ccjs-cjs-offences.json"
import pnldOffenceCodes from "../input-data/offence-code/pnld-offences.json"
import currentOffenceCodes from "../output-data/data/offence-code.json"
import consistentSort from "./lib/consistentSort"
import HomeOfficeClassifictionPriority from "./merge/HomeOfficeClassificationPriority"
import NotifiableToHOPriority from "./merge/NotifiableToHOPriority"
import OffenceCategoryPriority from "./merge/OffenceCategoryPriority"
import OffenceCodeMerger from "./merge/OffenceCodeMerger"
import OffenceTitlePriority from "./merge/OffenceTitlePriority"
import RecordableOnPncPriority from "./merge/RecordableOnPncPriority"
import { OffenceCode } from "./types/OffenceCode"

const main = async () => {
  const hoClassification = new HomeOfficeClassifictionPriority(
    currentOffenceCodes as OffenceCode[],
    pnldOffenceCodes as OffenceCode[]
  )

  const notifiableToHo = new NotifiableToHOPriority(
    currentOffenceCodes as OffenceCode[],
    pnldOffenceCodes as OffenceCode[]
  )

  const offenceCategory = new OffenceCategoryPriority(
    currentOffenceCodes as OffenceCode[],
    cjsOffenceCodes as OffenceCode[],
    offenceCodeB7CategoryOverrides as string[],
    pnldOffenceCodes as OffenceCode[],
    pncCcjsOffenceCodes as OffenceCode[]
  )

  const offenceTitle = new OffenceTitlePriority(
    currentOffenceCodes as OffenceCode[],
    pnldOffenceCodes as OffenceCode[],
    cjsOffenceCodes as OffenceCode[],
    pncCcjsOffenceCodes as OffenceCode[]
  )

  const recordableOnPnc = new RecordableOnPncPriority(
    currentOffenceCodes as OffenceCode[],
    pnldOffenceCodes as OffenceCode[],
    pncCcjsOffenceCodes as OffenceCode[]
  )

  const currentOffenceCodeKeys = (currentOffenceCodes as OffenceCode[]).map((oc) => oc.cjsCode)
  const legacyOverrideKeys = legacyOverrides.map((oc) => oc.cjsCode)
  const pnldOffenceCodeKeys = (pnldOffenceCodes as OffenceCode[]).map((oc) => oc.cjsCode)
  const cjsOffenceCodeKeys = cjsOffenceCodes.map((oc) => oc.cjsCode)
  const pncOffenceCodeKeys = pncCcjsOffenceCodes.map((oc) => oc.cjsCode)

  const allOffenceCodeKeys = currentOffenceCodeKeys.concat(
    legacyOverrideKeys,
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
    legacyOverrides as OffenceCode[],
    hoClassification,
    notifiableToHo as NotifiableToHOPriority,
    offenceCategory as OffenceCategoryPriority,
    offenceTitle as OffenceTitlePriority,
    recordableOnPnc as RecordableOnPncPriority
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
