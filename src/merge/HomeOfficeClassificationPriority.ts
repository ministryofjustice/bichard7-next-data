import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"

export default class HomeOfficeClassifictionPriority {
  constructor(
    private currentOffenceCodes: OffenceCode[],
    private pnldOffenceCodes: OffenceCode[]
  ) {}

  getHighestPriority(cjsCode: string): string {
    const defaultValue = "000/00"
    const matchCjsCode = getMatchCjsCodeFunction(cjsCode)

    if (this.pnldOffenceCodes.find(matchCjsCode)?.homeOfficeClassification) {
      return this.pnldOffenceCodes.find(matchCjsCode)!.homeOfficeClassification as string
    }
    if (this.currentOffenceCodes.find(matchCjsCode)?.homeOfficeClassification) {
      return this.currentOffenceCodes.find(matchCjsCode)!.homeOfficeClassification as string
    }
    return defaultValue
  }
}
