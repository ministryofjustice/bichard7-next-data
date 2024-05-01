import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"

export default class NotifiableToHOPriority {
  /* eslint-disable no-unused-vars */
  constructor(
    private currentOffenceCodes: OffenceCode[],
    private localOffenceCodes: OffenceCode[],
    private pnldOffenceCodes: OffenceCode[]
  ) {}

  getHighestPriority(cjsCode: string): boolean {
    const defaultValue = false
    const matchCjsCode = getMatchCjsCodeFunction(cjsCode)

    if (typeof this.localOffenceCodes.find(matchCjsCode)?.notifiableToHo === "boolean") {
      return this.localOffenceCodes.find(matchCjsCode)!.notifiableToHo as boolean
    }
    if (typeof this.pnldOffenceCodes.find(matchCjsCode)?.notifiableToHo === "boolean") {
      return this.pnldOffenceCodes.find(matchCjsCode)!.notifiableToHo as boolean
    }
    if (typeof this.currentOffenceCodes.find(matchCjsCode) === "boolean") {
      return this.currentOffenceCodes.find(matchCjsCode)!.notifiableToHo as boolean
    }
    return defaultValue
  }
}
