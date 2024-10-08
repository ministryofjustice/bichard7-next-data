import { OffenceCodeLookup } from "../types/OffenceCodeLookup"
import OffenceTitlePriority from "./OffenceTitlePriority"

const cjsCode = "ABC123"

const currentOffences: OffenceCodeLookup = { [cjsCode]: { cjsCode, offenceTitle: "CURRENT" } }
const pnldOffences: OffenceCodeLookup = { [cjsCode]: { cjsCode, offenceTitle: "PNLD" } }
const pncOffences: OffenceCodeLookup = { [cjsCode]: { cjsCode, offenceTitle: "PNC" } }

describe("OffenceTitlePriority", () => {
  it("should prioritise PNLD offences first", () => {
    const priority = new OffenceTitlePriority(currentOffences, pnldOffences, pncOffences)

    expect(priority.getHighestPriority(cjsCode)).toEqual("PNLD")
  })

  it("should prioritise PNC offences third", () => {
    const priority = new OffenceTitlePriority(currentOffences, {}, pncOffences)

    expect(priority.getHighestPriority(cjsCode)).toEqual("PNC")
  })

  it("should fall back to curent offences", () => {
    const priority = new OffenceTitlePriority(currentOffences, {}, {})

    expect(priority.getHighestPriority(cjsCode)).toEqual("CURRENT")
  })

  it("should return default title if not found", () => {
    const priority = new OffenceTitlePriority({}, {}, {})

    expect(priority.getHighestPriority(cjsCode)).toEqual("")
  })
})
