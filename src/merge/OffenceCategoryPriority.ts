import { OffenceCodeLookup } from "../types/OffenceCodeLookup"

export default class OffenceCategoryPriority {
  constructor(
    private currentOffenceCodes: OffenceCodeLookup,
    private offenceCodeB7CategoryOverrides: string[],
    private pnldOffenceCodes: OffenceCodeLookup,
    private pncOffenceCodes: OffenceCodeLookup
  ) {}

  getHighestPriority(cjsCode: string): string {
    const defaultCategory = "CE"

    if (this.offenceCodeB7CategoryOverrides.indexOf(cjsCode) > -1) {
      return "B7"
    }

    return (
      this.pnldOffenceCodes[cjsCode]?.offenceCategory ??
      this.pncOffenceCodes[cjsCode]?.offenceCategory ??
      this.currentOffenceCodes[cjsCode]?.offenceCategory ??
      defaultCategory
    )
  }
}
