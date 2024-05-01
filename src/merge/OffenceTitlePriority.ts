import consistentWhitespace from "../lib/consistentWhitespace"
import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"

export default class OffenceTitlePriority {
  constructor(
    private currentOffenceCodes: OffenceCode[],
    private pnldOffenceCodes: OffenceCode[],
    private cjsOffenceCodes: OffenceCode[],
    private pncOffenceCodes: OffenceCode[]
  ) {}

  getHighestPriority(cjsCode: string): string | undefined {
    const defaultTitle = ""
    const matchCjsCode = getMatchCjsCodeFunction(cjsCode)

    let title: string | undefined = defaultTitle

    if (this.pnldOffenceCodes.find(matchCjsCode)?.offenceTitle) {
      title = this.pnldOffenceCodes.find(matchCjsCode)!.offenceTitle as string
    } else if (this.cjsOffenceCodes.find(matchCjsCode)?.offenceTitle) {
      title = this.cjsOffenceCodes.find(matchCjsCode)!.offenceTitle as string
    } else if (this.pncOffenceCodes.find(matchCjsCode)?.offenceTitle) {
      title = this.pncOffenceCodes.find(matchCjsCode)!.offenceTitle as string
    } else if (this.currentOffenceCodes.find(matchCjsCode)?.offenceTitle) {
      title = this.currentOffenceCodes.find(matchCjsCode)!.offenceTitle as string
    }
    return consistentWhitespace(title)
  }
}
