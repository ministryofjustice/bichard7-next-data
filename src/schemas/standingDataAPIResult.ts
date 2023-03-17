import { z } from "zod"

const castToBool = (input: unknown): boolean => {
  if (input === "Y") {
    return true
  }
  return false
}

export const apiOffenceSchema = z.object({
  code: z.string(),
  OffenceType: z.string().optional(),
  OffenceWording: z.string().optional(),
  Recordable: z.preprocess(castToBool, z.boolean())
})

export const getMojOffenceApiResultSchema = z.object({
  MessageBody: z.object({
    GatewayOperationType: z.object({
      MOJOffenceResponse: z.object({
        MOJOffence: z.array(apiOffenceSchema)
      })
    })
  })
})
// TODO- add schemas for getOffence and getApplication API responses
