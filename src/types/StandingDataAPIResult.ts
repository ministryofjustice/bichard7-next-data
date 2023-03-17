import type { z } from "zod"
import type {
  apiOffenceSchema,
  getMojOffenceApiResultSchema
} from "../../src/schemas/standingDataAPIResult"

export type ApiOffence = z.infer<typeof apiOffenceSchema>
export type MojOffenceApiResult = z.infer<typeof getMojOffenceApiResultSchema>
