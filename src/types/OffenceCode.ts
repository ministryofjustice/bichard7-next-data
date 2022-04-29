export type OffenceCode = {
  cjsCode: string
  description?: string
  homeOfficeClassification?: string | null
  notifiableToHo?: string | null | boolean
  recordCreated?: number[]
  source?: string
  offenceCategory?: string
  offenceTitle?: string
  recordableOnPnc?: string | boolean
  resultHalfLifeHours?: string | null
}
