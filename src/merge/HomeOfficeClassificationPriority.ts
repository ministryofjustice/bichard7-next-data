import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"

export default class HomeOfficeClassifictionPriority {
  currentOffenceCodes: OffenceCode[]

  civilLibraOffenceCodes: OffenceCode[]

  nrcOffenceCodes: OffenceCode[]

  localOffenceCodes: OffenceCode[]

  pnldOffenceCodes: OffenceCode[]

  constructor(
    currentOffenceCodes: OffenceCode[],
    civilLibraOffenceCodes: OffenceCode[],
    nrcOffenceCodes: OffenceCode[],
    localOffenceCodes: OffenceCode[],
    pnldOffenceCodes: OffenceCode[]
  ) {
    this.civilLibraOffenceCodes = civilLibraOffenceCodes
    this.currentOffenceCodes = currentOffenceCodes
    this.nrcOffenceCodes = nrcOffenceCodes
    this.localOffenceCodes = localOffenceCodes
    this.pnldOffenceCodes = pnldOffenceCodes
  }

  getHighestPriority(cjsCode: string): string | undefined {
    const defaultValue = "000/00"
    const matchCjsCode = getMatchCjsCodeFunction(cjsCode)

    if (this.civilLibraOffenceCodes.find(matchCjsCode)) {
      return this.currentOffenceCodes.find(matchCjsCode)?.homeOfficeClassification
    }
    if (this.nrcOffenceCodes.find(matchCjsCode)) {
      return this.nrcOffenceCodes.find(matchCjsCode)?.homeOfficeClassification
    }
    if (this.localOffenceCodes.find(matchCjsCode)) {
      return this.localOffenceCodes.find(matchCjsCode)?.homeOfficeClassification
    }
    if (this.pnldOffenceCodes.find(matchCjsCode)) {
      return this.pnldOffenceCodes.find(matchCjsCode)?.homeOfficeClassification
    }
    return defaultValue
  }
}
