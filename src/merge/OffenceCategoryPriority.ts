import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"

export default class OffenceCategoryPriority {
  constructor(
    private currentOffenceCodes: OffenceCode[],
    private cjsOffenceCodes: OffenceCode[],
    private offenceCodeB7CategoryOverrides: string[],
    private pnldOffenceCodes: OffenceCode[],
    private pncOffenceCodes: OffenceCode[]
  ) {}

  getHighestPriority(cjsCode: string): string {
    const defaultCategory = "CE"
    const matchCjsCode = getMatchCjsCodeFunction(cjsCode)

    if (this.offenceCodeB7CategoryOverrides.indexOf(cjsCode) > -1) {
      return "B7"
    }
    if (this.pnldOffenceCodes.find(matchCjsCode)?.offenceCategory) {
      return this.pnldOffenceCodes.find(matchCjsCode)!.offenceCategory as string
    }
    if (this.cjsOffenceCodes.find(matchCjsCode)) {
      return this.cjsOffenceCodes.find(matchCjsCode)!.offenceCategory as string
    }
    if (this.pncOffenceCodes.find(matchCjsCode)?.offenceCategory) {
      return this.pncOffenceCodes.find(matchCjsCode)!.offenceCategory as string
    }
    if (this.currentOffenceCodes.find(matchCjsCode)) {
      return this.currentOffenceCodes.find(matchCjsCode)!.offenceCategory as string
    }
    return defaultCategory
  }
}
