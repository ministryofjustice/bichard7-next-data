export enum GenderCode {
  NOT_KNOWN = 0,
  MALE = 1,
  FEMALE = 2,
  NOT_SPECIFIED = 9
}

export const GenderCodes: Record<GenderCode, string> = {
  [GenderCode.NOT_KNOWN]: "0 (not known)",
  [GenderCode.MALE]: "1 (male)",
  [GenderCode.FEMALE]: "2 (female)",
  [GenderCode.NOT_SPECIFIED]: "9 (not specified)"
}
