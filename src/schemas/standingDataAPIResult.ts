import { z } from "zod"

export const apiOffenceSchema = z.object({
  code: z.string(),
  CjsTitle: z.string().optional(),
  Notifiable: z
    .string()
    .transform((value) => value === "Y")
    .optional(),
  OffenceType: z.string().optional(),
  Recordable: z
    .string()
    .transform((value) => value === "Y")
    .optional()
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
