/* eslint no-underscore-dangle: 0 */
import fs from "fs"

type DataItem = Record<string, string | number | null | undefined>
type ChangedItem = {
  key: string
  changes: string[]
}

const newPath = String(process.env.NEW_DATA_PATH)
const oldPath = String(process.env.OLD_DATA_PATH)

const defaultComparisonFn = (o: DataItem, n: DataItem) =>
  ("__key" in o && o["__key"] === n["__key"]) ||
  ("cjsCode" in o && o["cjsCode"] === n["cjsCode"]) ||
  ("code" in o && o["code"] === n["code"]) ||
  ("disposalCode" in o && o["disposalCode"] === n["disposalCode"])

const organisationUnitComparisonFn = (o: DataItem, n: DataItem) =>
  o["bottomLevelCode"] === n["bottomLevelCode"] &&
  o["secondLevelCode"] === n["secondLevelCode"] &&
  o["thirdLevelCode"] === n["thirdLevelCode"] &&
  o["thirdLevelPsaCode"] === n["thirdLevelPsaCode"] &&
  o["topLevelCode"] === n["topLevelCode"]

const files = ["offence-code.json"] //fs.readdirSync(oldPath).filter((file) => file.endsWith(".json"))
const defaultFileFns = files.reduce((acc, file) => {
  acc[file] = defaultComparisonFn
  return acc
}, {})

const dataFileFns: Record<string, (o: DataItem, n: DataItem) => boolean> = {
  ...defaultFileFns,
  "organisation-unit.json": organisationUnitComparisonFn
}

const convertToArray = (rawData): DataItem[] =>
  Array.isArray(rawData)
    ? rawData
    : Object.entries(rawData).map(([k, v]) => ({ __key: k, ...(v as any) }))

const filesResult = {}
for (const file of files) {
  console.log("Processing", file)
  const oldFilePath = `${oldPath}/${file}`
  const newFilePath = `${newPath}/${file}`
  if (!fs.existsSync(oldFilePath) || !fs.existsSync(newFilePath)) {
    continue
  }

  const oldData = convertToArray(JSON.parse(fs.readFileSync(oldFilePath).toString()))
  const newData = convertToArray(JSON.parse(fs.readFileSync(newFilePath).toString()))

  const deletedItems = oldData.filter(
    (oldDataItem) => !newData.some((newDataItem) => dataFileFns[file](oldDataItem, newDataItem))
  )
  const addedItems = newData.filter(
    (newDataItem) => !oldData.some((oldDataItem) => dataFileFns[file](oldDataItem, newDataItem))
  )
  const changedItems = oldData
    .map((oldDataItem) => {
      const newDataItem = newData.find((newItem) => dataFileFns[file](oldDataItem, newItem))
      if (!newDataItem) {
        return undefined
      }

      const generateChangeLog = (fieldName: string): string | undefined => {
        const oldValue =
          typeof oldDataItem[fieldName] === "object"
            ? JSON.stringify(oldDataItem[fieldName])
            : oldDataItem[fieldName]
        const newValue =
          typeof newDataItem[fieldName] === "object"
            ? JSON.stringify(newDataItem[fieldName])
            : newDataItem[fieldName]
        if (newValue === oldValue) {
          return undefined
        }

        const valueChange = `**${fieldName}**:<br>- Old: '*${oldValue}*'<br>- New: '*${newValue}*'`
        return valueChange
      }

      const changes = Object.keys(oldDataItem)
        .map((fieldName) => generateChangeLog(fieldName))
        .filter((x) => x)

      return changes.length
        ? {
            key: oldDataItem["__key"] || oldDataItem["cjsCode"] || oldDataItem["code"] || "",
            changes
          }
        : undefined
    })
    .filter((x) => x) as ChangedItem[]

  filesResult[file] = {
    deleted: deletedItems,
    added: addedItems,
    changed: changedItems
  }
}

const getFields = (offence) =>
  Object.keys(offence)
    .map((fieldName) => `**${fieldName}**: ${offence[fieldName]}`)
    .join("<br>")

const generateDeletedOrAddedTable = (deletedItems: DataItem[]) =>
  [
    "| Details |",
    "|---------|",
    deletedItems.map((item) => `| ${getFields(item)} |`).join("\n")
  ].join("\n")

const generateChangedItemsTable = (changedItems: ChangedItem[]) =>
  [
    "| Key     | Changes |",
    "|---------|---------|",
    ...changedItems
      .filter((x) => x)
      .map(({ key, changes }) => `| **${key}** | ${changes.join("<br>")} |`)
  ].join("\n")

let markdown = "# Changelog\n"

for (const file of Object.keys(filesResult)) {
  const fileMarkdown: string[] = []
  const { deleted, added, changed } = filesResult[file]
  if (deleted.length) {
    fileMarkdown.push(`
    <details>
      <summary>Deleted Offences (${deleted.length})</summary>
${generateDeletedOrAddedTable(deleted)}
    </details>
  `)
  }

  if (added.length) {
    fileMarkdown.push(`
    <details>
      <summary>Added Offences (${added.length})</summary>
${generateDeletedOrAddedTable(added)}
    </details>
  `)
  }

  if (changed.length) {
    fileMarkdown.push(`
    <details>
      <summary>Changed Offences (${changed.length})</summary>
${generateChangedItemsTable(changed)}
    </details>
  `)
  }

  if (fileMarkdown.length) {
    markdown += `
    ### ${file}

    ${fileMarkdown.join("\n")}
  
    `
  }
}

fs.writeFileSync("CHANGELOG.md", markdown)
