import { OffenceCode } from "../types/OffenceCode"
import valueToBoolean from "../lib/valueToBoolean"

const mapOffenceCodeData = (records: OffenceCode[]): OffenceCode[] => {
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
