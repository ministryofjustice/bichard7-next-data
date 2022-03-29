export type OffenceCode = {
  cjsCode: string
  description?: string
  homeOfficeClassification?: string | null
  notifiableToHo?: string | null
  recordCreated?: number[]
  source?: string
  offenceCategory?: string
  offenceTitle?: string
  recordableOnPnc?: string
  resultHalfLifeHours?: string | null
}
