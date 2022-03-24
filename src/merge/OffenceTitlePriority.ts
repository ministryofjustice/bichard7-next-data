import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"
import consistentWhitespace from "../lib/consistentWhitespace"

export default class OffenceTitlePriority {
  /* eslint-disable no-unused-vars */
  constructor(
    private currentOffenceCodes: OffenceCode[],
    private civilLibraOffenceCodes: OffenceCode[],
    private nrcOffenceCodes: OffenceCode[],
    private localOffenceCodes: OffenceCode[],
    private pnldOffenceCodes: OffenceCode[],
    private cjsOffenceCodes: OffenceCode[],
    private pncOffenceCodes: OffenceCode[]
  ) {}

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
