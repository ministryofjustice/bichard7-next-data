import { CrestDisposal } from "../types/CrestDisposal"
import valueToBoolean from "../lib/valueToBoolean"

const mapCrestDisposalData = (records: CrestDisposal[]): CrestDisposal[] => {
  return records.map(
    (record) =>
      ({
        ...record,
        exception: valueToBoolean(record.exception),
        needsMapping: valueToBoolean(record.needsMapping)
      } as CrestDisposal)
  )
}

export default mapCrestDisposalData
