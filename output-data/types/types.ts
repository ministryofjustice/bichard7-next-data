type CjsCodeAndDescription = {
  cjsCode: string
  description: string
}

type ActualOffenceDate = CjsCodeAndDescription
type Amount = CjsCodeAndDescription

type AlcoholLevelMethod = {
  cjsCode: string
  description: string
  spiCode: string
}
export { ActualOffenceDate, AlcoholLevelMethod, Amount }
