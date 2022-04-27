import NotifiableToHOPriority from "./NotifiableToHOPriority"

const testCjsCode = "ABC123"
const testNotifiableToHo = true

describe("NotifiableToHOPriority", () => {
  it("should prioritise civil/libra overrides first", () => {
    const currentOffenceCodes = [{ cjsCode: testCjsCode, notifiableToHo: testNotifiableToHo }]
    const civilLibraOffenceCodes = [{ cjsCode: testCjsCode }]

    const priority = new NotifiableToHOPriority(
      currentOffenceCodes,
      civilLibraOffenceCodes,
      [],
      [],
      []
    )

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testNotifiableToHo)
  })

  it("should prioritise national requested changes second", () => {
    const nrcOffenceCodes = [{ cjsCode: testCjsCode, notifiableToHo: testNotifiableToHo }]

    const priority = new NotifiableToHOPriority([], [], nrcOffenceCodes, [], [])

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testNotifiableToHo)
  })

  it("should prioritise local offences third", () => {
    const localOffences = [{ cjsCode: testCjsCode, notifiableToHo: testNotifiableToHo }]

    const priority = new NotifiableToHOPriority([], [], [], localOffences, [])

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testNotifiableToHo)
  })

  it("should prioritise PNLD offences fourth", () => {
    const pnldOffences = [{ cjsCode: testCjsCode, notifiableToHo: testNotifiableToHo }]

    const priority = new NotifiableToHOPriority([], [], [], [], pnldOffences)

    expect(priority.getHighestPriority(testCjsCode)).toEqual(testNotifiableToHo)
  })

  it("should return default value if not found", () => {
    const priority = new NotifiableToHOPriority([], [], [], [], [])

    expect(priority.getHighestPriority(testCjsCode)).toEqual(false)
  })
})
