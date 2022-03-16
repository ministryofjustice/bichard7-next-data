import HomeOfficeClassifictionPriority from "./HomeOfficeClassificationPriority"

const testCjsCode = "ABC123"
const testHomeOfficeClassification = "123/45"

describe("NotifiableToHOPriority", () => {
  it("should prioritise civil/libra overrides first", () => {
    const currentOffenceCodes = [
      { cjsCode: testCjsCode, homeOfficeClassification: testHomeOfficeClassification }
    ]
    const civilLibraOffenceCodes = [{ cjsCode: testCjsCode }]

    const priority = new HomeOfficeClassifictionPriority(
      currentOffenceCodes,
      civilLibraOffenceCodes,
      [],
      [],
      []
    )

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testHomeOfficeClassification)
  })

  it("should prioritise national requested changes second", () => {
    const nrcOffenceCodes = [
      { cjsCode: testCjsCode, homeOfficeClassification: testHomeOfficeClassification }
    ]

    const priority = new HomeOfficeClassifictionPriority([], [], nrcOffenceCodes, [], [])

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testHomeOfficeClassification)
  })

  it("should prioritise local offences third", () => {
    const localOffences = [
      { cjsCode: testCjsCode, homeOfficeClassification: testHomeOfficeClassification }
    ]

    const priority = new HomeOfficeClassifictionPriority([], [], [], localOffences, [])

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testHomeOfficeClassification)
  })

  it("should prioritise PNLD offences fourth", () => {
    const pnldOffences = [
      { cjsCode: testCjsCode, homeOfficeClassification: testHomeOfficeClassification }
    ]

    const priority = new HomeOfficeClassifictionPriority([], [], [], [], pnldOffences)

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testHomeOfficeClassification)
  })

  it("should return default value if not found", () => {
    const priority = new HomeOfficeClassifictionPriority([], [], [], [], [])

    expect(priority.getHighestPriority(testCjsCode)).toEqual("000/00")
  })
})
