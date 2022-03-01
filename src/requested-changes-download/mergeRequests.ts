import lodash from "lodash"
import { OffenceCodeRow } from "./sheetsClient"

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
