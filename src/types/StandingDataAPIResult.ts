import type { z } from "zod"
import type {
  apiOffenceSchema,
  getOffenceApiResultSchema
} from "../../src/schemas/standingDataAPIResult"

export type ApiOffence = z.infer<typeof apiOffenceSchema>
export type OffenceApiResult = z.infer<typeof getOffenceApiResultSchema>
