import { OrganisationUnit } from "../types/OrganisationUnit"

const matchingValues = (firstValue: string, secondValue: string): boolean =>
  firstValue.trim().toLowerCase() === secondValue.trim().toLowerCase()

const mergeOrganisationUnits = (
  newData: OrganisationUnit[],
  existingData: OrganisationUnit[]
): OrganisationUnit[] => {
  newData.forEach((record) => {
    const oldRecord = existingData.find(
      (oldR) =>
        matchingValues(oldR.topLevelCode, record.topLevelCode) &&
        matchingValues(oldR.secondLevelCode, record.secondLevelCode) &&
        matchingValues(oldR.thirdLevelCode, record.thirdLevelCode) &&
        matchingValues(oldR.bottomLevelCode, record.bottomLevelCode)
    )
    if (oldRecord) {
      // eslint-disable-next-line no-param-reassign
      oldRecord.topLevelName = record.topLevelName ? record.topLevelName : oldRecord.topLevelName
      oldRecord.secondLevelName = record.secondLevelName
        ? record.secondLevelName
        : oldRecord.secondLevelName
      oldRecord.thirdLevelName = record.thirdLevelName
        ? record.thirdLevelName
        : oldRecord.thirdLevelName
      oldRecord.bottomLevelName = record.bottomLevelName
        ? record.bottomLevelName
        : oldRecord.bottomLevelName
      oldRecord.thirdLevelPsaCode = record.thirdLevelPsaCode
        ? record.thirdLevelPsaCode
        : oldRecord.thirdLevelPsaCode
    } else {
      existingData.push(record)
    }
  })

  return existingData
}

export default mergeOrganisationUnits
