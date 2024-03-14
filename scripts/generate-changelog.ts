import fs from "fs"

type Offence = {
  cjsCode: string
  description: string
  homeOfficeClassification: string
  notifiableToHo: boolean
  offenceCategory: string
  offenceTitle: string
  recordableOnPnc: boolean
  resultHalfLifeHours: string
}

type ChangedOffence = {
  code: string
  changes: string[]
}

const oldOffences = JSON.parse(
  fs.readFileSync(String(process.env.OLD_OFFENCES)).toString()
) as Offence[]
const newOffences = JSON.parse(
  fs.readFileSync(String(process.env.NEW_OFFENCES)).toString()
) as Offence[]

const getLabel = (fieldName: string) =>
  ({
    cjsCode: "Code",
    description: "Description",
    homeOfficeClassification: "HO Classification",
    notifiableToHo: "Notifiable to HO",
    offenceCategory: "Category",
    offenceTitle: "Title",
    recordableOnPnc: "Recordable",
    resultHalfLifeHours: "Result half life hours"
  })[fieldName] || fieldName

const getFields = (offence) =>
  Object.keys(offence)
    .map((fieldName) => `**${getLabel(fieldName)}**: ${offence[fieldName]}`)
    .join("<br>")

// Deleted offences
const deletedOffences = oldOffences.filter((o) => !newOffences.some((n) => o.cjsCode === n.cjsCode))
const deletedOffencesTable = [
  "| Code     | Details |",
  "|----------|---------|",
  deletedOffences.map((offence) => `| ${offence.cjsCode} | ${getFields(offence)} |`).join("\n")
].join("\n")

// Added offences
const addedOffences = newOffences.filter((o) => !oldOffences.some((n) => o.cjsCode === n.cjsCode))
const addedOffencesTable = [
  "| Code     | Details |",
  "|----------|---------|",
  addedOffences.map((offence) => `| ${offence.cjsCode} | ${getFields(offence)} |`).join("\n")
].join("\n")

// Updated offences
const changedOffences: ChangedOffence[] = oldOffences
  .map((oldOffence) => {
    const newOffence = newOffences.find((n) => oldOffence.cjsCode === n.cjsCode)
    if (!newOffence) {
      return undefined
    }

    const generateChangeLog = (fieldName: string): string | undefined => {
      const oldValue = oldOffence[fieldName]
      const newValue = newOffence[fieldName]
      if (newValue === oldValue) {
        return undefined
      }

      const label = getLabel(fieldName)

      const valueChange = `**${label}**:<br>- Old: '*${oldValue}*'<br>- New: '*${newValue}*'`
      return valueChange
    }

    const changes = Object.keys(oldOffence)
      .map((fieldName) => generateChangeLog(fieldName))
      .filter((x) => x)

    return changes.length
      ? {
          code: oldOffence.cjsCode,
          changes
        }
      : undefined
  })
  .filter((x) => x) as ChangedOffence[]

const changedOffencesTable = [
  "| Code     | Changes |",
  "|----------|---------|",
  ...changedOffences
    .filter((x) => x)
    .map(({ code, changes }) => `| **${code}** | ${changes.join("<br>")} |`)
].join("\n")

const fileContent = `
# Changelog

## Deleted Offences

${deletedOffences.length ? deletedOffencesTable : "No offences deleted"}

## Added Offences

${addedOffences.length ? addedOffencesTable : "No offences added"}

## Changed Offences

${changedOffences.length ? changedOffencesTable : "No offences changed"}
`

fs.writeFileSync("CHANGELOG.md", fileContent)
