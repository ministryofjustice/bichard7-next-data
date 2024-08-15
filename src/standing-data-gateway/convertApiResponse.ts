import { OffenceCode } from "../types/OffenceCode"
import { ApiOffence } from "../types/StandingDataAPIResult"

export default (apiResponse: ApiOffence[] | Error): OffenceCode[] => {
  if (apiResponse instanceof Error) {
    throw new Error("apiResponse resulted in Error output")
  }
  return apiResponse.map((offenceCode) => ({
    cjsCode: offenceCode.code,
    description: offenceCode.code,
    homeOfficeClassification: "099/96",
    notifiableToHo: offenceCode.Notifiable,
    offenceCategory: offenceCode.OffenceType,
    offenceTitle: offenceCode.CjsTitle,
    recordableOnPnc: offenceCode.Recordable
  }))
}
