import { z } from "zod"

const mojOffenceSchema = z.object({
  cjsCode: z.string(),
  offenceCategory: z.string().optional(),
  offenceTitle: z.string().optional(),
  recordableOnPnc: z.boolean().optional()
})

export default mojOffenceSchema
