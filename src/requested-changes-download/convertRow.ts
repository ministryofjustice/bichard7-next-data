import type { OffenceCodeRow } from "./sheetsClient"
import type { OffenceCode } from "../types/OffenceCode"

export default (rows: OffenceCodeRow): OffenceCode => {
  return <OffenceCode>{
    cjsCode: rows.cjsCode
  }
}
