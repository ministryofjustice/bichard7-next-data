import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"

export default class RecordableOnPncPriority {
  /* eslint-disable no-unused-vars */
  constructor(
    private currentOffenceCodes: OffenceCode[],
    private civilLibraOffenceCodes: OffenceCode[],
    private nrcOffenceCodes: OffenceCode[],
    private localOffenceCodes: OffenceCode[],
    private pnldOffenceCodes: OffenceCode[],
    private pncOffenceCodes: OffenceCode[]
  ) {}

  getHighestPriority(cjsCode: string): boolean {
    const matchCjsCode = getMatchCjsCodeFunction(cjsCode)

    if (typeof this.pncOffenceCodes.find(matchCjsCode)?.recordableOnPnc === "boolean") {
      return this.pncOffenceCodes.find(matchCjsCode)!.recordableOnPnc as boolean
    }
    if (typeof this.civilLibraOffenceCodes.find(matchCjsCode)?.recordableOnPnc === "boolean") {
      return this.civilLibraOffenceCodes.find(matchCjsCode)!.recordableOnPnc as boolean
    }
    if (typeof this.nrcOffenceCodes.find(matchCjsCode)?.recordableOnPnc === "boolean") {
      return this.nrcOffenceCodes.find(matchCjsCode)!.recordableOnPnc as boolean
    }
    if (typeof this.localOffenceCodes.find(matchCjsCode)?.recordableOnPnc === "boolean") {
      return this.localOffenceCodes.find(matchCjsCode)!.recordableOnPnc as boolean
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
