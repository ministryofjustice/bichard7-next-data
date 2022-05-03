import { ResultCode } from "../types/ResultCode"
import valueToBoolean from "../lib/valueToBoolean"

const mapResultCodeData = (records: ResultCode[]): ResultCode[] => {
  return records.map(
    (record) =>
      ({
        ...record,
        recordableOnPnc: valueToBoolean(record.recordableOnPnc)
      } as ResultCode)
  )
}

export default mapResultCodeData
