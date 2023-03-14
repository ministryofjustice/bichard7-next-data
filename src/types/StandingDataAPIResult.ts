import type { z } from "zod"
import type mojOffenceSchema from "../../src/schemas/standingDataAPIResult"

export type MojOffence = z.infer<typeof mojOffenceSchema>
