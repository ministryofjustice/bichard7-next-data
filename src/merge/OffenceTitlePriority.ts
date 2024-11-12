import consistentWhitespace from "../lib/consistentWhitespace"
import { OffenceCodeLookup } from "../types/OffenceCodeLookup"

export default class OffenceTitlePriority {
  constructor(
    private currentOffenceCodes: OffenceCodeLookup,
    private pnldOffenceCodes: OffenceCodeLookup,
    private pncOffenceCodes: OffenceCodeLookup
  ) {}

  getHighestPriority(cjsCode: string): string | undefined {
    const defaultTitle = ""

    const title =
      this.pnldOffenceCodes[cjsCode]?.offenceTitle ||
      this.pncOffenceCodes[cjsCode]?.offenceTitle ||
      this.currentOffenceCodes[cjsCode]?.offenceTitle ||
      defaultTitle

    return consistentWhitespace(title)
  }
}
