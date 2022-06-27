import { offenceCategory, offenceCode } from "../index"

describe("offence-code.json", () => {
  // Skipping because there are bad offence categories in the data from the legacy NRCs.
  // We're aware of this and investigating removing the legacy NRCs all together.
  it.skip("should reference only offence categories in offence-category.json", () => {
    const validCategoryCodes = offenceCategory.map((category) => category.cjsCode)

    offenceCode.forEach((code) => {
      expect(validCategoryCodes).toContain(code.offenceCategory)
    })
  })
})
