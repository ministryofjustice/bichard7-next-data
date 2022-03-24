import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"

export default class OffenceCategoryPriority {
  /* eslint-disable no-unused-vars */
  constructor(
    private currentOffenceCodes: OffenceCode[],
    private offenceCodeB7CategoryOverrides: string[],
    private civilLibraOffenceCodes: OffenceCode[],
    private nrcOffenceCodes: OffenceCode[],
    private localOffenceCodes: OffenceCode[],
    private pnldOffenceCodes: OffenceCode[],
    private pncOffenceCodes: OffenceCode[]
  ) {}

  getHighestPriority(cjsCode: string): string {
    const defaultCategory = "CE"
    const matchCjsCode = getMatchCjsCodeFunction(cjsCode)

    if (this.offenceCodeB7CategoryOverrides.indexOf(cjsCode) > -1) {
      return "B7"
    }
    if (this.civilLibraOffenceCodes.find(matchCjsCode)) {
      return this.currentOffenceCodes.find(matchCjsCode)!.offenceCategory as string
    }
    if (this.nrcOffenceCodes.find(matchCjsCode)?.offenceCategory) {
      return this.nrcOffenceCodes.find(matchCjsCode)!.offenceCategory as string
    }
    if (this.localOffenceCodes.find(matchCjsCode)?.offenceCategory) {
      return this.localOffenceCodes.find(matchCjsCode)!.offenceCategory as string
    }
    if (this.pnldOffenceCodes.find(matchCjsCode)?.offenceCategory) {
      return this.pnldOffenceCodes.find(matchCjsCode)!.offenceCategory as string
    }
    if (this.pncOffenceCodes.find(matchCjsCode)?.offenceCategory) {
      return this.pncOffenceCodes.find(matchCjsCode)!.offenceCategory as string
    }
    return defaultCategory
  }
}
