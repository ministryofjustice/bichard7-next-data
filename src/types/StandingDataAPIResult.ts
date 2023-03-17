import type { z } from "zod"
import type { apiOffenceSchema, apiResultSchema } from "../../src/schemas/standingDataAPIResult"

export type ApiOffence = z.infer<typeof apiOffenceSchema>
export type ApiResult = z.infer<typeof apiResultSchema>
