import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"
import HomeOfficeClassifictionPriority from "./HomeOfficeClassificationPriority"
import NotifiableToHOPriority from "./NotifiableToHOPriority"
import OffenceCategoryPriority from "./OffenceCategoryPriority"
import OffenceTitlePriority from "./OffenceTitlePriority"
import RecordableOnPncPriority from "./RecordableOnPncPriority"

export default class OffenceCodeMerger {
  /* eslint-disable no-unused-vars */
  constructor(
    private offenceCodeKeys: string[],
    private currentOffenceCodes: OffenceCode[],
    private unsupportedOffenceCodes: string[],
    private legacyOverrides: OffenceCode[],
    private homeOfficeClassification: HomeOfficeClassifictionPriority,
    private notifiableToHo: NotifiableToHOPriority,
    private offenceCategory: OffenceCategoryPriority,
    private offenceTitle: OffenceTitlePriority,
    private recordableOnPnc: RecordableOnPncPriority
  ) {}

  merge(): OffenceCode[] {
    return this.offenceCodeKeys.map((cjsCode) => {
      const matchCjsCode = getMatchCjsCodeFunction(cjsCode)
      const currentDefault = this.currentOffenceCodes.find(matchCjsCode)
      if (this.unsupportedOffenceCodes.includes(cjsCode.trim()) && currentDefault) {
        return currentDefault
      }
      if (this.legacyOverrides.find(matchCjsCode)) {
        return this.legacyOverrides.find(matchCjsCode) as OffenceCode
      }
      return {
        cjsCode,
        description: cjsCode,
        homeOfficeClassification: this.homeOfficeClassification.getHighestPriority(cjsCode),
        notifiableToHo: this.notifiableToHo.getHighestPriority(cjsCode),
        offenceCategory: this.offenceCategory.getHighestPriority(cjsCode),
        offenceTitle: this.offenceTitle.getHighestPriority(cjsCode),
        recordableOnPnc: this.recordableOnPnc.getHighestPriority(cjsCode),
        resultHalfLifeHours: null
      }
    })
  }
}
