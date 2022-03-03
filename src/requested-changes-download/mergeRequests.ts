import lodash from "lodash"
import { OffenceCodeRow } from "./sheetsClient"

// Remove duplicate requests for the same offence code, taking the most recent update as authoritative
export default (offenceCodes: OffenceCodeRow[]): OffenceCodeRow[] => {
  const sorted = lodash.orderBy(
    offenceCodes,
    [
      (code) => {
        return code.submitted
      }
    ],
    ["desc"]
  )
  return lodash.sortedUniqBy(sorted, (code) => {
    return code.cjsCode
  })
}
