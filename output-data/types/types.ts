import type TriggerCode from "./TriggerCode"

type CjsCodeAndDescription = {
  cjsCode: string
  description: string
}

type ActualOffenceDate = CjsCodeAndDescription
type Amount = CjsCodeAndDescription

type AlcoholLevelMethod = {
  cjsCode: string
  description: string
  spiCode: string
}

type Country = CjsCodeAndDescription
type CourtType = CjsCodeAndDescription

type CrestDisposal = {
  amountInResult: string
  amountInResultType: string
  dateInResult: string
  disposalCode: string
  duration: string
  durationType: string
  durationUnit: string
  exception?: boolean
  hoQualifiers: string
  hoResultCode: string
  id: string
  needsMapping: boolean
  numberInResult: string
  numberInResultType: string
  qData: string
  qDilSeqNo: string
  rData: string
  rDilSeqNo: string
  template: string
  timeInResult: string
}

type DefendantPresentAtHearing = CjsCodeAndDescription
type DurationType = CjsCodeAndDescription

type DurationUnit = {
  cjsCode: string
  description: string
  pncCode: string
  spiCode: string
  xhibitCode: string
}

type Gender = DurationUnit

type ModeOfTrialReason = {
  cjsCode: string
  description: string
  spiCode: string
}

type Number = CjsCodeAndDescription
type OffenceCategory = CjsCodeAndDescription

type OffenceCode = {
  cjsCode: string
  description: string
  homeOfficeClassification: string
  notifiableToHo?: boolean
  offenceCategory: string
  offenceTitle: string
  recordableOnPnc?: boolean
  resultHalfLifeHours?: string | null
}

type OffenceInitiation = CjsCodeAndDescription

type OrganisationUnit = {
  bottomLevelCode: string
  bottomLevelName: string
  secondLevelCode: string
  secondLevelName: string
  thirdLevelCode: string
  thirdLevelName: string
  thirdLevelPsaCode: string
  topLevelCode: string
  topLevelName: string
}

type PleaStatus = {
  cjsCode: string
  description: string
  pncCode: string
  spiCode: string
}

type PncCourtMapping = {
  cjsCode: string
  description: string
  pncCode: string
}

type PncDisposal = {
  cjsCode: string
  description: string
  pncAdjudication: string
  pncNonAdjudication: string
}

type Qualifier = CjsCodeAndDescription
type RemandStatus = PleaStatus
type ResultClass = CjsCodeAndDescription

type ResultCode = {
  cjsCode: string
  description: string
  recordableOnPnc?: boolean
  resultCodeQualifiers: string
  resultHalfLifeHours: string
  type: string
}

type ResultQualifierCode = CjsCodeAndDescription
type Summons = CjsCodeAndDescription
type TargetCourtType = CjsCodeAndDescription
type TypeOfHearing = CjsCodeAndDescription
type VehicleCode = CjsCodeAndDescription
type Verdict = PleaStatus
type YesNo = CjsCodeAndDescription

type TriggerDefinition = {
  code: TriggerCode
  description: string
}

type ExcludedTriggerConfig = {
  [key: string]: TriggerCode[]
}

export {
  ActualOffenceDate,
  AlcoholLevelMethod,
  Amount,
  Country,
  CourtType,
  CrestDisposal,
  DefendantPresentAtHearing,
  DurationType,
  DurationUnit,
  ExcludedTriggerConfig,
  Gender,
  ModeOfTrialReason,
  Number,
  OffenceCategory,
  OffenceCode,
  OffenceInitiation,
  OrganisationUnit,
  PleaStatus,
  PncCourtMapping,
  PncDisposal,
  Qualifier,
  RemandStatus,
  ResultClass,
  ResultCode,
  ResultQualifierCode,
  Summons,
  TargetCourtType,
  TriggerCode,
  TriggerDefinition,
  TypeOfHearing,
  VehicleCode,
  Verdict,
  YesNo
}
