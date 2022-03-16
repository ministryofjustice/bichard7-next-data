import { OffenceCode } from "../types/OffenceCode"

export default class OffenceCodeMerger {
  currentOffenceCodes: OffenceCode[]

  offenceCodeB7CategoryOverrides: string[]

  civilLibraOffenceCodes: OffenceCode[]

  nrcOffenceCodes: OffenceCode[]

  localOffenceCodes: OffenceCode[]

  pnldOffenceCodes: OffenceCode[]

  cjsOffenceCodes: OffenceCode[]

  pncOffenceCodes: OffenceCode[]

  constructor(
    currentOffenceCodes: OffenceCode[],
    offenceCodeB7CategoryOverrides: string[],
    civilLibraOffenceCodes: OffenceCode[],
    nrcOffenceCodes: OffenceCode[],
    localOffenceCodes: OffenceCode[],
    pnldOffenceCodes: OffenceCode[],
    cjsOffenceCodes: OffenceCode[],
    pncOffenceCodes: OffenceCode[]
  ) {
    this.offenceCodeB7CategoryOverrides = offenceCodeB7CategoryOverrides
    this.civilLibraOffenceCodes = civilLibraOffenceCodes
    this.currentOffenceCodes = currentOffenceCodes
    this.nrcOffenceCodes = nrcOffenceCodes
    this.localOffenceCodes = localOffenceCodes
    this.pnldOffenceCodes = pncOffenceCodes
    this.cjsOffenceCodes = cjsOffenceCodes
    this.pncOffenceCodes = pncOffenceCodes
  }
}
