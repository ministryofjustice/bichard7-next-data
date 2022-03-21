import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"
import consistentWhitespace from "../lib/consistentWhitespace"

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

    let title: string | undefined = defaultTitle

    if (this.civilLibraOffenceCodes.find(matchCjsCode)) {
      title = this.currentOffenceCodes.find(matchCjsCode)?.offenceTitle
    } else if (this.nrcOffenceCodes.find(matchCjsCode)?.offenceTitle) {
      title = this.nrcOffenceCodes.find(matchCjsCode)!.offenceTitle as string
    } else if (this.localOffenceCodes.find(matchCjsCode)?.offenceTitle) {
      title = this.localOffenceCodes.find(matchCjsCode)!.offenceTitle as string
    } else if (this.pnldOffenceCodes.find(matchCjsCode)?.offenceTitle) {
      title = this.pnldOffenceCodes.find(matchCjsCode)!.offenceTitle as string
    } else if (this.cjsOffenceCodes.find(matchCjsCode)?.offenceTitle) {
      title = this.cjsOffenceCodes.find(matchCjsCode)!.offenceTitle as string
    } else if (this.pncOffenceCodes.find(matchCjsCode)?.offenceTitle) {
      title = this.pncOffenceCodes.find(matchCjsCode)!.offenceTitle as string
    }
    return consistentWhitespace(title)
  }
}
