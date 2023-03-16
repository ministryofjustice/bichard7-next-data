import type { z } from "zod"
import type { mojOffenceSchema, apiResultSchema } from "../../src/schemas/standingDataAPIResult"

export type MojOffence = z.infer<typeof mojOffenceSchema>
export type ApiResult = z.infer<typeof apiResultSchema>
