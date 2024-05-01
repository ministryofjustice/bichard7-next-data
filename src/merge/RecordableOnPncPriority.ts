import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"

const getValue = (offences: OffenceCode[], code: string): boolean | undefined => {
  const matchCjsCode = getMatchCjsCodeFunction(code)
  const match = offences.find(matchCjsCode)?.recordableOnPnc
  return typeof match === "boolean" ? match : undefined
}
export default class RecordableOnPncPriority {
  constructor(
    private currentOffenceCodes: OffenceCode[],
    private pnldOffenceCodes: OffenceCode[],
    private pncOffenceCodes: OffenceCode[]
  ) {}

  getHighestPriority(cjsCode: string): boolean {
    return (
      getValue(this.pncOffenceCodes, cjsCode) ??
      getValue(this.pnldOffenceCodes, cjsCode) ??
      getValue(this.currentOffenceCodes, cjsCode) ??
      false
    )
  }
}
