import { z } from 'zod'

export const BaseResponse = z.object({
  code: z.union([z.number(), z.string()]),
})
