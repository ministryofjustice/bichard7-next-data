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

    if (this.civilLibraOffenceCodes.find(matchCjsCode)) {
      return this.currentOffenceCodes.find(matchCjsCode)!.recordableOnPnc as boolean
    }
    if (this.nrcOffenceCodes.find(matchCjsCode)?.recordableOnPnc) {
      return this.nrcOffenceCodes.find(matchCjsCode)!.recordableOnPnc as boolean
    }
    if (this.localOffenceCodes.find(matchCjsCode)?.recordableOnPnc) {
      return this.localOffenceCodes.find(matchCjsCode)!.recordableOnPnc as boolean
    }
    if (this.pnldOffenceCodes.find(matchCjsCode)?.recordableOnPnc) {
      return this.pnldOffenceCodes.find(matchCjsCode)!.recordableOnPnc as boolean
    }
    if (this.pncOffenceCodes.find(matchCjsCode)?.recordableOnPnc) {
      return this.pncOffenceCodes.find(matchCjsCode)!.recordableOnPnc as boolean
    }
    return false
  }
}
