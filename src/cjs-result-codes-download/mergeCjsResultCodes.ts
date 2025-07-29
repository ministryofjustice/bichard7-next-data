import { ResultCode } from "../../output-data/types/types"

const matchingValues = (firstValue: string, secondValue: string): boolean =>
  firstValue?.trim().toLowerCase() === secondValue?.trim().toLowerCase()

const mergeCjsResultCodes = (newData: ResultCode[], existingData: ResultCode[]): ResultCode[] => {
  newData.forEach((newItem) => {
    const existingRecord = existingData.find((existingItem) =>
      matchingValues(existingItem.cjsCode, newItem.cjsCode)
    )

    if (existingRecord) {
      existingRecord.description = newItem.description
      existingRecord.recordableOnPnc = newItem.recordableOnPnc
      existingRecord.resultCodeQualifiers = newItem.resultCodeQualifiers
      existingRecord.resultHalfLifeHours = newItem.resultHalfLifeHours
      existingRecord.type = newItem.type
    } else {
      existingData.push(newItem)
    }
  })

  return existingData
}

export default mergeCjsResultCodes
