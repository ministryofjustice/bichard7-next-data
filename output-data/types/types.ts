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
type ResultQualifierCode = CjsCodeAndDescription
type Summons = CjsCodeAndDescription
type TargetCourtType = CjsCodeAndDescription
type TypeOfHearing = CjsCodeAndDescription
type VehicleCode = CjsCodeAndDescription
type Verdict = PleaStatus
type YesNo = CjsCodeAndDescription

export {
  ActualOffenceDate,
  AlcoholLevelMethod,
  Amount,
  Country,
  CourtType,
  DefendantPresentAtHearing,
  DurationType,
  DurationUnit,
  Gender,
  ModeOfTrialReason,
  Number,
  OffenceCategory,
  OffenceInitiation,
  OrganisationUnit,
  PleaStatus,
  PncCourtMapping,
  PncDisposal,
  Qualifier,
  RemandStatus,
  ResultClass,
  ResultQualifierCode,
  Summons,
  TargetCourtType,
  TypeOfHearing,
  VehicleCode,
  Verdict,
  YesNo
}
