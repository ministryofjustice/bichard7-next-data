import { z } from "zod"

// const castToBool = (input: unknown): boolean => {
//   if (input === "Y") {
//     return true
//   }
//   return false
// }

export const apiResultSchema = z.object({
  code: z.string(),
  OffenceType: z.string().optional(),
  OffenceWording: z.string().optional(),
  Recordable: z.string().optional()
  // Recordable: z.preprocess(castToBool, z.boolean())
})

export const mojOffenceSchema = z.object({
  code: z.string(),
  OffenceType: z.string().optional(),
  OffenceWording: z.string().optional(),
  Recordable: z.string().optional()
  // Recordable: z.preprocess(castToBool, z.boolean())
})
