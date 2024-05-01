import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"

const defaultValue = "000/00"

const getValue = (offences: OffenceCode[], code: string): string | undefined => {
  const matchCjsCode = getMatchCjsCodeFunction(code)
  const match = offences.find(matchCjsCode)?.homeOfficeClassification
  if (!match || match === defaultValue) {
    return undefined
  }
  return match
}
export default class HomeOfficeClassifictionPriority {
  constructor(
    private currentOffenceCodes: OffenceCode[],
    private pnldOffenceCodes: OffenceCode[]
  ) {}

  getHighestPriority(cjsCode: string): string {
    return (
      getValue(this.pnldOffenceCodes, cjsCode) ??
      getValue(this.currentOffenceCodes, cjsCode) ??
      defaultValue
    )
  }
}
