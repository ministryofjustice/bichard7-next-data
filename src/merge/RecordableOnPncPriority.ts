import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"

export default class RecordableOnPncPriority {
  constructor(
    private currentOffenceCodes: OffenceCode[],
    private pnldOffenceCodes: OffenceCode[],
    private pncOffenceCodes: OffenceCode[]
  ) {}

  getHighestPriority(cjsCode: string): boolean {
    const matchCjsCode = getMatchCjsCodeFunction(cjsCode)

    if (typeof this.pncOffenceCodes.find(matchCjsCode)?.recordableOnPnc === "boolean") {
      return this.pncOffenceCodes.find(matchCjsCode)!.recordableOnPnc as boolean
    }
    if (typeof this.pnldOffenceCodes.find(matchCjsCode)?.recordableOnPnc === "boolean") {
      return this.pnldOffenceCodes.find(matchCjsCode)!.recordableOnPnc as boolean
    }
    if (typeof this.currentOffenceCodes.find(matchCjsCode)?.recordableOnPnc === "boolean") {
      return this.currentOffenceCodes.find(matchCjsCode)!.recordableOnPnc as boolean
    }
    return false
  }
}
