import { OffenceCode } from "../types/OffenceCode"
import getMatchCjsCodeFunction from "./getMatchCjsCodeFunction"

const getValue = (offences: OffenceCode[], code: string): boolean | undefined => {
  const matchCjsCode = getMatchCjsCodeFunction(code)
  const match = offences.find(matchCjsCode)?.notifiableToHo
  return typeof match === "boolean" ? match : undefined
}

export default class NotifiableToHOPriority {
  constructor(
    private currentOffenceCodes: OffenceCode[],
    private pnldOffenceCodes: OffenceCode[]
  ) {}

  getHighestPriority(cjsCode: string): boolean {
    const defaultValue = false

    return (
      getValue(this.pnldOffenceCodes, cjsCode) ??
      getValue(this.currentOffenceCodes, cjsCode) ??
      defaultValue
    )
  }
}
