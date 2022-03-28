import { ActualOffenceDate, AlcoholLevelMethod } from "./types/types"

import actualOffenceDateData from "./data/actual-offence-date.json"
import alcoholLevelMethodData from "./data/alcohol-level-method.json"

const actualOffenceDate: ActualOffenceDate[] = actualOffenceDateData
const alcoholLevelMethod: AlcoholLevelMethod[] = alcoholLevelMethodData

export default {
  actualOffenceDate,
  alcoholLevelMethod
}
