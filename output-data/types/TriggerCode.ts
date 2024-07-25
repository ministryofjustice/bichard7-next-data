import TriggerCodeGroups from "./TriggerCodeGroups"

enum TriggerCode {
  TRPR0001 = "TRPR0001",
  TRPR0002 = "TRPR0002",
  TRPR0003 = "TRPR0003",
  TRPR0004 = "TRPR0004",
  TRPR0005 = "TRPR0005",
  TRPR0006 = "TRPR0006",
  TRPR0007 = "TRPR0007",
  TRPR0008 = "TRPR0008",
  TRPR0010 = "TRPR0010",
  TRPR0011 = "TRPR0011",
  TRPR0012 = "TRPR0012",
  TRPR0014 = "TRPR0014",
  TRPR0015 = "TRPR0015",
  TRPR0016 = "TRPR0016",
  TRPR0017 = "TRPR0017",
  TRPR0018 = "TRPR0018",
  TRPR0019 = "TRPR0019",
  TRPR0020 = "TRPR0020",
  TRPR0021 = "TRPR0021",
  TRPR0022 = "TRPR0022",
  TRPR0023 = "TRPR0023",
  TRPR0024 = "TRPR0024",
  TRPR0025 = "TRPR0025",
  TRPR0026 = "TRPR0026",
  TRPR0027 = "TRPR0027",
  TRPR0028 = "TRPR0028",
  TRPR0029 = "TRPR0029",
  TRPR0030 = "TRPR0030",
  TRPS0002 = "TRPS0002",
  TRPS0003 = "TRPS0003",
  TRPS0004 = "TRPS0004",
  TRPS0008 = "TRPS0008",
  TRPS0010 = "TRPS0010",
  TRPS0011 = "TRPS0011",
  TRPS0013 = "TRPS0013"
}

type TriggerCodesByGroup = {
  group: string
  triggerCodes: TriggerCode[]
}

const GroupedTriggerCodes: TriggerCodesByGroup[] = [
  {
    group: TriggerCodeGroups.Bails,
    triggerCodes: [
      TriggerCode.TRPR0008,
      TriggerCode.TRPR0010,
      TriggerCode.TRPR0020,
      TriggerCode.TRPR0030
    ]
  },
  {
    group: TriggerCodeGroups.Custody,
    triggerCodes: [
      TriggerCode.TRPR0001,
      TriggerCode.TRPR0005,
      TriggerCode.TRPR0006,
      TriggerCode.TRPR0019,
      TriggerCode.TRPR0021
    ]
  },
  {
    group: TriggerCodeGroups.Orders,
    triggerCodes: [
      TriggerCode.TRPR0003,
      TriggerCode.TRPR0016,
      TriggerCode.TRPR0025,
      TriggerCode.TRPR0026,
      TriggerCode.TRPR0029,
      TriggerCode.TRPS0008
    ]
  },
  {
    group: TriggerCodeGroups.Warrants,
    triggerCodes: [TriggerCode.TRPR0002, TriggerCode.TRPR0012]
  }
]

export { GroupedTriggerCodes }
export default TriggerCode
