import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"
import HomeOfficeClassifictionPriority from "./HomeOfficeClassificationPriority"
import NotifiableToHOPriority from "./NotifiableToHOPriority"
import OffenceCategoryPriority from "./OffenceCategoryPriority"
import OffenceTitlePriority from "./OffenceTitlePriority"
import RecordableOnPncPriority from "./RecordableOnPncPriority"

export default class OffenceCodeMerger {
  currentOffenceCodes: OffenceCode[]

  unsupportedOffenceCodes: string[]

  legacyOverrides: OffenceCode[]

  homeOfficeClassification: HomeOfficeClassifictionPriority

  notifiableToHo: NotifiableToHOPriority

  offenceCategory: OffenceCategoryPriority

  offenceTitle: OffenceTitlePriority

  recordableOnPnc: RecordableOnPncPriority

  constructor(
    currentOffenceCodes: OffenceCode[],
    unsupportedOffenceCodes: string[],
    legacyOverrides: OffenceCode[],
    homeOfficeClassification: HomeOfficeClassifictionPriority,
    notifiableToHo: NotifiableToHOPriority,
    offenceCategory: OffenceCategoryPriority,
    offenceTitle: OffenceTitlePriority,
    recordableOnPnc: RecordableOnPncPriority
  ) {
    this.currentOffenceCodes = currentOffenceCodes
    this.unsupportedOffenceCodes = unsupportedOffenceCodes
    this.legacyOverrides = legacyOverrides
    this.homeOfficeClassification = homeOfficeClassification
    this.notifiableToHo = notifiableToHo
    this.offenceCategory = offenceCategory
    this.offenceTitle = offenceTitle
    this.recordableOnPnc = recordableOnPnc
  }

  merge(): OffenceCode[] {
    const mergedOffenceCodes: OffenceCode[] = []
    this.currentOffenceCodes.forEach((oc) => {
      const matchCjsCode = getMatchCjsCodeFunction(oc.cjsCode)
      if (this.unsupportedOffenceCodes.indexOf(oc.cjsCode.trim()) > -1) {
        mergedOffenceCodes.push(oc)
      } else if (this.legacyOverrides.find(matchCjsCode)) {
        mergedOffenceCodes.push(this.legacyOverrides.find(matchCjsCode) as OffenceCode)
      } else {
        mergedOffenceCodes.push({
          cjsCode: oc.cjsCode,
          description: oc.cjsCode,
          homeOfficeClassification: this.homeOfficeClassification.getHighestPriority(oc.cjsCode),
          notifiableToHo: this.notifiableToHo.getHighestPriority(oc.cjsCode),
          offenceCategory: this.offenceCategory.getHighestPriority(oc.cjsCode),
          offenceTitle: this.offenceTitle.getHighestPriority(oc.cjsCode),
          recordableOnPnc: this.recordableOnPnc.getHighestPriority(oc.cjsCode),
          resultHalfLifeHours: null
        })
      }
    })

    return mergedOffenceCodes
  }
}
