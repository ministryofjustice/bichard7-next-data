import { z } from "zod"

const castToBool = (input: unknown): boolean => {
  if (input === "Y") {
    return true
  }
  return false
}

export const apiMojOffenceSchema = z.object({
  code: z.string(),
  OffenceType: z.string().optional(),
  OffenceWording: z.string().optional(),
  Recordable: z.preprocess(castToBool, z.boolean())
})

export const apiOffenceSchema = z.object({
  code: z.string(),
  OffenceType: z.string().optional(),
  CjsTitle: z.string().optional()
})

export const getMojOffenceApiResultSchema = z.object({
  MessageBody: z.object({
    GatewayOperationType: z.object({
      MOJOffenceResponse: z.object({
        MOJOffence: z.array(apiMojOffenceSchema)
      })
    })
  })
})

export const getOffenceApiResultSchema = z.object({
  MessageBody: z.object({
    GatewayOperationType: z.object({
      GetOffenceResponse: z.object({
        Offence: z.array(apiOffenceSchema)
      })
    })
  })
})
// TODO- add schemas for getApplication API responses
