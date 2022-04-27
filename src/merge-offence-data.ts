/* eslint-disable no-console */
/* eslint-disable import/no-relative-packages */

import fs from "fs"
import offenceCodeB7CategoryOverrides from "../input-data/offence-code/b7-overrides.json"
import civilLibraOffenceCodesData from "../input-data/offence-code/civil-libra-codes.json"
import cjsOffenceCodesData from "../input-data/offence-code/cjs-offences.json"
import legacyOverridesData from "../input-data/offence-code/legacy-dataset-overrides.json"
import nrcOffenceCodesData from "../input-data/offence-code/legacy-nrc.json"
import localOffenceCodesData from "../input-data/offence-code/local-offences.json"
import pncAcpoOffenceCodes from "../input-data/offence-code/pnc-acpo-cjs-offences.json"
import pncCcjsOffenceCodes from "../input-data/offence-code/pnc-ccjs-cjs-offences.json"
import pnldOffenceCodesData from "../input-data/offence-code/pnld-offences.json"
import unsupportedOffenceCodes from "../input-data/offence-code/unsupported-codes.json"
import currentOffenceCodesData from "../output-data/data/offence-code.json"
import consistentSort from "./lib/consistentSort"
import HomeOfficeClassifictionPriority from "./merge/HomeOfficeClassificationPriority"
import NotifiableToHOPriority from "./merge/NotifiableToHOPriority"
import OffenceCategoryPriority from "./merge/OffenceCategoryPriority"
import OffenceCodeMerger from "./merge/OffenceCodeMerger"
import OffenceTitlePriority from "./merge/OffenceTitlePriority"
import RecordableOnPncPriority from "./merge/RecordableOnPncPriority"
import { OffenceCode } from "./types/OffenceCode"

type rawOffenceCode = {
  cjsCode: string
  description?: string
  homeOfficeClassification?: string | null
  notifiableToHo?: string | null | boolean
  recordCreated?: number[]
  source?: string
  offenceCategory?: string
  offenceTitle?: string
  recordableOnPnc?: string | boolean
  resultHalfLifeHours?: string | null
}

const mapRecordsAsOffenceCode = (records: rawOffenceCode[]): OffenceCode[] => {
  return records.map(
    (record) =>
      ({
        cjsCode: record.cjsCode,
        description: record.description,
        homeOfficeClassification: record.homeOfficeClassification,
        notifiableToHo:
          record.notifiableToHo === "Y" ||
          record.notifiableToHo === "y" ||
          record.notifiableToHo === true,
        recordCreated: record.recordCreated,
        source: record.source,
        offenceCategory: record.offenceCategory,
        offenceTitle: record.offenceTitle,
        recordableOnPnc:
          record.recordableOnPnc === "Y" ||
          record.recordableOnPnc === "y" ||
          record.recordableOnPnc === true,
        resultHalfLifeHours: record.source
      } as OffenceCode)
  )
}

const pncOffenceCodes: OffenceCode[] = mapRecordsAsOffenceCode(
  pncAcpoOffenceCodes.concat(pncCcjsOffenceCodes)
)

const civilLibraOffenceCodes: OffenceCode[] = mapRecordsAsOffenceCode(
  civilLibraOffenceCodesData as rawOffenceCode[]
)

const currentOffenceCodes: OffenceCode[] = mapRecordsAsOffenceCode(
  currentOffenceCodesData as rawOffenceCode[]
)
const nrcOffenceCodes: OffenceCode[] = mapRecordsAsOffenceCode(
  nrcOffenceCodesData as rawOffenceCode[]
)
const localOffenceCodes: OffenceCode[] = mapRecordsAsOffenceCode(
  localOffenceCodesData as rawOffenceCode[]
)
const pnldOffenceCodes: OffenceCode[] = mapRecordsAsOffenceCode(
  pnldOffenceCodesData as rawOffenceCode[]
)

const cjsOffenceCodes: OffenceCode[] = mapRecordsAsOffenceCode(
  cjsOffenceCodesData as rawOffenceCode[]
)

const legacyOverrides: OffenceCode[] = mapRecordsAsOffenceCode(
  legacyOverridesData as rawOffenceCode[]
)

const main = async () => {
  const hoClassification = new HomeOfficeClassifictionPriority(
    currentOffenceCodes as OffenceCode[],
    civilLibraOffenceCodes as OffenceCode[],
    nrcOffenceCodes as OffenceCode[],
    localOffenceCodes as OffenceCode[],
    pnldOffenceCodes as OffenceCode[]
  )

  const notifiableToHo = new NotifiableToHOPriority(
    currentOffenceCodes as OffenceCode[],
    civilLibraOffenceCodes as OffenceCode[],
    nrcOffenceCodes as OffenceCode[],
    localOffenceCodes as OffenceCode[],
    pnldOffenceCodes as OffenceCode[]
  )

  const offenceCategory = new OffenceCategoryPriority(
    currentOffenceCodes as OffenceCode[],
    offenceCodeB7CategoryOverrides as string[],
    civilLibraOffenceCodes as OffenceCode[],
    nrcOffenceCodes as OffenceCode[],
    localOffenceCodes as OffenceCode[],
    pnldOffenceCodes as OffenceCode[],
    pncOffenceCodes as OffenceCode[]
  )

  const offenceTitle = new OffenceTitlePriority(
    currentOffenceCodes as OffenceCode[],
    civilLibraOffenceCodes as OffenceCode[],
    nrcOffenceCodes as OffenceCode[],
    localOffenceCodes as OffenceCode[],
    pnldOffenceCodes as OffenceCode[],
    cjsOffenceCodes as OffenceCode[],
    pncOffenceCodes as OffenceCode[]
  )

  const recordableOnPnc = new RecordableOnPncPriority(
    currentOffenceCodes as OffenceCode[],
    civilLibraOffenceCodes as OffenceCode[],
    nrcOffenceCodes as OffenceCode[],
    localOffenceCodes as OffenceCode[],
    pnldOffenceCodes as OffenceCode[],
    pncOffenceCodes as OffenceCode[]
  )

  const currentOffenceCodeKeys = (currentOffenceCodes as OffenceCode[]).map((oc) => oc.cjsCode)
  const legacyOverrideKeys = legacyOverrides.map((oc) => oc.cjsCode)
  const civilLibraOffenceCodeKeys = civilLibraOffenceCodes.map((oc) => oc.cjsCode)
  const nrcOffenceCodeKeys = nrcOffenceCodes.map((oc) => oc.cjsCode)
  const localOffenceCodeKeys = localOffenceCodes.map((oc) => oc.cjsCode)
  const pnldOffenceCodeKeys = (pnldOffenceCodes as OffenceCode[]).map((oc) => oc.cjsCode)
  const cjsOffenceCodeKeys = cjsOffenceCodes.map((oc) => oc.cjsCode)
  const pncOffenceCodeKeys = pncOffenceCodes.map((oc) => oc.cjsCode)

  const allOffenceCodeKeys = currentOffenceCodeKeys.concat(
    legacyOverrideKeys,
    civilLibraOffenceCodeKeys,
    nrcOffenceCodeKeys,
    localOffenceCodeKeys,
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
    currentOffenceCodes as OffenceCode[],
    unsupportedOffenceCodes as string[],
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
