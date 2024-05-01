import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"
import HomeOfficeClassifictionPriority from "./HomeOfficeClassificationPriority"
import NotifiableToHOPriority from "./NotifiableToHOPriority"
import OffenceCategoryPriority from "./OffenceCategoryPriority"
import OffenceTitlePriority from "./OffenceTitlePriority"
import RecordableOnPncPriority from "./RecordableOnPncPriority"

export default class OffenceCodeMerger {
  constructor(
    private offenceCodeKeys: string[],
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
