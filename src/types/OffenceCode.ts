export type OffenceCode = {
  cjsCode: string
  description?: string
  homeOfficeClassification?: string | null
  notifiableToHo?: boolean | null
  recordCreated?: number[]
  source?: string
  offenceCategory?: string
  offenceTitle?: string
  recordableOnPnc?: boolean
  resultHalfLifeHours?: string | null
}
