/* eslint-disable no-console */
/* eslint-disable import/no-relative-packages */
import fs from "fs"
import newOrganisationUnitData from "../output-data/data/organisation-unit.json"
import existingOrganisationUnitData from "../output-data/data/organisation-unit-legacy.json"
import { OrganisationUnit } from "./types/OrganisationUnit"

const matchingValues = (firstValue: string, secondValue: string): boolean =>
  firstValue.trim().toLowerCase() === secondValue.trim().toLowerCase()

const checkForRemoved = (newData: OrganisationUnit[], oldData: OrganisationUnit[]): string => {
  const matchNotFoundForRecords: OrganisationUnit[] = []
  let changes: string = ""
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
      let thisChange = "\n__________________\n"

      thisChange = thisChange.concat(`topLevelCode: ${oldRecord.topLevelCode}\n`)
      thisChange = thisChange.concat(`secondLevelCode: ${oldRecord.secondLevelCode}\n`)
      thisChange = thisChange.concat(`thirdLevelCode: ${oldRecord.thirdLevelCode}\n`)
      thisChange = thisChange.concat(`bottomLevelCode: ${oldRecord.bottomLevelCode}\n`)

      // if(oldRecord.topLevelName !== newData[i].topLevelName) {
      //   hasDiff = true
      //   thisChange = thisChange.concat("topLevelName: " + oldRecord.topLevelName + " -> " + newData[i].topLevelName + "\n")
      // } else {
      //   thisChange = thisChange.concat("topLevelName: " + oldRecord.topLevelName + "\n")
      // }
      // if(oldRecord.secondLevelName !== newData[i].secondLevelName) {
      //   hasDiff = true
      //   thisChange = thisChange.concat("secondLevelName: " + oldRecord.secondLevelName + " -> " + newData[i].secondLevelName + "\n")
      // } else {
      //   thisChange = thisChange.concat("secondLevelName: " + oldRecord.secondLevelName + "\n")
      // }
      // if(oldRecord.thirdLevelName !== newData[i].thirdLevelName) {
      //   hasDiff = true
      //   thisChange = thisChange.concat("thirdLevelName: " + oldRecord.thirdLevelName + " -> " + newData[i].thirdLevelName + "\n")
      // } else {
      //   thisChange = thisChange.concat("thirdLevelName: " + oldRecord.thirdLevelName + "\n")
      // }
      // if(oldRecord.bottomLevelName !== newData[i].bottomLevelName) {
      //   hasDiff = true
      //   thisChange = thisChange.concat("bottomLevelName: " + oldRecord.bottomLevelName + " -> " + newData[i].bottomLevelName + "\n")
      // } else {
      //   thisChange = thisChange.concat("bottomLevelName: " + oldRecord.bottomLevelName + "\n")
      // }

      if (oldRecord.thirdLevelPsaCode !== match.thirdLevelPsaCode) {
        hasDiff = true
        thisChange = thisChange.concat(
          `thirdLevelPsaCode: ${oldRecord.thirdLevelPsaCode} -> ${match.thirdLevelPsaCode}\n`
        )
      } else {
        thisChange = thisChange.concat(`thirdLevelPsaCode: ${oldRecord.thirdLevelPsaCode}\n`)
      }
      thisChange = thisChange.concat("\n__________________\n")
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

  return changes
}

const main = async () => {
  const result = checkForRemoved(newOrganisationUnitData, existingOrganisationUnitData)
  await fs.promises.writeFile("./diffs", result)
}

main()
  .then(() => console.log("Checking OU data"))
  .catch((err) => console.error(err))
