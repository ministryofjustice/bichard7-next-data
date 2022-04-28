import { OffenceCode } from "../../types/types"
import valueToBoolean from "../lib/valueToBoolean"

type OffenceCodeInput = {
  cjsCode: string
  description: string
  homeOfficeClassification: string
  notifiableToHo: string
  offenceCategory: string
  offenceTitle: string
  recordableOnPnc: string
  resultHalfLifeHours?: string | null
}

const mapOffenceCodeData = (records: OffenceCodeInput[]): OffenceCode[] => {
  return records.map(
    (record) =>
      ({
        ...record,
        recordableOnPnc: valueToBoolean(record.recordableOnPnc),
        notifiableToHo: valueToBoolean(record.notifiableToHo)
      } as OffenceCode)
  )
}

export default mapOffenceCodeData
