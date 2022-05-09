import { OffenceCode } from "../types/OffenceCode"
import valueToBoolean from "../lib/valueToBoolean"

type OffenceCodeRecords = {
  cjsCode: string
  description?: string
  homeOfficeClassification?: string | null
  notifiableToHo?: string
  recordCreated?: number[]
  source?: string
  offenceCategory?: string
  offenceTitle?: string
  recordableOnPnc?: string
  resultHalfLifeHours?: string | null
}

const mapOffenceCodeData = (records: OffenceCodeRecords[]): OffenceCode[] => {
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
