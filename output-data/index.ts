import { ActualOffenceDate, AlcoholLevelMethod, Amount } from "./types/types"

import actualOffenceDateData from "./data/actual-offence-date.json"
import alcoholLevelMethodData from "./data/alcohol-level-method.json"
import amountData from "./data/amount.json"

const actualOffenceDate: ActualOffenceDate[] = actualOffenceDateData
const alcoholLevelMethod: AlcoholLevelMethod[] = alcoholLevelMethodData
const amount: Amount[] = amountData

export default {
  actualOffenceDate,
  alcoholLevelMethod,
  amount
}
