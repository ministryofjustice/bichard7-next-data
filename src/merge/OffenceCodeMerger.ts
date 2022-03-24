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
    return this.currentOffenceCodes.map((oc) => {
      const matchCjsCode = getMatchCjsCodeFunction(oc.cjsCode)
      if (this.unsupportedOffenceCodes.indexOf(oc.cjsCode.trim()) > -1) {
        return oc
      }
      if (this.legacyOverrides.find(matchCjsCode)) {
        return this.legacyOverrides.find(matchCjsCode) as OffenceCode
      }
      return {
        cjsCode: oc.cjsCode,
        description: oc.cjsCode,
        homeOfficeClassification: this.homeOfficeClassification.getHighestPriority(oc.cjsCode),
        notifiableToHo: this.notifiableToHo.getHighestPriority(oc.cjsCode),
        offenceCategory: this.offenceCategory.getHighestPriority(oc.cjsCode),
        offenceTitle: this.offenceTitle.getHighestPriority(oc.cjsCode),
        recordableOnPnc: this.recordableOnPnc.getHighestPriority(oc.cjsCode),
        resultHalfLifeHours: null
      }
    })
  }
}
