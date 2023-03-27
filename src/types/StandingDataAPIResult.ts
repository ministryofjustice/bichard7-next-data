import type { z } from "zod"
import type {
  apiMojOffenceSchema,
  apiOffenceSchema,
  getMojOffenceApiResultSchema,
  getOffenceApiResultSchema
} from "../../src/schemas/standingDataAPIResult"

export type ApiMojOffence = z.infer<typeof apiMojOffenceSchema>
export type MojOffenceApiResult = z.infer<typeof getMojOffenceApiResultSchema>

export type ApiOffence = z.infer<typeof apiOffenceSchema>
export type OffenceApiResult = z.infer<typeof getOffenceApiResultSchema>
