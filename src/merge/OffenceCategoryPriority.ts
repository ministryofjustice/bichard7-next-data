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

    return (
      this.pnldOffenceCodes.find(matchCjsCode)?.offenceCategory ??
      this.cjsOffenceCodes.find(matchCjsCode)?.offenceCategory ??
      this.pncOffenceCodes.find(matchCjsCode)?.offenceCategory ??
      this.currentOffenceCodes.find(matchCjsCode)?.offenceCategory ??
      defaultCategory
    )
  }
}
