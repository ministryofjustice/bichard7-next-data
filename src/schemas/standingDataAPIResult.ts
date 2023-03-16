import { z } from "zod"

export const apiResultSchema = z.object({
  code: z.string(),
  OffenceType: z.string().optional(),
  OffenceWording: z.string().optional()
  // Recordable: z.boolean().optional()
})

export const mojOffenceSchema = z.object({
  code: z.string(),
  OffenceType: z.string().optional(),
  OffenceWording: z.string().optional()
  // Recordable: z.boolean().optional()
})
