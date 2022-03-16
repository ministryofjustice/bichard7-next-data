import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"

export default class NotifiableToHOPriority {
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
    const defaultValue = "N"
    const matchCjsCode = getMatchCjsCodeFunction(cjsCode)

    if (this.civilLibraOffenceCodes.find(matchCjsCode)) {
      return this.currentOffenceCodes.find(matchCjsCode)?.notifiableToHo
    }
    if (this.nrcOffenceCodes.find(matchCjsCode)) {
      return this.nrcOffenceCodes.find(matchCjsCode)?.notifiableToHo
    }
    if (this.localOffenceCodes.find(matchCjsCode)) {
      return this.localOffenceCodes.find(matchCjsCode)?.notifiableToHo
    }
    if (this.pnldOffenceCodes.find(matchCjsCode)) {
      return this.pnldOffenceCodes.find(matchCjsCode)?.notifiableToHo
    }
    return defaultValue
  }
}
