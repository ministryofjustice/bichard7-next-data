import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"

export default class OffenceCategoryPriority {
  currentOffenceCodes: OffenceCode[]

  offenceCodeB7CategoryOverrides: string[]

  civilLibraOffenceCodes: OffenceCode[]

  nrcOffenceCodes: OffenceCode[]

  localOffenceCodes: OffenceCode[]

  pnldOffenceCodes: OffenceCode[]

  pncOffenceCodes: OffenceCode[]

  constructor(
    currentOffenceCodes: OffenceCode[],
    offenceCodeB7CategoryOverrides: string[],
    civilLibraOffenceCodes: OffenceCode[],
    nrcOffenceCodes: OffenceCode[],
    localOffenceCodes: OffenceCode[],
    pnldOffenceCodes: OffenceCode[],
    pncOffenceCodes: OffenceCode[]
  ) {
    this.offenceCodeB7CategoryOverrides = offenceCodeB7CategoryOverrides
    this.civilLibraOffenceCodes = civilLibraOffenceCodes
    this.currentOffenceCodes = currentOffenceCodes
    this.nrcOffenceCodes = nrcOffenceCodes
    this.localOffenceCodes = localOffenceCodes
    this.pnldOffenceCodes = pnldOffenceCodes
    this.pncOffenceCodes = pncOffenceCodes
  }

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
