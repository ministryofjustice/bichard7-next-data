import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"

export default class RecordableOnPncPriority {
  currentOffenceCodes: OffenceCode[]

  civilLibraOffenceCodes: OffenceCode[]

  nrcOffenceCodes: OffenceCode[]

  localOffenceCodes: OffenceCode[]

  pnldOffenceCodes: OffenceCode[]

  pncOffenceCodes: OffenceCode[]

  constructor(
    currentOffenceCodes: OffenceCode[],
    civilLibraOffenceCodes: OffenceCode[],
    nrcOffenceCodes: OffenceCode[],
    localOffenceCodes: OffenceCode[],
    pnldOffenceCodes: OffenceCode[],
    pncOffenceCodes: OffenceCode[]
  ) {
    this.civilLibraOffenceCodes = civilLibraOffenceCodes
    this.currentOffenceCodes = currentOffenceCodes
    this.nrcOffenceCodes = nrcOffenceCodes
    this.localOffenceCodes = localOffenceCodes
    this.pnldOffenceCodes = pnldOffenceCodes
    this.pncOffenceCodes = pncOffenceCodes
  }

  getHighestPriority(cjsCode: string): string {
    const yes = "Y"
    const no = "N"
    const matchCjsCode = getMatchCjsCodeFunction(cjsCode)

    if (this.civilLibraOffenceCodes.find(matchCjsCode)) {
      return this.currentOffenceCodes.find(matchCjsCode)!.recordableOnPnc as string
    }
    if (this.nrcOffenceCodes.find(matchCjsCode)?.recordableOnPnc?.trim()) {
      return this.nrcOffenceCodes.find(matchCjsCode)!.recordableOnPnc as string
    }
    if (this.localOffenceCodes.find(matchCjsCode)?.recordableOnPnc?.trim()) {
      return this.localOffenceCodes.find(matchCjsCode)!.recordableOnPnc as string
    }
    if (this.pnldOffenceCodes.find(matchCjsCode)?.recordableOnPnc?.trim() === yes) {
      return yes
    }
    if (this.pncOffenceCodes.find(matchCjsCode)?.recordableOnPnc?.trim() === yes) {
      return yes
    }
    if (this.pnldOffenceCodes.find(matchCjsCode)?.recordableOnPnc?.trim() === no) {
      return no
    }
    if (this.pncOffenceCodes.find(matchCjsCode)?.recordableOnPnc?.trim() === no) {
      return no
    }
    return no
  }
}
