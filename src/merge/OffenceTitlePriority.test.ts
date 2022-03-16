import OffenceTitlePriority from "./OffenceTitlePriority"

const testCjsCode = "ABC123"
const testTitle = "Murder most horrid"

describe("OffenceTitlePriority", () => {
  it("should prioritise civil/libra overrides first", () => {
    const currentOffenceCodes = [{ cjsCode: testCjsCode, offenceTitle: testTitle }]
    const civilLibraOffenceCodes = [{ cjsCode: testCjsCode }]

    const priority = new OffenceTitlePriority(
      currentOffenceCodes,
      civilLibraOffenceCodes,
      [],
      [],
      [],
      [],
      []
    )

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testTitle)
  })

  it("should prioritise national requested changes second", () => {
    const nrcOffenceCodes = [{ cjsCode: testCjsCode, offenceTitle: testTitle }]

    const priority = new OffenceTitlePriority([], [], nrcOffenceCodes, [], [], [], [])

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testTitle)
  })

  it("should prioritise local offences third", () => {
    const localOffences = [{ cjsCode: testCjsCode, offenceTitle: testTitle }]

    const priority = new OffenceTitlePriority([], [], [], localOffences, [], [], [])

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testTitle)
  })

  it("should prioritise PNLD offences fourth", () => {
    const pnldOffences = [{ cjsCode: testCjsCode, offenceTitle: testTitle }]

    const priority = new OffenceTitlePriority([], [], [], [], pnldOffences, [], [])

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testTitle)
  })

  it("should prioritise CJS offences fifth", () => {
    const cjsOffences = [{ cjsCode: testCjsCode, offenceTitle: testTitle }]

    const priority = new OffenceTitlePriority([], [], [], [], [], cjsOffences, [])

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testTitle)
  })

  it("should prioritise PNC offences sixth", () => {
    const pncOffences = [{ cjsCode: testCjsCode, offenceTitle: testTitle }]

    const priority = new OffenceTitlePriority([], [], [], [], [], [], pncOffences)

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testTitle)
  })

  it("should return default title if not found", () => {
    const priority = new OffenceTitlePriority([], [], [], [], [], [], [])

    expect(priority.getHighestPriority(testCjsCode)).toEqual("")
  })
})
