/* eslint-disable no-console */
import { OrganisationUnit } from "../types/OrganisationUnit"

const matchingValues = (firstValue: string, secondValue: string): boolean =>
  firstValue.trim().toLowerCase() === secondValue.trim().toLowerCase()

const mergeOrganisationUnits = (
  newData: OrganisationUnit[],
  existingData: OrganisationUnit[]
): OrganisationUnit[] => {
  const merged: OrganisationUnit[] = []

  newData.forEach((record) => {
    const matchingRecords = existingData.filter(
      (oldR) =>
        matchingValues(oldR.topLevelCode, record.topLevelCode) &&
        matchingValues(oldR.secondLevelCode, record.secondLevelCode) &&
        matchingValues(oldR.thirdLevelCode, record.thirdLevelCode) &&
        matchingValues(oldR.bottomLevelCode, record.bottomLevelCode)
    )
    if (matchingRecords.length > 1) {
      console.log(JSON.stringify(matchingRecords))
      throw Error("There are more than one match for this record!")
    } else if (matchingRecords.length === 1) {
      const existingRecord = matchingRecords[0]

      existingRecord.topLevelName =
        record.topLevelName && record.topLevelName !== ""
          ? record.topLevelName
          : existingRecord.topLevelName
      existingRecord.secondLevelName =
        record.secondLevelName && record.secondLevelName !== ""
          ? record.secondLevelName
          : existingRecord.secondLevelName
      existingRecord.thirdLevelName =
        record.thirdLevelName && record.thirdLevelName !== ""
          ? record.thirdLevelName
          : existingRecord.thirdLevelName
      existingRecord.bottomLevelName =
        record.bottomLevelName && record.bottomLevelName !== ""
          ? record.bottomLevelName
          : existingRecord.bottomLevelName
      // existingRecord.thirdLevelPsaCode = record.thirdLevelPsaCode && record.thirdLevelPsaCode !== ""
      // ? record.thirdLevelPsaCode
      // : existingRecord.thirdLevelPsaCode

      merged.push(record)
    } else {
      console.log("NEW RECORD!!!!!!!!!!!!")
      merged.push(record)
    }
  })

  return merged
}

export default mergeOrganisationUnits
