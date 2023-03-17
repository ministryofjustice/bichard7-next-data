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

export const apiResultSchema = z.object({
  MessageBody: z.object({
    GatewayOperationType: z.object({
      GetOffenceResponse: z.object({
        Offence: z.array(apiOffenceSchema)
      })
    })
  })
})
