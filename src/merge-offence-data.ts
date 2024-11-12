import fs from "fs"
import offenceCodeB7CategoryOverrides from "../input-data/offence-code/b7-overrides.json"
import pncOffenceCodes from "../input-data/offence-code/pnc-ccjs-cjs-offences.json"
import standingDataOffenceCodes from "../input-data/offence-code/standing-data-api-offences.json"
import currentOffenceCodes from "../output-data/data/offence-code.json"
import consistentSort from "./lib/consistentSort"
import createOffenceCodeLookup from "./lib/createOffenceCodeLookup"
import HomeOfficeClassifictionPriority from "./merge/HomeOfficeClassificationPriority"
import NotifiableToHOPriority from "./merge/NotifiableToHOPriority"
import OffenceCategoryPriority from "./merge/OffenceCategoryPriority"
import OffenceCodeMerger from "./merge/OffenceCodeMerger"
import OffenceTitlePriority from "./merge/OffenceTitlePriority"
import RecordableOnPncPriority from "./merge/RecordableOnPncPriority"
import { OffenceCode } from "./types/OffenceCode"

const currentOffenceCodeLookup = createOffenceCodeLookup(currentOffenceCodes as OffenceCode[])
const standingDataOffenceCodeLookup = createOffenceCodeLookup(
  standingDataOffenceCodes as OffenceCode[]
)
const pncOffenceCodeLookup = createOffenceCodeLookup(pncOffenceCodes)

const validOffenceCodeFilter = (oc: string): boolean => /^[0-9A-Za-z]+$/.test(oc)

const allOffenceCodeKeys = new Set(
  Object.keys(currentOffenceCodeLookup)
    .concat(Object.keys(standingDataOffenceCodeLookup), Object.keys(pncOffenceCodeLookup))
    .filter(validOffenceCodeFilter)
)

const main = async () => {
  const hoClassification = new HomeOfficeClassifictionPriority(
    currentOffenceCodeLookup,
    standingDataOffenceCodeLookup
  )

  const notifiableToHo = new NotifiableToHOPriority(
    currentOffenceCodeLookup,
    standingDataOffenceCodeLookup
  )

  const offenceCategory = new OffenceCategoryPriority(
    currentOffenceCodeLookup,
    offenceCodeB7CategoryOverrides,
    standingDataOffenceCodeLookup,
    pncOffenceCodeLookup
  )

  const offenceTitle = new OffenceTitlePriority(
    currentOffenceCodeLookup,
    standingDataOffenceCodeLookup,
    pncOffenceCodeLookup
  )

  const recordableOnPnc = new RecordableOnPncPriority(
    currentOffenceCodeLookup,
    standingDataOffenceCodeLookup,
    pncOffenceCodeLookup
  )

  const merger = new OffenceCodeMerger(
    allOffenceCodeKeys,
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
