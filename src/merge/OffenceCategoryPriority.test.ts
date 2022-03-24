import OffenceCategoryPriority from "./OffenceCategoryPriority"

const testCjsCode = "ABC123"
const testCategory = "CS"

describe("OffenceCodeCategoryPriority", () => {
  it("should prioritise B7 overrides first", () => {
    const b7Overrides = [testCjsCode]

    const priority = new OffenceCategoryPriority([], b7Overrides, [], [], [], [], [])

    expect(priority.getHighestPriority(testCjsCode)).toEqual("B7")
  })

  it("should prioritise civil/libra overrides second", () => {
    const currentOffenceCodes = [{ cjsCode: testCjsCode, offenceCategory: testCategory }]
    const civilLibraOffenceCodes = [{ cjsCode: testCjsCode }]

    const priority = new OffenceCategoryPriority(
      currentOffenceCodes,
      [],
      civilLibraOffenceCodes,
      [],
      [],
      [],
      []
    )

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testCategory)
  })

  it("should prioritise national requested changes third", () => {
    const nrcOffenceCodes = [{ cjsCode: testCjsCode, offenceCategory: testCategory }]

    const priority = new OffenceCategoryPriority([], [], [], nrcOffenceCodes, [], [], [])

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testCategory)
  })

  it("should prioritise local offences fourth", () => {
    const localOffences = [{ cjsCode: testCjsCode, offenceCategory: testCategory }]

    const priority = new OffenceCategoryPriority([], [], [], [], localOffences, [], [])

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testCategory)
  })

  it("should prioritise PNLD offences fifth", () => {
    const pnldOffences = [{ cjsCode: testCjsCode, offenceCategory: testCategory }]

    const priority = new OffenceCategoryPriority([], [], [], [], [], pnldOffences, [])

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testCategory)
  })

  it("should prioritise PNC offences sixth", () => {
    const pncOffences = [{ cjsCode: testCjsCode, offenceCategory: testCategory }]

    const priority = new OffenceCategoryPriority([], [], [], [], [], [], pncOffences)

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testCategory)
  })

  it("should return default category if not found", () => {
    const priority = new OffenceCategoryPriority([], [], [], [], [], [], [])

    expect(priority.getHighestPriority(testCjsCode)).toEqual("CE")
  })
})
