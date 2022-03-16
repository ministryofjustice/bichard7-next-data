import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"

export default class OffenceTitlePriority {
  currentOffenceCodes: OffenceCode[]

  civilLibraOffenceCodes: OffenceCode[]

  nrcOffenceCodes: OffenceCode[]

  localOffenceCodes: OffenceCode[]

  pnldOffenceCodes: OffenceCode[]

  cjsOffenceCodes: OffenceCode[]

  pncOffenceCodes: OffenceCode[]

  constructor(
    currentOffenceCodes: OffenceCode[],
    civilLibraOffenceCodes: OffenceCode[],
    nrcOffenceCodes: OffenceCode[],
    localOffenceCodes: OffenceCode[],
    pnldOffenceCodes: OffenceCode[],
    cjsOffenceCodes: OffenceCode[],
    pncOffenceCodes: OffenceCode[]
  ) {
    this.civilLibraOffenceCodes = civilLibraOffenceCodes
    this.currentOffenceCodes = currentOffenceCodes
    this.nrcOffenceCodes = nrcOffenceCodes
    this.localOffenceCodes = localOffenceCodes
    this.pnldOffenceCodes = pnldOffenceCodes
    this.cjsOffenceCodes = cjsOffenceCodes
    this.pncOffenceCodes = pncOffenceCodes
  }

  getHighestPriority(cjsCode: string): string | undefined {
    const defaultTitle = ""
    const matchCjsCode = getMatchCjsCodeFunction(cjsCode)

    if (this.civilLibraOffenceCodes.find(matchCjsCode)) {
      return this.currentOffenceCodes.find(matchCjsCode)?.offenceTitle
    }
    if (this.nrcOffenceCodes.find(matchCjsCode)?.offenceTitle) {
      return this.nrcOffenceCodes.find(matchCjsCode)!.offenceTitle as string
    }
    if (this.localOffenceCodes.find(matchCjsCode)?.offenceTitle) {
      return this.localOffenceCodes.find(matchCjsCode)!.offenceTitle as string
    }
    if (this.pnldOffenceCodes.find(matchCjsCode)?.offenceTitle) {
      return this.pnldOffenceCodes.find(matchCjsCode)!.offenceTitle as string
    }
    if (this.cjsOffenceCodes.find(matchCjsCode)?.offenceTitle) {
      return this.cjsOffenceCodes.find(matchCjsCode)!.offenceTitle as string
    }
    if (this.pncOffenceCodes.find(matchCjsCode)?.offenceTitle) {
      return this.pncOffenceCodes.find(matchCjsCode)!.offenceTitle as string
    }
    return defaultTitle
  }
}
