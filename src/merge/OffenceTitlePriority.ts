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

    const title =
      this.pnldOffenceCodes.find(matchCjsCode)?.offenceTitle ||
      this.cjsOffenceCodes.find(matchCjsCode)?.offenceTitle ||
      this.pncOffenceCodes.find(matchCjsCode)?.offenceTitle ||
      this.currentOffenceCodes.find(matchCjsCode)?.offenceTitle ||
      defaultTitle

    return consistentWhitespace(title)
  }
}
