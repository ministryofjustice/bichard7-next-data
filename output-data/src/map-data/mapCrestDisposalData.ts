import { CrestDisposal } from "../../types/types"
import valueToBoolean from "../lib/valueToBoolean"

type CrestDisposalInput = {
  amountInResult: string
  amountInResultType: string
  dateInResult: string
  disposalCode: string
  duration: string
  durationType: string
  durationUnit: string
  exception: string
  hoQualifiers: string
  hoResultCode: string
  id: string
  needsMapping: string
  numberInResult: string
  numberInResultType: string
  qData: string
  qDilSeqNo: string
  rData: string
  rDilSeqNo: string
  template: string
  timeInResult: string
}

const mapCrestDisposalData = (records: CrestDisposalInput[]): CrestDisposal[] => {
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
