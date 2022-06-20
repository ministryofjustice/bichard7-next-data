/* eslint-disable no-console */
/* eslint-disable import/no-relative-packages */
import fs from "fs"
import newOrganisationUnitData from "../output-data/data/organisation-unit.json"
import legacyOrganisationUnitData from "../output-data/data/organisation-unit-legacy.json"
import { OrganisationUnit } from "./types/OrganisationUnit"

const matchingValues = (firstValue: string, secondValue: string): boolean =>
  firstValue.trim().toLowerCase() === secondValue.trim().toLowerCase()

const checkForRemoved = (newData: OrganisationUnit[], oldData: OrganisationUnit[]): string => {
  const matchNotFoundForRecords: OrganisationUnit[] = []
  let changes: string[] = []
  let numberOfChanges = 0

  oldData.forEach((oldRecord) => {
    const match = newData.find(
      (newRecord) =>
        matchingValues(oldRecord.topLevelCode, newRecord.topLevelCode) &&
        matchingValues(oldRecord.secondLevelCode, newRecord.secondLevelCode) &&
        matchingValues(oldRecord.thirdLevelCode, newRecord.thirdLevelCode) &&
        matchingValues(oldRecord.bottomLevelCode, newRecord.bottomLevelCode)
    )
    if (match) {
      let hasDiff = false
      const thisChange = []

      // thisChange = thisChange.concat(`topLevelCode: ${oldRecord.topLevelCode}\n`)
      // thisChange = thisChange.concat(`secondLevelCode: ${oldRecord.secondLevelCode}\n`)
      // thisChange = thisChange.concat(`thirdLevelCode: ${oldRecord.thirdLevelCode}\n`)
      // thisChange = thisChange.concat(`bottomLevelCode: ${oldRecord.bottomLevelCode}\n`)

      if (oldRecord.topLevelName !== match.topLevelName) {
        hasDiff = true
        thisChange.push(`topLevelName: ${oldRecord.topLevelName} -> ${match.topLevelName}`)
      } else {
        // thisChange = thisChange.concat("topLevelName: " + oldRecord.topLevelName + "\n")
      }
      if (oldRecord.secondLevelName !== match.secondLevelName) {
        hasDiff = true
        thisChange.push(`secondLevelName: ${oldRecord.secondLevelName} -> ${match.secondLevelName}`)
      } else {
        // thisChange = thisChange.concat("secondLevelName: " + oldRecord.secondLevelName + "\n")
      }
      if (oldRecord.thirdLevelName !== match.thirdLevelName) {
        hasDiff = true
        thisChange.push(`thirdLevelName: ${oldRecord.thirdLevelName} -> ${match.thirdLevelName}\n`)
      } else {
        // thisChange = thisChange.concat("thirdLevelName: " + oldRecord.thirdLevelName + "\n")
      }
      if (oldRecord.bottomLevelName !== match.bottomLevelName) {
        hasDiff = true
        thisChange.push(`bottomLevelName: ${oldRecord.bottomLevelName} -> ${match.bottomLevelName}`)
      } else {
        // thisChange = thisChange.concat("bottomLevelName: " + oldRecord.bottomLevelName + "\n")
      }

      if (oldRecord.thirdLevelPsaCode !== match.thirdLevelPsaCode) {
        hasDiff = true
        thisChange.push(
          `thirdLevelPsaCode: ${oldRecord.thirdLevelPsaCode} -> ${match.thirdLevelPsaCode}`
        )
      } else {
        // thisChange = thisChange.concat(`thirdLevelPsaCode: ${oldRecord.thirdLevelPsaCode}\n`)
      }
      if (hasDiff) {
        numberOfChanges += 1
        changes = changes.concat(thisChange)
      }
    } else {
      matchNotFoundForRecords.push(oldRecord)
    }
  })

  if (matchNotFoundForRecords.length > 0) {
    console.log("NR of missing records:", matchNotFoundForRecords.length)
    return JSON.stringify(matchNotFoundForRecords)
  }

  console.log(`Changed records ${numberOfChanges}`)

  const result = new Set(changes)
  return JSON.stringify([...result])
}

const main = async () => {
  const result = checkForRemoved(newOrganisationUnitData, legacyOrganisationUnitData)
  await fs.promises.writeFile("./diffs.json", result)
}

main()
  .then(() => console.log("Checking OU data"))
  .catch((err) => console.error(err))
