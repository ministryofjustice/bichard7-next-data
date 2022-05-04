import actualOffenceDateData from "./data/actual-offence-date.json"
import alcoholLevelMethodData from "./data/alcohol-level-method.json"
import amountData from "./data/amount.json"
import countryData from "./data/country.json"
import courtTypeData from "./data/court-type.json"
import crestDisposalData from "./data/crest-disposal.json"
import defendantPresentAtHearingData from "./data/defendant-present-at-hearing.json"
import durationTypeData from "./data/duration-type.json"
import durationUnitData from "./data/duration-unit.json"
import excudedTriggerConfigData from "./data/excluded-trigger-config.json"
import genderData from "./data/gender.json"
import modeOfTrialReasonData from "./data/mode-of-trial-reason.json"
import numberData from "./data/number.json"
import offenceCategoryData from "./data/offence-category.json"
import offenceCodeData from "./data/offence-code.json"
import offenceInitiationData from "./data/offence-initiation.json"
import organisationUnitData from "./data/organisation-unit.json"
import pleaStatusData from "./data/plea-status.json"
import pncCourtMappingData from "./data/pnc-court-mapping.json"
import pncDisposalData from "./data/pnc-disposal.json"
import qualifierData from "./data/qualifier.json"
import remandStatusData from "./data/remand-status.json"
import resultClassData from "./data/result-class.json"
import resultCodeData from "./data/result-code.json"
import resultQualifierCodeData from "./data/result-qualifier-code.json"
import summonsData from "./data/summons.json"
import targetCourtTypeData from "./data/target-court-type.json"
import triggerDefinitionData from "./data/trigger-definitions.json"
import typeOfHearingData from "./data/type-of-hearing.json"
import vehicleCodeData from "./data/vehicle-code.json"
import verdictData from "./data/verdict.json"
import yesNoData from "./data/yes-no.json"
import {
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
  TriggerDefinition,
  TypeOfHearing,
  VehicleCode,
  Verdict,
  YesNo
} from "./types/types"

const actualOffenceDate: ActualOffenceDate[] = actualOffenceDateData
const alcoholLevelMethod: AlcoholLevelMethod[] = alcoholLevelMethodData
const amount: Amount[] = amountData
const country: Country[] = countryData
const courtType: CourtType[] = courtTypeData
const crestDisposal: CrestDisposal[] = crestDisposalData
const defendantPresentAtHearing: DefendantPresentAtHearing[] = defendantPresentAtHearingData
const durationType: DurationType[] = durationTypeData
const durationUnit: DurationUnit[] = durationUnitData
const excludedTriggerConfig = excudedTriggerConfigData as ExcludedTriggerConfig
const gender: Gender[] = genderData
const modeOfTrialReason: ModeOfTrialReason[] = modeOfTrialReasonData
const number: Number[] = numberData
const offenceCategory: OffenceCategory[] = offenceCategoryData
const offenceCode: OffenceCode[] = offenceCodeData
const offenceInitiation: OffenceInitiation[] = offenceInitiationData
const organisationUnit: OrganisationUnit[] = organisationUnitData
const pleaStatus: PleaStatus[] = pleaStatusData
const pncCourtMapping: PncCourtMapping[] = pncCourtMappingData
const pncDisposal: PncDisposal[] = pncDisposalData
const qualifier: Qualifier[] = qualifierData
const remandStatus: RemandStatus[] = remandStatusData
const resultClass: ResultClass[] = resultClassData
const resultCode: ResultCode[] = resultCodeData
const resultQualifierCode: ResultQualifierCode[] = resultQualifierCodeData
const summons: Summons[] = summonsData
const targetCourtType: TargetCourtType[] = targetCourtTypeData
const triggerDefinitions = triggerDefinitionData as TriggerDefinition[]
const typeOfHearing: TypeOfHearing[] = typeOfHearingData
const vehicleCode: VehicleCode[] = vehicleCodeData
const verdict: Verdict[] = verdictData
const yesNo: YesNo[] = yesNoData

export default {
  actualOffenceDate,
  alcoholLevelMethod,
  amount,
  country,
  courtType,
  crestDisposal,
  defendantPresentAtHearing,
  durationType,
  durationUnit,
  excludedTriggerConfig,
  gender,
  modeOfTrialReason,
  number,
  offenceCategory,
  offenceCode,
  offenceInitiation,
  organisationUnit,
  pleaStatus,
  pncCourtMapping,
  pncDisposal,
  qualifier,
  remandStatus,
  resultClass,
  resultCode,
  resultQualifierCode,
  summons,
  targetCourtType,
  triggerDefinitions,
  typeOfHearing,
  vehicleCode,
  verdict,
  yesNo
}
