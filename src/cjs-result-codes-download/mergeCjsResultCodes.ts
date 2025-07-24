import { ResultCode } from "../../output-data/types/types"

const matchingValues = (
  firstValue: string | undefined,
  secondValue: string | undefined
): boolean => {
  if (firstValue === undefined || secondValue === undefined) {
    return false
  }

  return firstValue?.trim().toLowerCase() === secondValue?.trim().toLowerCase()
}

const mergeCjsResultCodes = (newData: ResultCode[], existingData: ResultCode[]): ResultCode[] => {
  newData.forEach((newItem) => {
    const existingRecord = existingData.find(
      (existingItem) =>
        matchingValues(existingItem.cjsCode, newItem.cjsCode) &&
        matchingValues(existingItem.description, newItem.description) &&
        matchingValues(existingItem.recordableOnPnc, newItem.recordableOnPnc) &&
        matchingValues(existingItem.resultCodeQualifiers, newItem.resultCodeQualifiers) &&
        matchingValues(existingItem.resultHalfLifeHours, newItem.resultHalfLifeHours) &&
        matchingValues(existingItem.type, newItem.type)
    )

    console.log("====>", existingRecord)

    if (existingRecord) {
      existingRecord.cjsCode = newItem.cjsCode || existingRecord.cjsCode
      existingRecord.description = newItem.description || existingRecord.description
      existingRecord.recordableOnPnc = newItem.recordableOnPnc || existingRecord.recordableOnPnc
      existingRecord.resultCodeQualifiers =
        newItem.resultCodeQualifiers || existingRecord.resultCodeQualifiers
      existingRecord.resultHalfLifeHours =
        newItem.resultHalfLifeHours || existingRecord.resultHalfLifeHours
      existingRecord.type = newItem.type || existingRecord.type
    } else {
      existingData.push(newItem)
    }
  })

  return existingData
}

export default mergeCjsResultCodes
