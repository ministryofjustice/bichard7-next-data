import "jest-extended"
import mergeRequests from "./mergeRequests"
import { OffenceCodeRow } from "./sheetsClient"

describe("mergeRequests", () => {
  it("Should return an identical list for non-overlapping offences", () => {
    const requests = <OffenceCodeRow[]>[
      {
        cjsCode: "BC12345",
        recordableOnPnc: "N",
        category: "EF",
        title: "Having a conversation in a cinema",
        submitted: new Date("2022/02/28 13:45:00")
      },
      {
        cjsCode: "BC23456",
        recordableOnPnc: "Y",
        category: "CI",
        title: "Putting pineapple on pizza",
        submitted: new Date("2022/03/01 10:25:05")
      },
      {
        cjsCode: "BC34567",
        recordableOnPnc: "Y",
        category: "CE",
        title: "Wearing a silly hat",
        submitted: new Date("2022/03/01 14:07:43")
      }
    ]

    const mergedRequests = mergeRequests(requests)

    expect(mergedRequests).toIncludeSameMembers(requests)
  })

  it("Should prioritise newer requests with the same offence code", () => {
    const requests = <OffenceCodeRow[]>[
      {
        cjsCode: "BC12345",
        recordableOnPnc: "N",
        category: "EF",
        title: "Having a conversation in a cinema",
        submitted: new Date("2022/02/28 13:45:00")
      },
      {
        cjsCode: "BC12345",
        recordableOnPnc: "Y",
        category: "CI",
        title: "Putting pineapple on pizza",
        submitted: new Date("2022/03/01 10:25:05")
      }
    ]

    const mergedRequests = mergeRequests(requests)

    expect(mergedRequests).toBeArrayOfSize(1)
    expect(mergedRequests).toContain(requests[1])
  })
})
